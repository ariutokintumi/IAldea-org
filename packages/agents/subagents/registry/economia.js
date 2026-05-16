const BaseSubagent = require('../core/base_subagent');

class AgenteEconomia extends BaseSubagent {
  constructor() {
    super('economia', 2); // Nivel L2
  }

  /**
   * Instinto de Dominio: Rigor Financiero
   */
  formatResult(decrypted, trust, source) {
    const base = super.formatResult(decrypted, trust, source);
    return `${base}\n📊 [AUDITORÍA ECONÓMICA: Se recomienda verificar la viabilidad presupuestal antes de cualquier acuerdo.]`;
  }
}

module.exports = AgenteEconomia;
