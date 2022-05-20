const express = require('express')
const { verify } = require('../Controllers/auth')
const { addGoal } = require('../Controllers/Goal')
const router = express.Router()

// router.use(verify)
router.post('/add',verify,addGoal)

module.exports = router