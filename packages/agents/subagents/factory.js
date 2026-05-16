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
  economia: new AgenteEconomia(),
  legal: new AgenteLegal(),
  agua: new AgenteAgua(),
  produccion: new AgenteProduccion(),
  infraestructura: new AgenteInfraestructura(),
  asambleas: new AgenteAsambleas(),
  seguridad: new AgenteSeguridad(),
  transporte: new AgenteTransporte(),
  salud: new AgenteSalud(),
  educacion: new AgenteEducacion()
};

function getSubagent(domain) {
  return subagents[domain.toLowerCase()];
}

module.exports = {
  getSubagent,
  subagents
};
