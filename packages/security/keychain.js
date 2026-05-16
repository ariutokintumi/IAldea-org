const crypto = require('crypto');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const ALGORITHM = 'aes-256-gcm';

/**
 * Gestiona el cifrado y descifrado por niveles (L1, L2, L3)
 */
class Keychain {
  constructor() {
    this.keys = {
      L1: process.env.CONMUTADOR_KEY_L1,
      L2: process.env.CONMUTADOR_KEY_L2,
      L3: process.env.CONMUTADOR_KEY_L3,
      L4: process.env.CONMUTADOR_KEY_L4,
      L5: process.env.CONMUTADOR_KEY_L5
    };
  }

  encrypt(text, level) {
    const key = this.keys[level];
    if (!key) throw new Error(`Llave para nivel ${level} no configurada.`);

    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key, 'hex'), iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');

    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  }

  decrypt(ciphertext, level) {
    const key = this.keys[level];
    if (!key) throw new Error(`Llave para nivel ${level} no configurada.`);

    const [ivHex, authTagHex, encryptedText] = ciphertext.split(':');
    const decipher = crypto.createDecipheriv(
      ALGORITHM, 
      Buffer.from(key, 'hex'), 
      Buffer.from(ivHex, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}

module.exports = new Keychain();
