/**
 * Puente HTTP: expone el bundle de contexto + metadatos de rol para LangGraph (Python).
 * La lógica de subagentes y Postgres sigue en packages/agents (Node).
 */
const path = require('path');
const fastify = require('fastify')({ logger: true });
const { Orchestrator } = require('../../packages/agents/router');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const PORT = Number(process.env.ORCHESTRATOR_BRIDGE_PORT || 3011);

fastify.get('/health', async () => ({ ok: true, service: 'orchestrator-bridge' }));

/**
 * POST { message, role, accessLevel }
 * Returns { context, protocol, title, risk, role } for building the LLM system prompt elsewhere.
 */
fastify.post('/bundle', async (request, reply) => {
  const { message, role, accessLevel } = request.body || {};
  if (!message || typeof message !== 'string') {
    return reply.status(400).send({ error: 'message requerido' });
  }
  const level = accessLevel !== undefined && accessLevel !== null ? Number(accessLevel) : 1;
  const roleSlug = (role || 'ciudadano').toLowerCase();

  try {
    const orchestrator = new Orchestrator(roleSlug, level);
    const context = await orchestrator.getRelevantContext(message);
    return {
      context,
      protocol: orchestrator.config.protocol,
      title: orchestrator.config.title,
      risk: orchestrator.config.risk,
      role: orchestrator.role,
    };
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: err.message || 'bundle_failed' });
  }
});

async function start() {
  await fastify.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`🔗 Orchestrator bridge en http://0.0.0.0:${PORT} (POST /bundle)`);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
