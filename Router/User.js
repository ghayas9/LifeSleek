const { LogIn, Register } = require('../Controllers/User')

const express = require('express')
const router = express.Router()

router.post('/login',LogIn)
router.post('/register',Register)

module.exports = router