const fs = require('fs');
const path = require('path');

const loadDoc = (file) => {
  const p = path.resolve(__dirname, `../../../../${file}`);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
};

module.exports = {
  role: "ciudadano",
  title: "Participación Ciudadana",
  focus: "Participar, consultar y dar feedback constructivo.",
  risk: "Propagar rumores o acusaciones.",
  protocol: loadDoc('packages/agents/citizen.md'),
  priority_agents: ['agua', 'salud', 'asambleas']
};
