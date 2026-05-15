const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
const { getSubagent, subagents } = require('./subagents/factory');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Cargar Protocolos de Colaboradores
const loadDoc = (file) => {
  const p = path.resolve(__dirname, `../../${file}`);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
};

const soulContent = loadDoc('IaAldea_SOUL.md');
const authorityProtocol = loadDoc('packages/agents/authority.md');
const citizenProtocol = loadDoc('packages/agents/citizen.md');
const safetyProtocol = loadDoc('tests/safety/refusals.md');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * CONFIGURACIÓN DE ROLES (Alineada con Matriz de Experiencia y Nuevos Protocolos)
 */
const ROLE_CONFIGS = {
  secretaria: {
    title: "Secretaría de Memoria",
    focus: "Registrar memoria oficial, crear registros y minutas.",
    risk: "Registrar información no validada.",
    protocol: authorityProtocol,
    priority_agents: ['asambleas', 'legal']
  },
  tesoreria: {
    title: "Tesorería Comunitaria",
    focus: "Cuidar recursos y viabilidad financiera.",
    risk: "Comprometer presupuesto sin validación humana.",
    protocol: authorityProtocol,
    priority_agents: ['economia', 'infraestructura']
  },
  ciudadano: {
    title: "Participación Ciudadana",
    focus: "Participar, consultar y dar feedback constructivo.",
    risk: "Propagar rumores o acusaciones.",
    protocol: citizenProtocol,
    priority_agents: ['agua', 'salud', 'asambleas']
  },
  admin: {
    title: "Administración L3",
    focus: "Seguridad y configuración técnica.",
    risk: "Vulnerar privacidad de datos.",
    protocol: authorityProtocol,
    priority_agents: ['seguridad', 'legal']
  }
};

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
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      });

      return response.content[0].text.replace(/—|–/g, ',');
    } catch (error) {
      return "Lo siento, tuve un error en el protocolo de coordinación.";
    }
  }
}

module.exports = {
  Orchestrator,
};
