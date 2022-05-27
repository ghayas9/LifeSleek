const express = require('express')
const { addApointment, getAllAppointments, deleteAppointments } = require('../Controllers/Appointment')
const { verify } = require('../Controllers/auth')
const { OtherImage } = require('../Controllers/Script/UploadImage')
const router = express.Router()


router.post('/add',verify,OtherImage.array('img'),addApointment)
router.get('/all',verify,getAllAppointments)
router.delete('/delete/:id',verify,deleteAppointments)

module.exports = router