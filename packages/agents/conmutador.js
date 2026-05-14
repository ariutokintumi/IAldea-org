const crypto = require('crypto');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

/**
 * El Conmutador: Túnel cifrado AES-256-GCM para comunicación entre agentes.
 */
class Conmutador {
  constructor() {
    this.algorithm = 'aes-256-gcm';
    this.key = Buffer.from(process.env.CONMUTADOR_KEY || '0123456789abcdef0123456789abcdef', 'utf-8').slice(0, 32);
  }

  /**
   * Encripta un mensaje.
   */
  encrypt(text) {
    const iv = crypto.randomBytes(12); // Nonce recomendado para GCM
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag().toString('hex');
    
    // El formato de salida es IV:AuthTag:EncryptedData
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  }

  /**
   * Desencripta un mensaje.
   */
  decrypt(encryptedData) {
    try {
      const [ivHex, authTagHex, encryptedText] = encryptedData.split(':');
      
      const iv = Buffer.from(ivHex, 'hex');
      const authTag = Buffer.from(authTagHex, 'hex');
      const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
      
      decipher.setAuthTag(authTag);
      
      let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      console.error('🛡️ Error en el Conmutador: Clave incorrecta o mensaje corrupto.');
      return null; // Regla de Silencio: No hay respuesta si falla el cifrado
    }
  }
}

module.exports = new Conmutador();
