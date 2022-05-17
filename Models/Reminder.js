const mongoose = require('mongoose')

const RemSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title:{
        type:String
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
    date: {
        type: mongoose.Types.ObjectId,
        ref: 'Dates'
    },
    after:{
        //After 1D => 1, 1M => 30 ,1Y => 360
        type:Number,
        default:1
    }

}, { timestamps: true })

module.exports = mongoose.model('Reminders', RemSchema)