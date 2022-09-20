const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
})

module.exports = mongoose.model('Client', ClientSchema)