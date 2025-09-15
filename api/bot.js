import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: false });

// 确保只初始化一次（防止 Vercel 热重载重复绑定）
if (!global.botInitialized) {
  bot.setWebHook(`https://heytgbot.vercel.app/api/bot`);
  global.botInitialized = true;

  // 处理 /start 命令
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "点击打开 WebApp 👇", {
      reply_markup: {
        inline_keyboard: [[
          { text: "打开我的应用", web_app: { url: "https://heytgbot.vercel.app" } }
        ]]
      }
    });
  });
}

export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      bot.processUpdate(req.body);
    } catch (err) {
      console.error("Error processing update:", err);
    }
    return res.status(200).end();
  }

  // 用于调试：在浏览器访问 /api/bot 会返回这一行
  res.status(200).send("Bot is running via Webhook!");
}
