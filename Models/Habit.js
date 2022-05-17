const mongoose = require('mongoose')

const Habit = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: {
        type: String,
    },
    desc: {
        type: String
    },
    date: {
        type: mongoose.Types.ObjectId,
        ref: 'Dates'
    },
    linkByGoal: {
        type: mongoose.Types.ObjectId,
        ref: 'Goals',
        default: null
    },
    images: {
        type: Array,
        default: []
    }

}, { timestamps: true })

module.exports = mongoose.model('Habits', Habit)