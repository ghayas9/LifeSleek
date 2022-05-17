const mongoose = require('mongoose')


const Goal = new mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    user: {
        type: mongoose.type.ObjectId,
        ref: 'Users'
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
        type:mongoose.Types.ObjectId,
        ref:'Dates'
    },
    reminder: {
        type: mongoose.Types.ObjectId,
        ref: 'Reminder'
    },
    images: {
        type: String,
        default: []
    }
}, { timestamps: true })


module.exports = mongoose.model('Goals', Goal)