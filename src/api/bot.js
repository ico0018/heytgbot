import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN; // 在 Vercel 环境变量里配置
const bot = new TelegramBot(token, { polling: false });

// 防止重复初始化
if (!global.botInitialized) {
  bot.setWebHook(`https://heytgbot.vercel.app/api/bot`);
  global.botInitialized = true;

  // /start 命令
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "点击打开 WebApp 👇", {
      reply_markup: {
        inline_keyboard: [[
          { text: "打开我的应用", web_app: { url: "https://heytgbot.vercel.app" } }]
        ]
      }
    });
  });
}

export default function handler(req, res) {
  if (req.method === "POST") {
    bot.processUpdate(req.body);
    return res.status(200).end();
  }
  res.status(200).send("Bot is running via Webhook!");
}
