const BaseSubagent = require('../core/base_subagent');

class AgenteEducacion extends BaseSubagent {
  constructor() {
    super('educacion', 1);
  }

  formatResult(decrypted, trust, source) {
    const base = super.formatResult(decrypted, trust, source);
    return `${base}\n🎓 [EDUCACIÓN: Talleres, formación y transferencia de saberes.]`;
  }
}

module.exports = AgenteEducacion;
