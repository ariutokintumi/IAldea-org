const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
const { getSubagent, subagents } = require('./subagents/factory');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const soulPath = path.resolve(__dirname, '../../IaAldea_SOUL.md');
const soulContent = fs.existsSync(soulPath) ? fs.readFileSync(soulPath, 'utf8') : 'No soul found.';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * CONFIGURACIÓN DE PERSONALIDAD POR ROL (IAldea Experience Matrix)
 */
const ROLE_CONFIGS = {
  secretaria: {
    title: "Secretaría de Memoria",
    focus: "Registrar memoria, crear registros, minutas y comunicados oficiales.",
    risk: "Registrar información no validada.",
    priority_agents: ['asambleas', 'legal', 'educacion']
  },
  coordinacion: {
    title: "Coordinación de Procesos",
    focus: "Cuidar el proceso, revisar, autorizar y coordinar actores.",
    risk: "Centralizar demasiado poder.",
    priority_agents: ['transporte', 'agua', 'infraestructura']
  },
  comite_miembro: {
    title: "Miembro del Comité",
    focus: "Deliberar, proponer, revisar y decidir sobre propuestas comunitarias.",
    risk: "Exponer datos sensibles.",
    priority_agents: ['legal', 'asambleas', 'economia']
  },
  tesoreria: {
    title: "Tesorería Comunitaria",
    focus: "Cuidar recursos, revisar viabilidad y registrar uso de fondos.",
    risk: "Comprometer el presupuesto sin validación humana.",
    priority_agents: ['economia', 'infraestructura', 'produccion']
  },
  validador: {
    title: "Validación y Evidencia",
    focus: "Revisar evidencia, validar cumplimiento y exactitud de informes.",
    risk: "Juzgar personas en lugar de hechos.",
    priority_agents: ['asambleas', 'legal', 'seguridad']
  },
  ciudadano: {
    title: "Participación Ciudadana",
    focus: "Participar, consultar, preguntar y dar feedback constructivo.",
    risk: "Propagar rumores o acusaciones sin fundamento.",
    priority_agents: ['agua', 'salud', 'transporte', 'asambleas']
  },
  financiador: {
    title: "Observación de Impacto",
    focus: "Observar impacto y ver métricas públicas agregadas.",
    risk: "Intentar capturar o condicionar decisiones comunitarias.",
    priority_agents: ['economia', 'produccion', 'infraestructura']
  }
};

/**
 * Orquestador Especializado por Rol
 */
class Orchestrator {
  constructor(role, accessLevel) {
    this.role = role.toLowerCase();
    this.accessLevel = accessLevel;
    this.config = ROLE_CONFIGS[this.role] || ROLE_CONFIGS.ciudadano;
  }

  /**
   * Delegación inteligente a subagentes
   */
  async getRelevantContext(userMessage) {
    const availableSubagents = Object.keys(subagents);
    
    // Identificar temas (Lógica de prioridad según el rol)
    const detectedTopics = availableSubagents.filter(topic => 
      userMessage.toLowerCase().includes(topic) || 
      this.config.priority_agents.includes(topic)
    ).slice(0, 3); // Máximo 3 subagentes por consulta para no saturar

    let totalContext = "";
    for (const topic of detectedTopics) {
      const agent = getSubagent(topic);
      if (agent) {
        const result = await agent.query(userMessage, this.accessLevel);
        totalContext += `\n\n--- [DOMINIO: ${topic.toUpperCase()}] ---\n${result}`;
      }
    }
    return totalContext;
  }

  async processMessage(userMessage) {
    const context = await this.getRelevantContext(userMessage);

    const systemPrompt = `
${soulContent}

---
PROTOCOLO DE ROL ESPECÍFICO:
- Eres el Orquestador de: ${this.config.title}.
- Tu necesidad principal: ${this.config.focus}.
- RIESGO CRÍTICO A EVITAR: ${this.config.risk}.
- Tu nivel de soberanía: L${this.accessLevel}.

INSTRUCCIONES DE OPERACIÓN:
1. Actúa estrictamente bajo las acciones permitidas para el rol ${this.role.toUpperCase()}.
2. No permitas que el usuario te empuje a cometer tu RIESGO CRÍTICO definido arriba.
3. Si la información solicitada no está en el contexto de tus subagentes, declina responder por seguridad.

---
CONTEXTO DE SUBAGENTES (CIFRADO POR CONMUTADOR):
${context}

REGLAS DE RESPUESTA:
1. Saludo oficial: "Soy IAldea, ${this.config.title}. ¿En qué te ayudo?"
2. Máximo 150 palabras.
3. No uses guiones largos (—).
4. Cita fuentes: [FTE: nombre].
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
      return "Hubo un error en la coordinación del orquestador.";
    }
  }
}

module.exports = {
  Orchestrator,
};
