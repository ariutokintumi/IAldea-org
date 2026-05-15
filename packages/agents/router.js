const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
const conmutador = require('./conmutador');
const { getSubagent, subagents } = require('./subagents/factory');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const soulPath = path.resolve(__dirname, '../../IaAldea_SOUL.md');
const soulContent = fs.existsSync(soulPath) ? fs.readFileSync(soulPath, 'utf8') : 'No soul found.';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Orquestador Dinámico por Rol
 */
class Orchestrator {
  constructor(role, accessLevel) {
    this.role = role; // 'secretaria', 'ciudadano', 'tesoreria', etc.
    this.accessLevel = accessLevel; // 1, 2, 3
  }

  /**
   * Decide qué subagentes consultar según el mensaje del usuario
   */
  async getRelevantContext(userMessage) {
    console.log(`[ORCHESTRATOR:${this.role}] Analizando temas para: "${userMessage}"`);
    
    // Lista de subagentes disponibles para este rol
    const availableSubagents = Object.keys(subagents);
    
    // Identificar temas (Lógica simple por palabras clave por ahora, puede ser una llamada a IA)
    const detectedTopics = availableSubagents.filter(topic => 
      userMessage.toLowerCase().includes(topic) || 
      (topic === 'economia' && userMessage.toLowerCase().includes('dinero')) ||
      (topic === 'asambleas' && userMessage.toLowerCase().includes('acuerdo'))
    );

    // Si no detecta nada específico, usa 'asambleas' o 'produccion' por defecto (memoria general)
    if (detectedTopics.length === 0) detectedTopics.push('asambleas');

    let totalContext = "";
    for (const topic of detectedTopics) {
      const agent = getSubagent(topic);
      if (agent) {
        const result = await agent.query(userMessage, this.accessLevel);
        totalContext += `\n\n--- INFORME DE AGENTE ${topic.toUpperCase()} ---\n${result}`;
      }
    }

    return totalContext;
  }

  async processMessage(userMessage) {
    const context = await this.getRelevantContext(userMessage);

    const systemPrompt = `
${soulContent}

---
ESTADO DEL ORQUESTADOR:
- Rol: ${this.role}
- Nivel de Acceso: L${this.accessLevel}
- Subagentes Consultados: ${context.includes('ACCESO DENEGADO') ? 'Restringidos' : 'Autorizados'}

---
CONTEXTO DE SUBAGENTES (CIFRADO/DESCIFRADO POR CONMUTADOR):
${context}

REGLAS DE RESPUESTA:
1. Saludo oficial: "Soy IAldea, herramienta de memoria cívica de IAldea. ¿En qué te ayudo?"
2. Máximo 150 palabras.
3. No uses guiones largos (—).
4. Cita fuentes usando [FTE: nombre].
`;

    try {
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      });

      return response.content[0].text.replace(/—|–/g, ',');
    } catch (error) {
      console.error('❌ Error en el orquestador:', error.message);
      return "Lo siento, tuve un problema de coordinación entre mis subagentes.";
    }
  }
}

module.exports = {
  Orchestrator,
};
