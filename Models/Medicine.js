const mongoose = require('mongoose')
const Medicine = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String
    },
    totalDose: {
        type: Number
    },
    dailyDose: {
        type: Number
    },
    reminders: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'reminders'
        }],
        default: null
    }
}, { timestamps: true })
module.exports = mongoose.model('medicines', Medicine)