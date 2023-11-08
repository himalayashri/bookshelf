const mongoose = require("mongoose");

const { Schema } = mongoose;

const wtrSchema = new Schema({
    userId: {
        type: Object,
        required: true
    },
    wtrId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('wtr', wtrSchema);
