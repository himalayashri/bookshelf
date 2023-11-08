const mongoose = require('mongoose');

const { Schema } = mongoose;

const genreSchema = new Schema({
    genre: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('genre', genreSchema)