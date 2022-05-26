const { LogIn, Register, EmailVerficationCode, getGoals } = require('../Controllers/User')

const express = require('express')
const { verify } = require('../Controllers/auth')
const { getAllCat, addCatagory, DeleteCat } = require('../Controllers/Catagory')
const { CatImage } = require('../Controllers/Script/UploadImage')
const router = express.Router()

router.post('/addnew',CatImage.array('img',5),addCatagory)

router.get('/all',getAllCat)
router.delete('/delete/:id',DeleteCat)

module.exports = router