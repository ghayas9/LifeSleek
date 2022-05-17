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
    after:{
        type:Number,
        default:1
    }

}, { timestamps: true })

module.exports = mongoose.model('Reminders', RemSchema)