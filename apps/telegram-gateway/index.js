const { Telegraf } = require('telegraf');
const crypto = require('crypto');
const path = require('path');
const { Orchestrator } = require('../../packages/agents/router');
const identity = require('../../packages/security/identity');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// Middleware de Autenticación Soberana

bot.use(async (ctx, next) => {
  if (!ctx.chat || !ctx.message || !ctx.message.text) return;

  try {
    // 1. Identidad Soberana (Hash + Registro Automático)
    const user = await identity.getOrRegisterUser(ctx.chat.id.toString(), 'telegram');

    ctx.state.role = user.role_slug;
    ctx.state.level = user.access_level;

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
    const { invokeLangGraph } = require('../../packages/agents/langgraph_invoker');
    let response;
    const viaGraph = await invokeLangGraph(userMessage, ctx.state.role, ctx.state.level).catch((e) => {
      console.error('LangGraph:', e.message);
      return null;
    });
    if (viaGraph != null) {
      response = viaGraph;
    } else {
      const orchestrator = new Orchestrator(ctx.state.role, ctx.state.level);
      response = await orchestrator.processMessage(userMessage);
    }

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
