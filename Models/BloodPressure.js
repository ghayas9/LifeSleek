const mongoose = require('mongoose')

const BloodPressure = new mongoose.Schema({
    dateTime:{
        type:Date,
        required:true
    },
    value:{
        type:Number,
        required:true
    },
    IsBeforeMeal:{
        type:Boolean,
        default:true
    }
    
},{timestamps:true})

module.exports = mongoose.model('bloodPressure',BloodPressure)