const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/login',(req,res)=>{
    res.render(path.join(__dirname,'../views/LogIn.ejs'))
})

module.exports = router