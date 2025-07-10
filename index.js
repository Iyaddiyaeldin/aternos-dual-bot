const mineflayer = require('mineflayer');
const express = require('express');

const SERVER_HOST = 'ourserver-5LOn.aternos.me';
const SERVER_PORT = 41445;

function createBot(botName) {
  const bot = mineflayer.createBot({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: botName
  });

  bot.on('login', () => {
    console.log(`${bot.username} joined the server.`);
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000); // كل 10 ثواني يقفز

    setInterval(() => {
      bot.chat('I am still here!');
    }, 60000); // يرسل رسالة كل دقيقة
  });

  bot.on('end', () => {
    console.log(`${bot.username} got disconnected. Reconnecting...`);
    setTimeout(() => createBot(botName), 5000);
  });

  bot.on('error', (err) => {
    console.error(`${botName} encountered an error:`, err);
  });
}

// إنشاء بوتين بأسماء مختلفة
createBot('AFKBott1');
createBot('AFKBott2');

// خادم إكسبريس لإبقاء البوت نشطًا على Render
const app = express();
app.get('/', (req, res) => res.send('Bots are running'));
app.listen(3000, () => console.log('Keep-alive server is running on port 3000'));
