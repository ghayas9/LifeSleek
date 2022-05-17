const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
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
                ref: 'Goals',
            }
        ],
        default: null
    },
    reminders: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Reminders'
            }
        ],
        default: null
    }
}, { timestamps: true })


module.exports = mongoose.model('Users', UserSchema)