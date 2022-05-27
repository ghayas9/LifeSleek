const {LogIn, SignUp, ConfirmEmail, VerifyEmail, EnterEmailForgot, VerifyEmailForgot, newPassword} = require('../Controllers/User')

const express = require('express')
const router = express.Router()

router.post('/login',LogIn)
router.post('/signup',SignUp)
router.post('/confirmEmail',ConfirmEmail)
router.post('/verifyEmail',VerifyEmail)
router.post('/forgotpassword',EnterEmailForgot)
router.post('/verifyEmailforgot',VerifyEmailForgot)
router.post('/changepassword',newPassword)

/////////////////////////////////////////
const goalRouter = require('./Goal')
//all   //add //addremainder //linkto
router.use('/goal',goalRouter)

////////////////////////////////////////
const habitRouter = require('./Habits')
//all   //add //addremainder //linkto
router.use('/habit',habitRouter)

/////////////////////////////////////////
const appointment = require('./Appointment')
//all  //add  //delete
router.use('/appointment',appointment)


module.exports = router