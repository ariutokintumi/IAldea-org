const { OpenAI } = require('openai');
const path = require('path');
// Cargar .env desde la raíz del proyecto
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

/**
 * Genera el vector de embedding para un texto usando OpenAI.
 * Modelo: text-embedding-3-small (1536 dimensiones)
 */
async function generateEmbedding(text) {
  if (!openai) {
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
