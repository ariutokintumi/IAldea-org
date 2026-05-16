const BaseSubagent = require('../core/base_subagent');

class AgenteInfraestructura extends BaseSubagent {
  constructor() {
    super('infraestructura', 1);
  }

  formatResult(decrypted, trust, source) {
    const base = super.formatResult(decrypted, trust, source);
    return `${base}\n🏗️ [INFRAESTRUCTURA: Estado de caminos, energía y espacios comunes.]`;
  }
}

module.exports = AgenteInfraestructura;
