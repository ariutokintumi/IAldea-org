const BaseSubagent = require('./core/base_subagent');
const AgenteEconomia = require('./registry/economia');
const AgenteLegal = require('./registry/legal');
const AgenteAgua = require('./registry/agua');

const subagents = {
  // Expertos con Personalidad Propia
  economia: new AgenteEconomia(),
  legal: new AgenteLegal(),
  agua: new AgenteAgua(),

  // Expertos Genéricos (por ahora)
  produccion: new BaseSubagent('produccion', 1),
  infraestructura: new BaseSubagent('infraestructura', 1),
  asambleas: new BaseSubagent('asambleas', 1),
  seguridad: new BaseSubagent('seguridad', 3),
  transporte: new BaseSubagent('transporte', 1),
  salud: new BaseSubagent('salud', 1),
  educacion: new BaseSubagent('educacion', 1)
};

function getSubagent(domain) {
  return subagents[domain.toLowerCase()];
}

module.exports = {
  getSubagent,
  subagents
};
