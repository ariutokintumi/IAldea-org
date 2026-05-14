const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');
const conmutador = require('./conmutador');
const { pool } = require('../kernel/db');
const { generateEmbedding } = require('../ingesta/embedder');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * El Router de Rol: Instancia orquestadores según el acceso del usuario.
 */
class Orchestrator {
  constructor(role, accessLevel) {
    this.role = role;
    this.accessLevel = accessLevel;
  }

  /**
   * Herramienta RAG que usa el Conmutador para buscar en el Kernel.
   */
  async searchMemory(query) {
    console.log(`🔍 Orquestador (${this.role}) buscando: "${query}"`);
    
    // 1. Generar vector para la consulta
    const embedding = await generateEmbedding(query);
    if (!embedding) return "No puedo realizar búsquedas sin API Key de OpenAI.";

    // 2. Consultar Kernel (pgvector) con filtro de acceso
    const res = await pool.query(`
      SELECT c.content, v.sensitivity 
      FROM document_chunks c
      JOIN document_versions v ON c.version_id = v.id
      ORDER BY c.embedding <=> $1
      LIMIT 3
    `, [`[${embedding.join(',')}]`]);

    // 3. Simular el paso por el Conmutador
    const results = res.rows.map(row => {
      const encrypted = conmutador.encrypt(row.content);
      const decrypted = conmutador.decrypt(encrypted); // El orquestador tiene la llave
      return `[FTE: ${row.sensitivity}] ${decrypted}`;
    });

    return results.join('\n\n');
  }

  /**
   * Procesa un mensaje del usuario usando Claude 3.5 Sonnet.
   */
  async processMessage(userMessage) {
    const context = await this.searchMemory(userMessage);

    const systemPrompt = `Eres un orquestador de IAldea con el rol: ${this.role}.
Tu nivel de acceso es L${this.accessLevel}.
Responde siguiendo las reglas de SOUL.md: con veracidad, civismo y citando tus fuentes.

CONTEXTO RECUPERADO DE LA MEMORIA:
${context}
`;

    try {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      });

      return response.content[0].text;
    } catch (error) {
      console.error('❌ Error en el orquestador:', error.message);
      return "Lo siento, tuve un problema procesando tu mensaje.";
    }
  }
}

module.exports = {
  Orchestrator,
};
