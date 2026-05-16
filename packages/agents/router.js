const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
const { getSubagent, subagents } = require('./subagents/factory');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Cargador de Protocolos Globales
const loadDoc = (file) => {
  const p = path.resolve(__dirname, `../../${file}`);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
};

const soulContent = loadDoc('IaAldea_SOUL.md');
const safetyProtocol = loadDoc('tests/safety/refusals.md');

// Cargador de Configuraciones Modulares de Roles
const ROLE_CONFIGS = {
  secretaria: require('./orchestrators/configs/secretaria'),
  tesoreria: require('./orchestrators/configs/tesoreria'),
  ciudadano: require('./orchestrators/configs/ciudadano'),
  coordinacion: require('./orchestrators/configs/coordinacion'),
  validador: require('./orchestrators/configs/validador'),
  comite: require('./orchestrators/configs/comite'),
  admin: require('./orchestrators/configs/validador'), // Admin usa perfil de auditor
};

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * ORQUESTADOR MAESTRO: El Director de la Asamblea Digital
 */
class Orchestrator {
  constructor(role, accessLevel) {
    this.role = role.toLowerCase();
    this.accessLevel = accessLevel;
    this.config = ROLE_CONFIGS[this.role] || ROLE_CONFIGS.ciudadano;
  }

  async getRelevantContext(userMessage) {
    const availableSubagents = Object.keys(subagents);
    const detectedTopics = availableSubagents.filter(topic => 
      userMessage.toLowerCase().includes(topic)
    ).slice(0, 3);

    if (detectedTopics.length === 0) detectedTopics.push('asambleas');

    let totalContext = "";
    for (const topic of detectedTopics) {
      const agent = getSubagent(topic);
      if (agent) {
        totalContext += await agent.query(userMessage, this.accessLevel);
      }
    }
    return totalContext;
  }

  async processMessage(userMessage) {
    const context = await this.getRelevantContext(userMessage);

    const systemPrompt = `
${soulContent}

---
PROTOCOLO DE SEGURIDAD Y NEGACIONES (SAFETY):
${safetyProtocol}

---
PROTOCOLO DE COMPORTAMIENTO PARA ${this.role.toUpperCase()}:
${this.config.protocol}

---
ESTADO DEL ORQUESTADOR:
- Rol: ${this.config.title}
- Nivel de Soberanía: L${this.accessLevel}
- Riesgo Crítico a Vigilar: ${this.config.risk}

---
CONTEXTO DE MEMORIA CÍVICA:
${context}

INSTRUCCIONES FINALES:
1. Responde siempre bajo la identidad de IAldea.
2. Si la petición viola el Protocolo de Seguridad (Safety), usa un rechazo canónico.
3. Máximo 150 palabras. Sin guiones largos (—).
4. Cada dato debe mostrar su fuente [FTE: nombre] y su etiqueta [HECHO] o [INFERENCIA].
`;

    try {
      const response = await anthropic.messages.create({
        model: "claude-4-6-sonnet-latest",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      });

      return response.content[0].text.replace(/—|–/g, ',');
    } catch (error) {
      console.error('ERROR EN ORQUESTADOR:', error);
      return "Lo siento, tuve un error en el protocolo de coordinación.";
    }
  }
}

module.exports = {
  Orchestrator,
};
