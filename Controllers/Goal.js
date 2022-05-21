const Goal = require('../Models/Goal')
const myDate = require('../Models/DateAndTime')
const mongoose = require('mongoose')
const Habit = require('../Models/Habit');
const Remainder = require('../Models/Reminder');
const Milestones = require('../Models/Milestones');

module.exports = {
    addGoal: async (req, res) => {
        if (req.body.title == null || req.body.title == '') {
            res.send({ success: false, message: 'title is required' })
        }
        else if (req.body.desc == null || req.body.desc == '') {
            res.send({ success: false, message: 'desc is required' })
        }
        else if (req.body.target == null || req.body.target == '') {
            res.send({ success: false, message: 'target is required' })
        }
        else if (req.body.catId == null || req.body.catId == '') {
            res.send({ success: false, message: 'cat id is required' })
        }
        else if (req.body.dateFrom == null || req.body.dateFrom == '') {
            res.send({ success: false, message: 'Start Date is required' })
        }
        else if (req.body.dateTo == null || req.body.dateTo == '') {
            res.send({ success: false, message: 'End Date is required' })
        }
        else {
            const newDate = myDate()
            newDate.title = req.body.title
            newDate.dateFrom = new Date(req.body.dateFrom)
            newDate.dateTo = new Date(req.body.dateTo)
            try {
                const cdate = await newDate.save()
                try {
                    const newGoal = new Goal()
                    newGoal.catId = mongoose.Types.ObjectId(req.body.catId)
                    newGoal.title = req.body.title
                    newGoal.desc = req.body.desc
                    newGoal.target = req.body.target
                    newGoal.date = mongoose.Types.ObjectId(cdate._id)
                    newGoal.user = mongoose.Types.ObjectId(req.payload._id)
                    const cGoal = await newGoal.save()
                    res.send({ success: true, message: 'Goal Successfully Added', GId: cGoal._id })
                } catch (err) {
                    console.log(err)
                    res.send({ success: false, message: 'Goal problem : Goal - 43' })
                }
            } catch (err) {
                res.send({ success: false, message: 'Date problem : Goal - 46' })
            }
        }
    },
    addRemainder: async (req, res) => {
        if (req.body.GId == '' || req.body.HId == undefined) {
            res.send({ success: false, message: 'Goal is required' })
        }
        else if (req.body.IsOn == '' || req.body.IsOn == undefined) {
            res.send({ success: false, message: 'On or Of is required' })
        }
        else if (req.body.daily == '' || req.body.daily == undefined) {
            res.send({ success: false, message: 'Daily Limits  is required' })
        } else {
            const newRemainder = new Remainder()

            try {
                const myGoal = await Goal.findOne({ _id: req.body.GId })
                newRemainder.title = myGoal.title
                newRemainder.date = mongoose.Types.ObjectId(myGoal.date)
                newRemainder.IsOn = Boolean(req.body.IsOn)
                newRemainder.user = mongoose.Types.ObjectId(req.payload._id)
                newRemainder.daily = Number(req.body.daily)
                try {
                    const CRemainder = await newRemainder.save()
                    const UpdateHabit = await Goal.updateOne({ _id: req.body.GId }, {
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
    },
    addMilestone: async (req, res) => {
        if (req.body.HId == '' || req.body.HId == undefined) {
            res.send({ success: false, message: 'Habit ID is required' })
        } else if (req.body.GId == '' || req.body.GId == undefined) {
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
    },
    LinkToHabit: async (req, res) => {
        if (req.body.title == null || req.body.title == undefined) {
            res.send({ success: false, message: 'Title Is Requaire' })
        }
        else if (req.body.desc == null || req.body.desc == undefined) {
            res.send({ success: false, message: 'Description Is Requaire' })
        }
        else if (req.body.GId == null || req.body.GId == undefined) {
            res.send({ success: false, message: 'Goal Id Is Requaire' })
        }
        else if (req.body.target == null || req.body.target == undefined) {
        } else {
            try {
                const FNDG = await Goal.findOne({ _id: req.body.GId })
                try {
                    const newMilestone = new Milestones()
                    newMilestone.title = req.body.title
                    newMilestone.desc = req.body.desc
                    newMilestone.target = req.body.target
                    const CMilestone = await newMilestone.save()

                    const UpdateGoal = await Goal.updateOne({ _id: req.body.GId }, {
                        $push: {
                            milestones: mongoose.Types.ObjectId(CMilestone._id)
                        }
                    })
                    res.send({ success: true, message: 'Milestone is Added' })
                } catch (err) {
                    console.log(err)
                    res.send({ success: false, message: 'Somthing Went Wrong' })
                }

            } catch (err) {
                console.log(err)
                res.send({ success: false, message: 'Wrong Goal Id!' })
            }

            res.send({ success: false, message: 'SomThing Went Wrong' })
        }
    }
}