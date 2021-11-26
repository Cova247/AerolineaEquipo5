const mongoose = require('mongoose');

const quejasSchema = mongoose.Schema({
    queja: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('quejas', quejasSchema)