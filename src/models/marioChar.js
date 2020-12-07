const mongoose = require('mongoose');

const marioModel = mongoose.Schema({
    name: String,
    weight: Number
});


module.exports = mongoose.model('marioCharacter',marioModel);