const Appointment = require('../Models/Appointment')

module.exports = {
    addApointment:async(req,res)=>{
        if(req.body.DoctorName==''||req.body.DoctorName==undefined){
            res.send({ success: false, message: 'Doctor Name is requaired!' })
        }
        else if (req.body.HospitalName==''||req.body.HospitalName==undefined){
            res.send({ success: false, message: 'Hospital Name is requaired!' })
        }
        else if (req.body.ContactInfo==''||req.body.ContactInfo==undefined){
            res.send({ success: false, message: 'Contact Number is requaired!' })
        }
        else if (req.body.LastAppointmentDate==''||req.body.LastAppointmentDate==undefined){
            res.send({ success: false, message: 'Last Appointment Date is requaired!' })
        }
        else{
            // working Area
            const newAppointment = new Appointment()

            newAppointment.UId =req.payload._id
            newAppointment.DoctorName =body.DoctorName
            newAppointment.HospitalName =body.HospitalName
            newAppointment.ConstactInfo =body.ConstactInfo
            newAppointment.LastAppointmentDate =new Date(body.LastAppointmentDate)

            if (req.body.NextAppointmentDate!==''||req.body.NextAppointmentDate!==undefined){
                newAppointment.NextAppointmentDate =new Date(body.NextAppointmentDate)
            }
            
            if(req.body.remarks){
                newAppointment.remarks=req.body.remarks
            }
            if(req.body.MedicalTest){
                newAppointment.MedicalTest =req.body.MedicalTest
            }
            else if (req.body.NextAppointmentDate==''||req.body.NextAppointmentDate==undefined){
            res.send({ success: false, message: 'Next Appointment Date is requaired!' })
        }
            if(req.files.length>0){
                const img = ()=>{
                    return req.files.map((e)=>{
                        return `/other/${e.filename}`
                    })
                }
                newAppointment.Images =img()
            }
            try{
                const cAppointment = await newAppointment.save()
                return res.send({ success: true, message: 'Appointment Added Successfully' ,AId:cAppointment.toObject()._id })
            }catch(err){
                res.send({ success: false, message: 'SomeThing went wrong!' })
            }
            res.send({ success: false, message: 'SomeThing went wrong!' })
        }
    },//End OF AddAppointment 
}