const { OpenAI } = require('openai');
require('dotenv').config({ path: '../../.env' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Genera el vector de embedding para un texto usando OpenAI.
 * Modelo: text-embedding-3-small (1536 dimensiones)
 */
async function generateEmbedding(text) {
  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️ No hay OPENAI_API_KEY. El vector será nulo (solo para pruebas).');
    return null;
  }

  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text.replace(/\n/g, ' '), // Limpieza básica
      encoding_format: "float",
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('❌ Error generando embedding:', error.message);
    throw error;
  }
}

module.exports = {
  generateEmbedding,
};
