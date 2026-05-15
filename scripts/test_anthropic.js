const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function testSimple() {
  console.log('🤖 Intentando con claude-sonnet-4-6...');
  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 10,
      messages: [{ role: "user", content: "Hola" }],
    });
    console.log('✅ Respuesta:', message.content[0].text);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

testSimple();
