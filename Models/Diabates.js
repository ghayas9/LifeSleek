const mongoose = require('mongoose')

const BloodPressure = new mongoose.Schema({
    dateTime:{
        type:Date,
        required:true
    },
    systol:{
        type:Number,
        required:true
    },
    dystol:{
        type:Number,
        required:true
    },
    detail:{
        type:String
    }
    
},{timestamps:true})

module.exports = mongoose.model('bloodPressure',BloodPressure)