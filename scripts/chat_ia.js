const { Orchestrator } = require('../packages/agents/router');
const path = require('path');
const fs = require('fs');

// Cargar .env manualmente para depurar
const envContent = fs.readFileSync(path.resolve(__dirname, '../.env'), 'utf-8');
const anthropicKeyLine = envContent.split('\n').find(line => line.startsWith('ANTHROPIC_API_KEY='));
const key = anthropicKeyLine ? anthropicKeyLine.split('=')[1].trim() : null;

if (key) {
  process.env.ANTHROPIC_API_KEY = key;
  console.log('🔑 Llave de Anthropic cargada manualmente (longitud):', key.length);
}

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
