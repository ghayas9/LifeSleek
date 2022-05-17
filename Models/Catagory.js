const mongoose = require('mongoose')


const CataSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    iconImage: {
        type: String
    },
    name: {
        type: String
    },
}, { timestamps: true })


module.exports = mongoose.model('Catagories', CataSchema)