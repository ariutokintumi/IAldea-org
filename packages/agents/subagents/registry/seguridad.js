const BaseSubagent = require('../core/base_subagent');

class AgenteSeguridad extends BaseSubagent {
  constructor() {
    super('seguridad', 3); // Nivel L3
  }

  formatResult(decrypted, trust, source) {
    const base = super.formatResult(decrypted, trust, source);
    return `${base}\n🛡️ [SEGURIDAD L3: Información sensible de protección comunitaria.]`;
  }
}

module.exports = AgenteSeguridad;
