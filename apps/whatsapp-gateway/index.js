const fastify = require('fastify')({ logger: true });
const axios = require('axios');
const crypto = require('crypto');
const path = require('path');
const { Orchestrator } = require('../../packages/agents/router');
const { pool } = require('../../packages/kernel/db');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'ialdea_secret_token';
const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_ID;

/**
 * Genera el hash de privacidad para el número de teléfono.
 */
function getPhoneHash(phone) {
  return crypto.createHash('sha256').update(phone).digest('hex');
}

/**
 * Webhook Verification (GET)
 */
fastify.get('/webhook', async (request, reply) => {
  const mode = request.query['hub.mode'];
  const token = request.query['hub.verify_token'];
  const challenge = request.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return challenge;
  }
  reply.code(403).send('Forbidden');
});

/**
 * Recibir mensajes (POST)
 */
fastify.post('/webhook', async (request, reply) => {
  const body = request.body;

  if (body.object === 'whatsapp_business_account') {
    for (const entry of body.entry) {
      for (const change of entry.changes) {
        if (change.value.messages) {
          for (const message of change.value.messages) {
            const from = message.from; // Número del usuario
            const msgBody = message.text ? message.text.body : null;

            if (msgBody) {
              await handleWhatsAppMessage(from, msgBody);
            }
          }
        }
      }
    }
    return { status: 'ok' };
  }
  reply.code(404).send();
});

/**
 * Lógica de Orquestación y Respuesta
 */
async function handleWhatsAppMessage(phone, text) {
  const phoneHash = getPhoneHash(phone);
  console.log(`📱 Mensaje de ${phone} (Hash: ${phoneHash})`);

  try {
    // 1. Validar acceso o auto-registrar
    let userRes = await pool.query(
      'SELECT role_slug, access_level FROM memberships WHERE channel_ref_hash = $1',
      [phoneHash]
    );

    let role = 'ciudadano';
    let level = 1; // Default para nuevos usuarios

    if (userRes.rows.length === 0) {
      console.log(`✨ Nuevo vecino detectado. Auto-registrando como L1...`);
      await pool.query(
        'INSERT INTO memberships (contributor_handle, channel_ref_hash, role_slug, access_level, community_id) VALUES ($1, $2, $3, $4, $5)',
        [phone, phoneHash, role, level, 'ia_01']
      );
    } else {
      role = userRes.rows[0].role_slug;
      level = userRes.rows[0].access_level;
    }

    if (level === 0) {
      await sendWhatsAppResponse(phone, "Lo siento, tu acceso ha sido restringido por la administración de IAldea.");
      return;
    }

    // 2. Orquestación (LangGraph si LANGGRAPH_ORCHESTRATOR_URL; si no, router Node)
    const { invokeLangGraph } = require('../../packages/agents/langgraph_invoker');
    let responseText = await invokeLangGraph(text, role, level).catch((e) => {
      console.error('LangGraph:', e.message);
      return null;
    });
    if (responseText == null) {
      const orchestrator = new Orchestrator(role, level);
      responseText = await orchestrator.processMessage(text);
    }

    // 3. Enviar respuesta de vuelta a WhatsApp
    await sendWhatsAppResponse(phone, responseText);

  } catch (err) {
    console.error('❌ Error procesando mensaje de WhatsApp:', err.message);
  }
}

/**
 * Envío de mensaje vía Meta API
 */
async function sendWhatsAppResponse(to, text) {
  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
    console.warn('⚠️ WhatsApp API no configurada. Respuesta en consola:', text);
    return;
  }

  try {
    await axios.post(`https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`, {
      messaging_product: "whatsapp",
      to: to,
      text: { body: text }
    }, {
      headers: { 'Authorization': `Bearer ${WHATSAPP_TOKEN}` }
    });
  } catch (err) {
    console.error('❌ Error enviando a WhatsApp:', err.response ? err.response.data : err.message);
  }
}

// Iniciar servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 WhatsApp Gateway escuchando en puerto 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
