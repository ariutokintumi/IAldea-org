const BaseSubagent = require('../core/base_subagent');

class AgenteProduccion extends BaseSubagent {
  constructor() {
    super('produccion', 1);
  }

  formatResult(decrypted, trust, source) {
    const base = super.formatResult(decrypted, trust, source);
    return `${base}\n🌱 [PRODUCCIÓN: Reporte sobre soberanía alimentaria y manufactura local.]`;
  }
}

module.exports = AgenteProduccion;
