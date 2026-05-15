const BaseSubagent = require('./base_subagent');

const subagents = {
  economia: new BaseSubagent('Economia', 2),
  produccion: new BaseSubagent('Produccion', 1),
  agua: new BaseSubagent('Agua', 1),
  infraestructura: new BaseSubagent('Infraestructura', 1),
  asambleas: new BaseSubagent('Asambleas', 1),
  legal: new BaseSubagent('Legal', 2),
  seguridad: new BaseSubagent('Security', 3),
  transporte: new BaseSubagent('Transporte', 1),
  salud: new BaseSubagent('Salud', 1),
  educacion: new BaseSubagent('Educacion', 1)
};

/**
 * Obtiene el subagente adecuado según el tema detectado
 */
function getSubagent(topic) {
  return subagents[topic.toLowerCase()] || null;
}

module.exports = {
  subagents,
  getSubagent
};
