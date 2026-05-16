const fastify = require('fastify')({ logger: true });
const keychain = require('../../packages/security/keychain');

/**
 * Conmutador Service: El Portero del Búnker
 */

fastify.post('/encrypt', async (request, reply) => {
  const { plaintext, level } = request.body;
  try {
    const ciphertext = keychain.encrypt(plaintext, level);
    return { ciphertext };
  } catch (err) {
    reply.status(400).send({ error: err.message });
  }
});

fastify.post('/decrypt', async (request, reply) => {
  const { ciphertext, level } = request.body;
  try {
    const plaintext = keychain.decrypt(ciphertext, level);
    return { plaintext };
  } catch (err) {
    reply.status(403).send({ error: `Falla de integridad o falta de permiso para nivel ${level}.` });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3005, host: '0.0.0.0' });
    console.log('🛡️ Búnker IAldea: Servicio de Seguridad Modulado activo.');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
