const TelegramApi = require('node-telegram-bot-api');
const sequelize = require('./db');
const UserModel = require('./models');
const token = '6539749303:AAF520m4E5IgYHKYZiaoPkOLr0ynTDWLcGk'

const bot = new TelegramApi(token, {polling: true})
const shop = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'VPN месяц', callback_data: 'month'}],
            [{text: 'VPN год', callback_data: 'year'}],
            [{text: 'VPN сервер', callback_data: 'server'}]
        ]
    })
}
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

    } catch (e) {
        console.log('Проблемы с БД')
    }



    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/price', description: 'Список товаров'},
        {command: '/shoping', description: 'Выбор товара'}
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatID = msg.chat.id;
        try {
            if (text === '/start') {
                await UserModel.create({chatID})
                await bot.sendSticker(chatID, 'https://cdn.tlgrm.app/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/192/7.webp')
                return bot.sendMessage(chatID, `Добро пожаловать в мой скромный магазинчик электронных услуг`)
            }
            if (text === '/price') {
                return bot.sendMessage(chatID, `VPN месяц 200 рублей
VPN год 2000
Индивидуальный VPN сервер год 12000 руб`)
            }
            if (text === '/shoping') {
                return bot.sendMessage(chatID, 'Выбери нужный товар', shop);
            }
            return bot.sendMessage(chatID, 'Я тебя не понимаю, попробуй еще раз!');
        } catch (e) {
            return bot.sendMessage((chatID, 'Ошибочка вышла'))
        }
    })
    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatID = msg.message.chat.id;
    })
}

start()
