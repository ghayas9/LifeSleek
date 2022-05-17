const mongoose = require('mongoose')

const Appointment = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
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
    reminder: {
        type: mongoose.Types.ObjectId,
        ref: 'Reminders',
        default: null
    }

}, { timestamps: true })



module.exports = mongoose.model('Appointments', Appointment)