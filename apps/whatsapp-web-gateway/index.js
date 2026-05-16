const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const crypto = require('crypto');
const path = require('path');
const { Orchestrator } = require('../../packages/agents/router');
const identity = require('../../packages/security/identity');
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

    try {
      // 1. Identidad Soberana (Hash + Registro)
      const user = await identity.getOrRegisterUser(msg.from, 'whatsapp');

      if (user.access_level === 0) return;

      const { invokeLangGraph } = require('../../packages/agents/langgraph_invoker');
      let response;

      const viaGraph = await invokeLangGraph(msg.body, user.role_slug, user.access_level).catch((e) => {
        console.error('LangGraph:', e.message);
        return null;
      });

      if (viaGraph != null) {
        response = viaGraph;
      } else {
        const orchestrator = new Orchestrator(user.role_slug, user.access_level);
        response = await orchestrator.processMessage(msg.body);
      }

      await msg.reply(response);
      
    } catch (err) {
      console.error('❌ Error en WhatsApp Gateway:', err.message);
      await msg.reply("Tuve un problema al consultar mi memoria. Intenta de nuevo.");
    }
});

client.initialize();
