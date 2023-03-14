const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();





const errorController = require('./controllers/error');

const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
    credentials: true
};

const app = express();

app.use(express.json());
app.use(cors(corsOpts));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course')

app.use('/auth', authRoutes);
app.use('/course', courseRoutes)




mongoose.connect(
    process.env.mongodb
).then(() => {
    console.log("Database Connected")
    app.listen(process.env.PORT || 9000)
}).catch((err) => {
    console.log(err);
});