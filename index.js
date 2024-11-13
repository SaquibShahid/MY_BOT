const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const { generateAiAnswer } = require('./gemini');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.send("Welcome");
})

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        await bot.sendMessage(chatId, "Hey there , I am saquib , ask me any questions.")
    } catch (e) {
        console.log(e);
    }
});

bot.on('message', async (msg) => {
    try {
        const chatId = msg.chat.id;
        const question = msg.text;

        await bot.sendMessage(chatId, "wait I'll have to ask my brain");
        let answer = await generateAiAnswer(question);

        if (!answer) {
            answer = "Sorry, I don't know the answer yet.";
        }

        await bot.sendMessage(chatId, answer);
    } catch (e) {
        console.log(e);
    }
});


app.listen(3000, () => {
    console.log("Server listening on port 3000")
})