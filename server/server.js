const express = require('express');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');
const cors = require('cors');

const TELEGRAM_TOKEN = '8064558502:AAFJG2YgHtcYEYgOlI8jftfgYh1lMhLye3M';
const PORT = process.env.PORT || 5000;
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
const app = express();
let id;
let invited;
let userName;

app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));

app.use(bodyParser.json());


const users = new Map();

const generateInviteLink = () => {
    return `https://t.me/testGlorybot?start=${id}`;
};


bot.onText(/\/start/, (msg) => {
    id = msg.from.id
    userName = msg.from.username || `${msg.from.first_name} ${msg.from.last_name}`;
    const userLanguage = msg.from.language_code;

    const startParam = msg.text.split(' ')[1] || null; 

    console.log('Пользователь начал чат:');
    console.log(`ID: ${id}`);
    console.log(`Имя: ${userName}`);
    console.log(`Язык: ${userLanguage}`);
    invited = undefined
    if (startParam) {
        invited = startParam
        console.log(`Пригласил: ${startParam}`);
    }

    users.set(userId, { name: userName, referrerId: startParam });

    console.log('Список пользователей:', Array.from(users.entries()));

    let responseMessage = `Привет, ${userName}! Мы получили ваши данные.`;
    if (startParam) {
        responseMessage += ` Вас пригласил пользователь с ID: ${startParam}`;
    }
    bot.sendMessage(msg.chat.id, responseMessage);
});


app.get('/api/getUserData', (req,res) => {
    console.log(PORT)
    const userId = id;
    console.log(id)

    if (!userId) {
        return res.status(404).json({ error: 'Пользователь не найден.' });
    }

    const userData = users.get(parseInt(userId));
    res.status(200).json({
        userId,
        invited,
        userName,
        ...userData,
    });
});

app.get('/api/getInviteLink', (req, res) => {
    const userId = req.query.userId; 
    if (!userId) {
        return res.status(400).json({ error: 'userId не указан.' });
    }

    const inviteLink = generateInviteLink();
    res.status(200).json({ inviteLink });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

