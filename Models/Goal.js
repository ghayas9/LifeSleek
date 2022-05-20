const mongoose = require('mongoose')


const Goal = new mongoose.Schema({

    _id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    catagory:{
        type:{
            type:mongoose.Types.ObjectId,
            ref:'catagories'
        }
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
        type:[
            {
                type:String
            }
        ],
        default:null
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