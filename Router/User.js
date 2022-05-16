const { LogIn, Register } = require('../Controllers/User/User')

const router = require('express').Router()


router.post('/login',LogIn)
router.post('/register',Register)

module.exports = router