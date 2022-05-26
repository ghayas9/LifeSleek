const mongoose = require('mongoose')

const RemSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    IsOn:{
        type:Boolean,
        default:false
    },
    title: {
        type: String
    },
    UId: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: mongoose.Types.ObjectId,
        ref: 'dates'
    },
    daily: {
        //After 1D => 1, 1M => 30 ,1Y => 360
        type: Number,
        default: 0
    }

}, { timestamps: true })

module.exports = mongoose.model('reminders', RemSchema)