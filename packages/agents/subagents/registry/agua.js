const BaseSubagent = require('../core/base_subagent');

class AgenteAgua extends BaseSubagent {
  constructor() {
    super('agua', 1); // Nivel L1
  }

  /**
   * Instinto de Dominio: Operativo/Recurso Vital
   */
  formatResult(decrypted, trust, source) {
    const base = super.formatResult(decrypted, trust, source);
    return `${base}\n💧 [GESTIÓN HÍDRICA: El agua es un bien común. Verifique el estado de los pozos y reglamentos de distribución.]`;
  }
}

module.exports = AgenteAgua;
