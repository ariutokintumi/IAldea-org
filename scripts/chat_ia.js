const { Orchestrator } = require('../packages/agents/router');

async function chat() {
  const userRole = 'ciudadano';
  const accessLevel = 1;
  const orc = new Orchestrator(userRole, accessLevel);

  const question = "¿Cuáles fueron los acuerdos de la última asamblea comunitaria?";
  
  console.log(`👤 Usuario: ${question}`);
  console.log(`🤖 IAldea (${userRole}) pensando...`);
  
  const response = await orc.processMessage(question);
  
  console.log(`\n✅ IAldea: ${response}`);
  process.exit(0);
}

chat();
