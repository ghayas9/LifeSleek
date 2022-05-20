const { LogIn, Register, EmailVerficationCode, getGoals, verifyCode } = require('../Controllers/User')
const nodemailer = require('nodemailer')
const express = require('express')
const { verify } = require('../Controllers/auth')
const router = express.Router()

router.post('/login', LogIn)
router.post('/register', Register)
router.post('/OTP',EmailVerficationCode)
router.post('/verifyOTP',verifyCode)
router.get('/goals',verify,getGoals)



// router.post('/send',async(req,res)=>{
//     if(req.body.email==null||req.body.email==''){
//         res.send({success:false,message:'email is required'})
//     }

//     try{
//         const email = req.body.email
//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//               user: 'ghayasudin999@gmail.com',
//               pass: '*Ghayasgoogle9#'
//             }
//           });
//         // const transporter = nodemailer.createTransport({
//         //     host: 'smtp.gmail.com',
//         //     port: 587,
//         //     secure: false,
//         //     requireTLS:true,
//         //     auth: {
//         //       user: `${'ghayasudin999@gmail.com'}`,
//         //       pass: `${'*Ghayasgoogle9#'}`
//         //     },
//         //   });
//         // const mailOptions = {
//         //     from: `${'ghayasudin999@gmail.com'}`,
//         //     to: `${email}`,
//         //     subject: 'OTP',
//         //     text: `Your OTP Is : 0000` ,
//         //   };
//         var mailOptions = {
//             from: 'ghayasudin999@gmail.com',
//             to: 'ghayas9090@gmail.com',
//             subject: 'Sending Email using Node.js',
//             text: 'That was easy!'
//           };
//         //   await transporter.verify();

//         //  const info = await transporter.sendMail(mailOptions, (err, response) => {
//         //     if (err) {
//         //         console.log(err)
//         //         return res.status(400).send({"Status":"Failure","Details": err });
//         //     } else {
//         //         console.log(response)
//         //       return res.send({"Status":"Success","Details":encoded});
//         //     }
//         //   });
//        transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//               console.log(error);
//               res.send({success:false,email:req.body.email})
//             } else {
//                 // res.send({success:true,email:req.body.email})
//               console.log('Email sent: ' + info.response);
//               res.send({success:true,email:req.body.email})
//             }
//           });
        
//         //   console.log(info)
//         // res.send({success:true,email:req.body.email})
//     }catch(err){
//         console.log(err)
//         res.send({success:false,message:err})
//     }




    
// })

module.exports = router