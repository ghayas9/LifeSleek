const mongoose = require('mongoose')


const UserSchema =new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    verify:{
        type:Boolean,
        default:false
    }
})


module.exports = mongoose.model('User',UserSchema)