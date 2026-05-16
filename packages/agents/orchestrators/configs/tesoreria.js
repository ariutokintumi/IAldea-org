const fs = require('fs');
const path = require('path');

const loadDoc = (file) => {
  const p = path.resolve(__dirname, `../../../../${file}`);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
};

module.exports = {
  role: "tesoreria",
  title: "Tesorería Comunitaria",
  focus: "Cuidar recursos y viabilidad financiera.",
  risk: "Comprometer presupuesto sin validación humana.",
  protocol: loadDoc('packages/agents/authority.md'),
  priority_agents: ['economia', 'infraestructura']
};
