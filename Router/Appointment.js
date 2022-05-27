const express = require('express')
const { addApointment } = require('../Controllers/Appointment')
const { verify } = require('../Controllers/auth')
const { OtherImage } = require('../Controllers/Script/UploadImage')
const router = express.Router()


router.post('/add',verify,OtherImage.array('img'),addApointment)

module.exports = router