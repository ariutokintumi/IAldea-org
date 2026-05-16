const fs = require('fs');
const path = require('path');

const loadDoc = (file) => {
  const p = path.resolve(__dirname, `../../../../${file}`);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
};

module.exports = {
  role: "coordinacion",
  title: "Coordinación Comunitaria",
  focus: "Unir actores, facilitar procesos y gestionar la logística.",
  risk: "Tomar partido en conflictos o centralizar decisiones.",
  protocol: loadDoc('packages/agents/citizen.md'), // Usa tono ciudadano pero con autoridad de proceso
  priority_agents: ['transporte', 'produccion', 'infraestructura']
};
