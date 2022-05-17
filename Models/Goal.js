const mongoose = require('mongoose')


const Goal = new mongoose.Schema({

    _id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    user: {
        type: mongoose.type.ObjectId,
        ref: 'users'
    },
    title: {
        type: String
    },
    desc: {
        type: String
    },
    target: {
        type: String
    },
    date: {
        type: mongoose.Types.ObjectId,
        ref: 'dates'
    },
    reminder: {
        type: mongoose.Types.ObjectId,
        ref: 'reminders',
        default: null
    },
    linkByHabit: {
        type: mongoose.Types.ObjectId,
        ref: 'habits',
        default: null
    },
    images: {
        type: Array,
        default: []
    },
    milestones: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'milestones'
        }],
        default: null
    }
}, { timestamps: true })


module.exports = mongoose.model('goals', Goal)