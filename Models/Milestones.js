const mongoose = require('mongoose')

const Milestones = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    user: {
        type: mongoose.type.ObjectId,
        ref: 'Users'
    },
    title:{
        type:String
    },
    desc:{
        type:String
    },
    target:{
        type:String
    }
},{timestamps:true})


module.exports = mongoose.model('Milestones',Milestones)