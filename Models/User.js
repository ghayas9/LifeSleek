const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    _id: {
        type:mongoose.Types.ObjectId,
        default:mongoose.Types.ObjectId()
    },
    profileImg: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verify: {
        type: Boolean,
        default: false
    },
    goals: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'goals',
            }
        ],
        default: []
    },
    reminders: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'reminders'
            }
        ],
        default: []
    }
}, { timestamps: true })


module.exports = mongoose.model('users', UserSchema)