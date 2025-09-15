const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

// 打印环境变量（注意：不要在生产里长期打印 Token，会泄露）
console.log("BOT_TOKEN from env:", token ? "存在 ✅" : "未设置 ❌");

if (!global.bot && token) {
  const bot = new TelegramBot(token, { polling: false });

  // 设置 Webhook
  bot.setWebHook("https://heytgbot.vercel.app/api/bot");

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

  global.bot = bot;
}

module.exports = (req, res) => {
  if (req.method === "POST") {
    try {
      if (!token) {
        console.error("❌ BOT_TOKEN 未设置，无法处理更新");
      } else {
        global.bot.processUpdate(req.body);
      }
    } catch (err) {
      console.error("Error processing update:", err);
    }
    return res.status(200).end();
  }

  res.status(200).send("Bot is running via Webhook!");
};
