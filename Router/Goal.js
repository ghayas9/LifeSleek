const express = require('express')
const { verify } = require('../Controllers/auth')
const { addGoal, addImage, getGoal, addRemainder, LinkToHabit } = require('../Controllers/Goal')
const { OtherImage } = require('../Controllers/Script/UploadImage')
const router = express.Router()

// router.use(verify)
router.get('/all',verify,getGoal)
router.post('/add',verify,addGoal)
router.post('/addremainder',verify,addRemainder)
router.post('/linkto',verify,LinkToHabit)
// router.post('/add',verify,addGoal)

// router.post('/addImage',OtherImage.array('img',5),addImage)

module.exports = router