const express = require('express')
const { addImage } = require('../Controllers/Habit')
const { OtherImage } = require('../Controllers/Script/UploadImage')
const router = express.Router()

router.post('/addImage',addImage)

module.exports = router