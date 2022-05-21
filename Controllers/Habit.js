const Habit = require('../Models/Habit');
const myDate = require('../Models/DateAndTime')
const mongoose = require('mongoose')
const Remainder = require('../Models/Reminder')
const Goal = require('../Models/Goal')

const addHabit = (req, res) => {
    if (req.body.title == null || req.body.title == null) {
        res.send({ success: false, message: 'title is required' })
    }
    else if (req.body.desc == null || req.body.desc == null) {
        res.send({ success: false, message: 'desc is required' })
    }
    else if (req.body.dateFrom == null || req.body.dateFrom == null) {
        res.send({ success: false, message: 'Start Date is required' })
    }
    else if (req.body.dateTo == null || req.body.dateTo == null) {
        res.send({ success: false, message: 'End Date is required' })
    }
    else if (req.body.rep == null || req.body.rep == null) {
        res.send({ success: false, message: 'repeation is required' })
    }
    else {
        const newDate = myDate()
        newDate.title = req.body.title
        newDate.dateFrom = new Date(req.body.dateFrom)
        newDate.dateTo = new Date(req.body.dateTo)
        try {
            const cdate = await newDate.save()
            try {
                const newHabit = new Habit()
                newHabit.title = req.body.title
                newHabit.desc = req.body.desc
                newHabit.date = mongoose.Types.ObjectId(cdate._id)
                newHabit.user = mongoose.Types.ObjectId(req.payload._id)
                const cHabit = await newHabit.save()
                res.send({ success: true, message: 'Habit Successfully Added', HId: cHabit._id })
            } catch (err) {
                console.log(err)
                res.send({ success: false, message: 'Habit problem : Goal - 43' })
            }
        } catch (err) {
            res.send({ success: false, message: 'Date problem : Goal - 46' })
        }
    }
}

const addRemainder = async (req, res) => {
    if (req.body.HId == null || req.body.HId == undefined) {
        res.send({ success: false, message: 'Habit is required' })
    }
    else if (req.body.IsOn == null || req.body.IsOn == undefined) {
        res.send({ success: false, message: 'On or Of is required' })
    }
    else if (req.body.daily == null || req.body.daily == undefined) {
        res.send({ success: false, message: 'Daily Limits  is required' })
    } else {
        const newRemainder = new Remainder()

        try {
            const myHabit = await Habit.findOne({ _id: req.body.HId })
            newRemainder.title = myHabit.title
            newRemainder.date = mongoose.Types.ObjectId(myHabit.date)
            newRemainder.IsOn = Boolean(req.body.IsOn)
            newRemainder.user = mongoose.Types.ObjectId(req.payload._id)
            newRemainder.daily = Number(req.body.daily)
            try {
                const CRemainder = await newRemainder.save()
                const UpdateHabit = await Habit.updateOne({ _id: req.body.HId }, {
                    $set: {
                        remainder: mongoose.Types.ObjectId(CRemainder._id)
                    }
                })
                res.send({ success: true, message: 'Remainder Added Successfully' })
            } catch (err) {
                res.send({ success: false, message: 'SomeThing Went Wrong!' })
            }
        } catch (err) {
            res.send({ success: false, message: 'Wrong Habit ID' })
        }

    }
}



const LinkToGoal = (req, res) => {
    if (req.body.HId == null || req.body.HId == undefined) {
        res.send({ success: false, message: 'Habit ID is required' })
    } else if (req.body.GId == null || req.body.GId == undefined) {
        res.send({ success: false, message: 'Goal ID is required' })
    } else {
        try {
            const VHId = await Habit.findOne({ _id: req.body.HId })
            const VGId = await Goal.findOne({ _id: req.body.GId })
            try {
                const UpdateHabit = await Habit.updateOne({ _id: req.body.HId }, {
                    $set: {
                        linkByGoal: mongoose.Types.ObjectId(req.body.GId)
                    }
                })
                const UpdateGoal = await Goal.updateOne({ _id: req.body.GId }, {
                    $set: {
                        linkByHabit: mongoose.Types.ObjectId(req.body.HId)
                    }
                })
                res.send({ success: true, message: 'Successfully Linked EachOthers' })
            } catch (err) {
                res.send({ success: false, message: 'SomeThing Went Wrong!!' })
            }
        } catch (err) {
            res.send({ success: false, message: 'Wrong Habit or Goal ID!!' })
        }
    }
}