/**
 * Puente HTTP: metadatos de orquestador por rol, contexto cívico (subagentes), y bundle legado.
 * La lógica vive en packages/agents (Node).
 */
const path = require('path');
const fastify = require('fastify')({ logger: true });
const { Orchestrator } = require('../../packages/agents/router');
const { getSubagent, listSubagentSlugs } = require('../../packages/agents/subagents/factory');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const PORT = Number(process.env.ORCHESTRATOR_BRIDGE_PORT || 3011);

function parseRoleAndLevel(body) {
  const { role, accessLevel } = body || {};
  const level = accessLevel !== undefined && accessLevel !== null ? Number(accessLevel) : 1;
  const roleSlug = (role || 'ciudadano').toLowerCase();
  return { roleSlug, level };
}

function requireMessage(message) {
  if (!message || typeof message !== 'string') {
    return 'message requerido';
  }
  return null;
}

const app = fastify;

app.get('/health', async () => ({ ok: true, service: 'orchestrator-bridge' }));

/** Catálogo de slugs de subagentes (dominios). */
app.get('/agents', async () => ({ agents: listSubagentSlugs() }));

/**
 * POST { role, accessLevel }
 * Metadatos del orquestador para un rol (sin ejecutar subagentes). LangGraph paso "meta-orquestador".
 */
app.post('/orchestrator/profile', async (request, reply) => {
  const { roleSlug, level } = parseRoleAndLevel(request.body || {});
  try {
    const orchestrator = new Orchestrator(roleSlug, level);
    return {
      protocol: orchestrator.config.protocol,
      title: orchestrator.config.title,
      risk: orchestrator.config.risk,
      role: orchestrator.role,
    };
  } catch (err) {
    app.log.error(err);
    return reply.status(500).send({ error: err.message || 'profile_failed' });
  }
});

/**
 * POST { message, role, accessLevel }
 * Solo contexto de memoria cívica (subagentes + PG). Orquestador ya resuelto por rol.
 */
app.post('/context', async (request, reply) => {
  const body = request.body || {};
  const bad = requireMessage(body.message);
  if (bad) return reply.status(400).send({ error: bad });
  const { roleSlug, level } = parseRoleAndLevel(body);

  try {
    const orchestrator = new Orchestrator(roleSlug, level);
    const context = await orchestrator.getRelevantContext(body.message);
    return { context };
  } catch (err) {
    app.log.error(err);
    return reply.status(500).send({ error: err.message || 'context_failed' });
  }
});

/**
 * POST { message, role, accessLevel }
 * Un solo subagente por slug de dominio (agua, legal, …).
 */
app.post('/agents/:domain/query', async (request, reply) => {
  const domain = (request.params.domain || '').toLowerCase();
  const { message, accessLevel } = request.body || {};
  const bad = requireMessage(message);
  if (bad) return reply.status(400).send({ error: bad });

  const agent = getSubagent(domain);
  if (!agent) {
    return reply.status(404).send({ error: 'unknown_domain', domain });
  }

  const level = accessLevel !== undefined && accessLevel !== null ? Number(accessLevel) : 1;

  try {
    const context = await agent.query(message, level);
    return { domain, context };
  } catch (err) {
    app.log.error(err);
    return reply.status(500).send({ error: err.message || 'agent_query_failed' });
  }
});

/**
 * POST { message, role, accessLevel }
 * Legado: perfil + contexto en una respuesta (gateways / clientes que ya usan /bundle).
 */
app.post('/bundle', async (request, reply) => {
  const { message, role, accessLevel } = request.body || {};
  const bad = requireMessage(message);
  if (bad) return reply.status(400).send({ error: bad });
  const { roleSlug, level } = parseRoleAndLevel(request.body || {});

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
    app.log.error(err);
    return reply.status(500).send({ error: err.message || 'bundle_failed' });
  }
});

async function start() {
  await app.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`🔗 Orchestrator bridge en http://0.0.0.0:${PORT}`);
  console.log('   POST /bundle | /orchestrator/profile | /context | /agents/:domain/query | GET /agents');
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
