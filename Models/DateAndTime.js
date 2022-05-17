const mongoose= require('mongoose')

const dateAndTime =new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    title:{
        type:String,
        default:''
    },
    from:{
        type:Date
    },
    to:{
        type:Date
    }
},{timestamps:true})

module.exports = mongoose.model('dates',dateAndTime)