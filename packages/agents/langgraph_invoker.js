/**
 * Invoca el orquestador LangGraph (FastAPI) si LANGGRAPH_ORCHESTRATOR_URL está definido.
 * @returns {Promise<string|null>} texto de respuesta o null si no hay URL configurada
 */
const axios = require('axios');

async function invokeLangGraph(message, role, accessLevel) {
  const base = process.env.LANGGRAPH_ORCHESTRATOR_URL;
  if (!base || !String(base).trim()) {
    return null;
  }
  const url = `${String(base).replace(/\/$/, '')}/invoke`;
  const { data } = await axios.post(
    url,
    {
      message,
      role: role || 'ciudadano',
      access_level: accessLevel ?? 1,
    },
    { timeout: 120000 }
  );
  if (!data || typeof data.response !== 'string') {
    throw new Error('langgraph_bad_response');
  }
  return data.response;
}

module.exports = { invokeLangGraph };
