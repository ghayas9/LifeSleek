const {LogIn, SignUp, ConfirmEmail, VerifyEmail, EnterEmailForgot, VerifyEmailForgot, newPassword} = require('../Controllers/User')

const express = require('express')
const { verify } = require('../Controllers/auth')
const { addGoal, getGoal } = require('../Controllers/Goal')
const { addHabit } = require('../Controllers/Habit')
const router = express.Router()

router.post('/login',LogIn)
router.post('/signup',SignUp)
router.post('/confirmEmail',ConfirmEmail)
router.post('/verifyEmail',VerifyEmail)
router.post('/forgotpassword',EnterEmailForgot)
router.post('/verifyEmailforgot',VerifyEmailForgot)
router.post('/changepassword',newPassword)

/////////////////////////////////////////
router.post('/goal/add',verify,addGoal)
router.get('/goal/all',verify,getGoal)
router.get('/habit/add',verify,addHabit)
// router.get('/habit/add',verify,getH)

module.exports = router