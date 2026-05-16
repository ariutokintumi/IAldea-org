const BaseSubagent = require('../core/base_subagent');

class AgenteLegal extends BaseSubagent {
  constructor() {
    super('legal', 3); // Nivel L3 (Autoridad / Secretaría / Coordinación)
  }

  /**
   * Instinto de Dominio: Marco Normativo
   */
  formatResult(decrypted, trust, source) {
    const base = super.formatResult(decrypted, trust, source);
    return `${base}\n⚖️ [MARCO LEGAL: Esta información se rige por los reglamentos vigentes de la asamblea comunitaria.]`;
  }
}

module.exports = AgenteLegal;
