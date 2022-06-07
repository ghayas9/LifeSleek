const Appointment = require('../Models/Appointment')

module.exports = {
    addApointment: async (req, res) => {
        if (req.body.DoctorName == '' || req.body.DoctorName == undefined) {
            res.json({ success: false, message: 'Doctor Name is requaired!' })
        }
        else if (req.body.HospitalName == '' || req.body.HospitalName == undefined) {
            res.json({ success: false, message: 'Hospital Name is requaired!' })
        }
        else if (req.body.ContactInfo == '' || req.body.ContactInfo == undefined) {
            res.json({ success: false, message: 'Contact Number is requaired!' })
        }
        else if (req.body.LastAppointmentDate == '' || req.body.LastAppointmentDate == undefined) {
            res.json({ success: false, message: 'Last Appointment Date is requaired!' })
        }
        else {
            // working Area
            const newAppointment = new Appointment()

            newAppointment.UId = req.payload._id
            newAppointment.DoctorName = req.body.DoctorName
            newAppointment.HospitalName = req.body.HospitalName
            newAppointment.ConstactInfo = req.body.ConstactInfo

            if (req.body.LastAppointmentDate !== '' && req.body.LastAppointmentDate !== undefined) {
                newAppointment.LastAppointmentDate = new Date(req.body.LastAppointmentDate)
            }
            if (req.body.NextAppointmentDate !== '' && req.body.NextAppointmentDate !== undefined) {
                newAppointment.NextAppointmentDate = new Date(req.body.NextAppointmentDate)
            }

            if (req.body.remarks) {
                newAppointment.remarks = req.body.remarks
            }
            if (req.body.MedicalTest) {
                newAppointment.MedicalTest = req.body.MedicalTest
            }
            if (req.files.length > 0) {
                const img = () => {
                    return req.files.map((e) => {
                        return `/other/${e.filename}`
                    })
                }
                newAppointment.Images = img()
            }
            try {
                const cAppointment = await newAppointment.save()
                return res.json({ success: true, message: 'Appointment Added Successfully', AId: cAppointment.toObject()._id })
            } catch (err) {
                res.json({ success: false, message: 'SomeThing went wrong!' })
            }
            res.json({ success: false, message: 'SomeThing went wrong!' })
        }
    },//End OF AddAppointment 
    getAllAppointments: async (req, res) => {
        try {
            const Appointments = await Appointment.find({ UId: req.payload._id })
            return res.json({ success: true, Appointments })
        } catch (err) {
            return res.json({ success: false, Message: 'SomeThing went wrong' })
        }

    },
    deleteAppointments: async (req, res) => {
        try {
            const app = await Appointment.findOne({ _id: req.params.id })
            if (req.payload._id == app.UId) {
                try {
                    const del = await Appointment.deleteOne({ _id: req.params.id })
                    return res.json({ success: true, message: 'Successfully Deleted' })
                } catch (err) {
                    return res.json({ success: false, message: 'Something went wrong' })
                }
            } else {
                return res.json({ success: false, message: 'This is not your Appointment' })
            }
        } catch (err) {
            return res.json({ success: false, message: 'Not Found' })
        }
    }
}