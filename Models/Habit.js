const mongoose = require('mongoose')

const Habit = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    title: {
        type: String,
    },
    desc: {
        type: String
    },
    date: {
        type: mongoose.Types.ObjectId,
        ref: 'dates'
    },
    rep:{
        type:Number,
        default:0
    },
    linkByGoal: {
        type: mongoose.Types.ObjectId,
        ref: 'goals',
        default: null
    },
    reminder: {
        type: mongoose.Types.ObjectId,
        ref: 'reminders',
        default: null
    },
    images: {
        type: Array,
        default: []
    }

}, { timestamps: true })

module.exports = mongoose.model('habits', Habit)