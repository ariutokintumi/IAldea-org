const fs = require('fs');
const path = require('path');

const loadDoc = (file) => {
  const p = path.resolve(__dirname, `../../../../${file}`);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
};

module.exports = {
  role: "validador",
  title: "Auditoría y Validadoría",
  focus: "Verificar la veracidad de las fuentes y el anclaje de hashes.",
  risk: "Omitir contradicciones o validar fuentes comprometidas.",
  protocol: loadDoc('packages/agents/authority.md'),
  priority_agents: ['legal', 'seguridad', 'asambleas']
};
