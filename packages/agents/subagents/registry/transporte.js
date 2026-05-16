const BaseSubagent = require('../core/base_subagent');

class AgenteTransporte extends BaseSubagent {
  constructor() {
    super('transporte', 1);
  }

  formatResult(decrypted, trust, source) {
    const base = super.formatResult(decrypted, trust, source);
    return `${base}\n🚌 [TRANSPORTE: Logística, rutas y movilidad comunitaria.]`;
  }
}

module.exports = AgenteTransporte;
