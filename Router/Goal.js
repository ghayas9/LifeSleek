const express = require('express')
const { verify } = require('../Controllers/auth')
const { addGoal, addImage } = require('../Controllers/Goal')
const { OtherImage } = require('../Controllers/Script/UploadImage')
const router = express.Router()

// router.use(verify)
router.post('/add',verify,addGoal)
router.post('/addImage',OtherImage.array('img',5),addImage)

module.exports = router