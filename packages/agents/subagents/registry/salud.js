const BaseSubagent = require('../core/base_subagent');

class AgenteSalud extends BaseSubagent {
  constructor() {
    super('salud', 1);
  }

  formatResult(decrypted, trust, source) {
    const base = super.formatResult(decrypted, trust, source);
    return `${base}\n🏥 [SALUD: Bienestar, prevención y atención primaria.]`;
  }
}

module.exports = AgenteSalud;
