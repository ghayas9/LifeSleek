const mongoose = require('mongoose')
const Medicine = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    UId: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
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
        type: {
            dateFrom:{type:Date},
            dateTo:{type:Date},
            IsOn:{type:Boolean,default:false},
            daily:[
                {
                    title:{
                        type:String,
                        required:true
                    }
                }
            ]
        }
    }
}, { timestamps: true })
module.exports = mongoose.model('medicines', Medicine)