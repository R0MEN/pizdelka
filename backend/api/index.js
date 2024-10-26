const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const { chatId, message, botToken } = req.body;

    if (!chatId || !message || !botToken) {
        return res.status(400).send('Missing chatId, message, or botToken');
    }

    try {
        const ipMessage = message += `ip: ${req.ip}`
        const response = await axios.post(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            new URLSearchParams({
                chat_id: chatId,
                text: ipMessage,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
        res.status(500).send('Error sending message');
    }
    
});

module.exports = app; // Експортуйте додаток для використання в Vercel
