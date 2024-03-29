const express = require('express')
const { verify } = require('../Controllers/auth')
const { addHabit, addRemainder, LinkToGoal, getAllHabits, Delete } = require('../Controllers/Habit')
const router = express.Router()


router.get('/all',verify,getAllHabits)
router.post('/add',verify,addHabit)
router.post('/addremainder',verify,addRemainder)
router.post('/linkto',verify,LinkToGoal)
router.delete('/delete/:id',verify,Delete)

module.exports= router