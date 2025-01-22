const express = require('express');
const path = require('path');
const app = express();
const PORT = 9000;
const cors = require("cors");


app.use(express.static(path.join(__dirname, '../src')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(
    cors({
        origin: [
            "http://localhost:3000",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.post('/api/form-submit', (req, res) => {
    const {firstName, email, phone, message} = req.body;

    const errors = {};
    if (!firstName) errors.firstName = "Имя не должно быть пустым";
    if (!email || !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
        errors.email = "Некорректный адрес электронной почты";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            status: "error",
            fields: errors,
        });
    }

    res.status(200).json({
        status: "success",
        msg: "Ваша заявка успешно отправлена",
    });

    res.status(200).json({message: "Данные успешно получены!"});
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
})


module.exports = app;