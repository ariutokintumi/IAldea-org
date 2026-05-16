const fs = require('fs');
const path = require('path');

const loadDoc = (file) => {
  const p = path.resolve(__dirname, `../../../../${file}`);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
};

module.exports = {
  role: "comite",
  title: "Comité de Gobernanza",
  focus: "Toma de decisiones estratégicas y visión a largo plazo.",
  risk: "Ignorar el feedback ciudadano o violar el SOUL.md.",
  protocol: loadDoc('packages/agents/authority.md'),
  priority_agents: ['legal', 'economia', 'asambleas', 'seguridad']
};
