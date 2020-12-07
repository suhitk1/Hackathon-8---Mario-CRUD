const express = require('express')
const mongoose = require('mongoose');
const app = express()
const bodyParser = require("body-parser");
const mario = require('./models/marioChar');
const marioModel = mongoose.model('Mario',mario);
// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
app.get('/mario', function (request, response) {
    marioModel.find({}, function (err, result) {
        if (err) {
            response.send(err);
        } else {
            response.send(result);
        }
    });
});


module.exports = app;