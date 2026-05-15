const fastify = require('fastify')({ logger: false });
const crypto = require('crypto');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const ALGORITHM = 'aes-256-gcm';

// Llavero: Cada nivel tiene su propia llave maestra de 32 bytes
const KEYCHAIN = {
  L1: Buffer.from(process.env.CONMUTADOR_KEY_L1 || '123456789012345678901234567890L1', 'utf8'),
  L2: Buffer.from(process.env.CONMUTADOR_KEY_L2 || '123456789012345678901234567890L2', 'utf8'),
  L3: Buffer.from(process.env.CONMUTADOR_KEY_L3 || '123456789012345678901234567890L3', 'utf8')
};

/**
 * Descifrado por Nivel
 */
fastify.post('/decrypt', async (request, reply) => {
  const { ciphertext, level } = request.body; // Recibe nivel: 'L1', 'L2' o 'L3'
  const key = KEYCHAIN[level || 'L1'];

  try {
    const [ivHex, authTagHex, encryptedText] = ciphertext.split(':');
    const decipher = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(ivHex, 'hex'));
    decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return { plaintext: decrypted };
  } catch (err) {
    console.error(`[CONMUTADOR] Fallo al descifrar nivel ${level}. ¿Llave incorrecta?`);
    return reply.status(400).send({ error: `Falla de integridad o falta de permiso para nivel ${level}.` });
  }
});

fastify.post('/encrypt', async (request, reply) => {
  const { plaintext, level } = request.body;
  const key = KEYCHAIN[level || 'L1'];
  
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return { ciphertext: `${iv.toString('hex')}:${authTag}:${encrypted}` };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3005, host: '127.0.0.1' });
    console.log('🛡️ Búnker IAldea: Llavero de 3 niveles (L1, L2, L3) activo.');
  } catch (err) {
    process.exit(1);
  }
};
start();
