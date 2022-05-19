const { LogIn, Register, EmailVerficationCode, getGoals } = require('../Controllers/User')

const express = require('express')
const { verify } = require('../Controllers/auth')
const router = express.Router()

router.post('/login', LogIn)
router.post('/register', Register)
router.post('/OTP',EmailVerficationCode)
router.get('/goals',verify,getGoals)

module.exports = router