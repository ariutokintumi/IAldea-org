const fastify = require('fastify')({ logger: false });
const crypto = require('crypto');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.CONMUTADOR_KEY || '0'.repeat(32), 'utf8');

/**
 * Lógica de Descifrado Blindada
 */
fastify.post('/decrypt', async (request, reply) => {
  const { ciphertext } = request.body;
  try {
    const [ivHex, authTagHex, encryptedText] = ciphertext.split(':');
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, Buffer.from(ivHex, 'hex'));
    decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return { plaintext: decrypted };
  } catch (err) {
    return reply.status(400).send({ error: 'Falla de integridad en el túnel.' });
  }
});

fastify.post('/encrypt', async (request, reply) => {
  const { plaintext } = request.body;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return { ciphertext: `${iv.toString('hex')}:${authTag}:${encrypted}` };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3005, host: '127.0.0.1' });
    console.log('🛡️ Conmutador Service (The Black Box) activo en puerto 3005');
  } catch (err) {
    process.exit(1);
  }
};
start();
