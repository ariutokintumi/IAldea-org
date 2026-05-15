const { Telegraf } = require('telegraf');
const crypto = require('crypto');
const path = require('path');
const { Orchestrator } = require('../../packages/agents/router');
const { pool } = require('../../packages/kernel/db');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

/**
 * Genera el hash de privacidad para el ID de Telegram.
 */
function getTelegramHash(chatId) {
  return crypto.createHash('sha256').update(chatId.toString()).digest('hex');
}

/**
 * Middleware de Autenticación y Auto-onboarding
 */
bot.use(async (ctx, next) => {
  if (!ctx.chat || !ctx.message || !ctx.message.text) return;

  const telegramHash = getTelegramHash(ctx.chat.id);
  
  try {
    // 1. Buscar o registrar usuario
    let res = await pool.query(
      'SELECT role_slug, access_level FROM memberships WHERE channel_ref_hash = $1',
      [telegramHash]
    );

    if (res.rows.length === 0) {
      console.log(`✨ Nuevo vecino en Telegram (${ctx.chat.id}). Auto-registrando L1...`);
      await pool.query(
        'INSERT INTO memberships (contributor_handle, channel_ref_hash, role_slug, access_level, community_id) VALUES ($1, $2, $3, $4, $5)',
        [`tg_${ctx.chat.id}`, telegramHash, 'ciudadano', 1, 'ia_01']
      );
      ctx.state.role = 'ciudadano';
      ctx.state.level = 1;
      await ctx.reply("¡Bienvenido a la memoria digital de IAldea! Te he registrado como ciudadano con nivel de acceso L1.");
    } else {
      ctx.state.role = res.rows[0].role_slug;
      ctx.state.level = res.rows[0].access_level;
    }

    if (ctx.state.level === 0) {
      return ctx.reply("Lo siento, tu acceso ha sido restringido.");
    }

    return next();
  } catch (err) {
    console.error('❌ Error en auth de Telegram:', err.message);
  }
});

/**
 * Manejador de Mensajes
 */
bot.on('text', async (ctx) => {
  const userMessage = ctx.message.text;
  
  // Mostrar estado "escribiendo"
  await ctx.sendChatAction('typing');

  try {
    const orchestrator = new Orchestrator(ctx.state.role, ctx.state.level);
    const response = await orchestrator.processMessage(userMessage);
    
    await ctx.reply(response, { parse_mode: 'Markdown' });
  } catch (err) {
    console.error('❌ Error procesando mensaje en Telegram:', err.message);
    await ctx.reply("Tuve un problema al consultar mi memoria. Intenta de nuevo.");
  }
});

// Iniciar Bot
bot.launch();
console.log('🚀 IAldea Telegram Gateway iniciado (Polling)...');

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
