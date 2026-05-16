const BaseSubagent = require('../core/base_subagent');

class AgenteAsambleas extends BaseSubagent {
  constructor() {
    super('asambleas', 1);
  }

  formatResult(decrypted, trust, source) {
    const base = super.formatResult(decrypted, trust, source);
    return `${base}\n📜 [MEMORIA DE ASAMBLEA: Acuerdos y actas de la voluntad colectiva.]`;
  }
}

module.exports = AgenteAsambleas;
