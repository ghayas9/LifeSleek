const Habit = require('../Models/Habit');
const myDate = require('../Models/DateAndTime')
const mongoose = require('mongoose')
const Remainder = require('../Models/Reminder')
const Goal = require('../Models/Goal')

module.exports ={
    getAllHabits:async(req,res)=>{
        try{
            const habits = await Habit.find({UId:req.payload._id})
            res.send({success:true,message:'',habits})
        }catch(err){
            res.send({success:false,message:'Something went wrong'})
        }
    },
    addHabit:async(req, res) => {
        if (req.body.title == '' || req.body.title == undefined) {
            res.send({ success: false, message: 'title is required' })
        }
        else if (req.body.desc == '' || req.body.desc == undefined) {
            res.send({ success: false, message: 'desc is required' })
        }
        else if (req.body.dateFrom == '' || req.body.dateFrom == undefined) {
            res.send({ success: false, message: 'Start Date is required' })
        }
        else if (req.body.dateTo == '' || req.body.dateTo == undefined) {
            res.send({ success: false, message: 'End Date is required' })
        }
        else if (req.body.rep == '' || req.body.rep == undefined) {
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
                    res.send({ success: false, message: 'Habit problem : G - 43' })
                }
            } catch (err) {
                res.send({ success: false, message: 'Date problem : G - 46' })
            }
        }
    },
    addRemainder: async (req, res) => {
        if (req.body.HId == '' || req.body.HId == undefined) {
            res.send({ success: false, message: 'Habit is required' })
        }
        else if (req.body.IsOn == '' || req.body.IsOn == undefined) {
            res.send({ success: false, message: 'On or Of is required' })
        }
        else if (req.body.daily == '' || req.body.daily == undefined) {
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
    ,
    LinkToGoal:async(req, res) => {
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
    addImage: async (req,res) =>{
        if(req.body.HId==''||req.body.UId==undefined){
            res.send({ success: false, message: 'HId is requaired' })
        }
        else{ 
            // const host = 'localhost:9000'
            const img = ()=>{
                return req.body.files.map((e=>{
                    return `${e.filename}`
                }))
            }
            try{
                // const VHId = await Habit.findOne({ _id: req.body.HId })
                // const UpdateHabit = await Habit.updateOne({ _id: req.body.HId }, {
                //     $push: {
                //         images: `${req.body.files}` 
                //     }
                // })
                res.send({ success: true, message: 'Image added su.....ly',Image:img})
            }catch(err){
                res.send({ success: false, message: 'Wrong HId',error:err })
            }



        }
    }
}
