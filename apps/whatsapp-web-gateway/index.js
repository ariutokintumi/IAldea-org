const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const crypto = require('crypto');
const path = require('path');
const { Orchestrator } = require('../../packages/agents/router');
const { pool } = require('../../packages/kernel/db');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: path.join(__dirname, '.wwebjs_auth')
    }),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

/**
 * Hash de privacidad para el número de teléfono
 */
function getPhoneHash(phone) {
    return crypto.createHash('sha256').update(phone).digest('hex');
}

client.on('qr', (qr) => {
    console.log('\n🏛️ [IAldea] ESCANEA ESTE QR PARA ACTIVAR WHATSAPP:\n');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('🚀 IAldea WhatsApp Web Gateway está en línea.');
});

client.on('message', async (msg) => {
    // Evitar procesar grupos o mensajes de sistema
    if (msg.from.includes('@g.us') || msg.isStatus) return;

    const phoneHash = getPhoneHash(msg.from);
    
    try {
      // 1. Autenticación / Registro
      let res = await pool.query(
        'SELECT role_slug, access_level FROM memberships WHERE channel_ref_hash = $1',
        [phoneHash]
      );

      let userRole, userLevel;

      if (res.rows.length === 0) {
        console.log(`✨ Nuevo vecino en WhatsApp (${msg.from}). Auto-registrando L1...`);
        await pool.query(
          'INSERT INTO memberships (contributor_handle, channel_ref_hash, role_slug, access_level, community_id) VALUES ($1, $2, $3, $4, $5)',
          [`wa_${msg.from.split('@')[0]}`, phoneHash, 'ciudadano', 1, 'ia_01']
        );
        userRole = 'ciudadano';
        userLevel = 1;
        await msg.reply("¡Bienvenido a la memoria digital de IAldea! Te he registrado como ciudadano con nivel de acceso L1.");
      } else {
        userRole = res.rows[0].role_slug;
        userLevel = res.rows[0].access_level;
      }

      if (userLevel === 0) return;

      // 2. Procesamiento con Orquestador Maestro
      const orchestrator = new Orchestrator(userRole, userLevel);
      const response = await orchestrator.processMessage(msg.body);
      
      await msg.reply(response);
      
    } catch (err) {
      console.error('❌ Error en WhatsApp Gateway:', err.message);
      await msg.reply("Tuve un problema al consultar mi memoria. Intenta de nuevo.");
    }
});

client.initialize();
