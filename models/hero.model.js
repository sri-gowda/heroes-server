const mongoose = require('mongoose');

var heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },

});

mongoose.model('Hero', heroSchema);