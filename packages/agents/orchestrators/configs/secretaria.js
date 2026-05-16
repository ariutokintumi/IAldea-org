const fs = require('fs');
const path = require('path');

const loadDoc = (file) => {
  const p = path.resolve(__dirname, `../../../../${file}`);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
};

module.exports = {
  role: "secretaria",
  title: "Secretaría de Memoria",
  focus: "Registrar memoria oficial, crear registros y minutas.",
  risk: "Registrar información no validada.",
  protocol: loadDoc('packages/agents/authority.md'),
  priority_agents: ['asambleas', 'legal']
};
