const mongoose = require('mongoose')

const RemSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
    date: {
        type: mongoose.Types.ObjectId,
        ref: 'Dates'
    },

}, { timestamps: true })

module.exports = mongoose.model('Reminders', RemSchema)