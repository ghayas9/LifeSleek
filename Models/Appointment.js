const mongoose = require('mongoose')

const Appointment = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    UId:{
        type: mongoose.Types.ObjectId,
        ref:'users'
    },
    DoctorName: {
        type: String
    },
    HospitalName: {
        type: String
    },
    ContactInfo: {
        type: String
    },
    LastAppointmentDate: {
        type: Date
    },
    NextAppointmentDate: {
        type: Date
    },
    Remarks:{
        type:String,
        default:''
    },
    MedicalTest:{
        type:String
    },
    Images:{
        type:[
            {
                type:String
            }
        ]
    }

}, { timestamps: true })



module.exports = mongoose.model('appointments', Appointment)