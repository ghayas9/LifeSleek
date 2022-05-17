const mongoose = require('mongoose')


const CataSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    iconImage: {
        type: String
    },
    name: {
        type: String
    },
}, { timestamps: true })


module.exports = mongoose.model('catagories', CataSchema)