const AgenteEconomia = require('./registry/economia');
const AgenteLegal = require('./registry/legal');
const AgenteAgua = require('./registry/agua');
const AgenteProduccion = require('./registry/produccion');
const AgenteInfraestructura = require('./registry/infraestructura');
const AgenteAsambleas = require('./registry/asambleas');
const AgenteSeguridad = require('./registry/seguridad');
const AgenteTransporte = require('./registry/transporte');
const AgenteSalud = require('./registry/salud');
const AgenteEducacion = require('./registry/educacion');

const subagents = {
  economia: new AgenteEconomia(), // L4
  legal: new AgenteLegal(),     // L3
  agua: new AgenteAgua(),       // L1

  // Expertos Genéricos
  produccion: new AgenteProduccion(),
  infraestructura: new AgenteInfraestructura(),
  asambleas: new AgenteAsambleas(),
  seguridad: new AgenteSeguridad(), // L3 Comité/Admin
  transporte: new AgenteTransporte(),
  salud: new AgenteSalud(),
  educacion: new AgenteEducacion()
};

function getSubagent(domain) {
  return subagents[domain.toLowerCase()];
}

function listSubagentSlugs() {
  return Object.keys(subagents);
}

module.exports = {
  getSubagent,
  subagents,
  listSubagentSlugs,
};
