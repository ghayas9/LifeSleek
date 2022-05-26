const Appointment = require('../Models/Appointment')




module.exports = {
    addApointment:async(req,res)=>{
        if(req.body.DoctorName==null||req.body.DoctorName==undefined){
            res.send({ success: false, message: 'Doctor Name is requaired!' })
        }
        else if (req.body.HospitalName==null||req.body.HospitalName==undefined){
            res.send({ success: false, message: 'Doctor Hospital is requaired!' })
        }
        else if (req.body.ContactInfo==null||req.body.ContactInfo==undefined){
            res.send({ success: false, message: 'Contact Number is requaired!' })
        }
        else if (req.body.LastAppointmentDate==null||req.body.LastAppointmentDate==undefined){
            res.send({ success: false, message: 'Last Appointment Date is requaired!' })
        }
        else if (req.body.NextAppointmentDate==null||req.body.NextAppointmentDate==undefined){
            res.send({ success: false, message: 'Next Appointment Date is requaired!' })
        }else{
            // working Area
            const body = req.body
            const newAppointment = new Appointment()

            newAppointment.DoctorName =body.DoctorName
            newAppointment.HospitalName =body.HospitalName
            newAppointment.ConstactInfo =body.ConstactInfo
            newAppointment.LastAppointmentDate =new Date(body.LastAppointmentDate)
            newAppointment.NextAppointmentDate =new Date(body.NextAppointmentDate)
            try{
                const cAppointment = await newAppointment.save()
                res.send({ success: true, message: 'Appointment Added Successfully' ,AId:cAppointment._id })
            }catch(err){
                res.send({ success: false, message: 'SomeThing went wrong!' })
            }
            res.send({ success: false, message: 'SomeThing went wrong!' })
        }
    },//End OF AddAppointment 
}