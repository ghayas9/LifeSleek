const express = require('express')
const { verify } = require('../Controllers/auth')
const { getAllCat, addCatagory, DeleteCat } = require('../Controllers/Catagory')
const { CatImage } = require('../Controllers/Script/UploadImage')
const router = express.Router()



router.post('/add',CatImage.single('img'),addCatagory)
router.get('/all',getAllCat)
router.delete('/delete/:id',DeleteCat)

module.exports = router