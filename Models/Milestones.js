const mongoose = require('mongoose')

const Milestones = new mongoose.Schema({
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
    }
}, { timestamps: true })


module.exports = mongoose.model('milestones', Milestones)