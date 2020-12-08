const mongoose = require('mongoose');

const marioModel = new mongoose.Schema({
    name: String,
    weight: Number
});


module.exports = mongoose.model('mariochar',marioModel);