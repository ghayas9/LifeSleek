const mongoose = require('mongoose')
const Medicine = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
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
            ref: 'Reminders'
        }],
        default: null
    }
},{timestamps:true})
module.exports = mongoose.model('Medicines', Medicine)