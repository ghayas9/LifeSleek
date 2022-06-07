const Habit = require('../Models/Habit');
const myDate = require('../Models/DateAndTime')
const mongoose = require('mongoose')
const Remainder = require('../Models/Reminder')
const Goal = require('../Models/Goal')

module.exports ={
    getAllHabits:async(req,res)=>{
        try{
            const UId=req.payload._id
            const habits = await Habit.find({UId}).
            populate([
                {
                    path:'date',
                    model:'dates',
                    select:['dateFrom','dateTo']
                },
                {
                    path:'reminder',
                    model:'reminders'
                },{
                    path:'LinkToGoal',
                    model:'goals',
                    populate:([
                        {
                            path:'date',
                            model:'dates',
                            select:['dateFrom','dateTo']
                        },
                        {
                            path:'reminder',
                            model:'reminders'
                        },
                        {
                            path:'catagory',
                            model:'catagories',
                            select:'name'
                        }
                    ])
                }
            ])
            res.json({success:true,habits})
        }catch(err){
            res.json({success:false,message:'Something went wrong'})
        }
    },
    addHabit:async(req, res) => {
        if (req.body.title == '' || req.body.title == undefined) {
            res.json({ success: false, message: 'title is required' })
        }
        else if (req.body.desc == '' || req.body.desc == undefined) {
            res.json({ success: false, message: 'desc is required' })
        }
        else if (req.body.dateFrom == '' || req.body.dateFrom == undefined) {
            res.json({ success: false, message: 'Start Date is required' })
        }
        else if (req.body.dateTo == '' || req.body.dateTo == undefined) {
            res.json({ success: false, message: 'End Date is required' })
        }
        else if (req.body.rep == '' || req.body.rep == undefined) {
            res.json({ success: false, message: 'repeation is required' })
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
                    res.json({ success: true, message: 'Habit Successfully Added', HId: cHabit._id })
                } catch (err) {
                    console.log(err)
                    res.json({ success: false, message: 'Habit problem : G - 43' })
                }
            } catch (err) {
                res.json({ success: false, message: 'Date problem : G - 46' })
            }
        }
    },
    addRemainder: async (req, res) => {
        if (req.body.HId == '' || req.body.HId == undefined) {
            res.json({ success: false, message: 'Habit is required' })
        }
        else if (req.body.IsOn == '' || req.body.IsOn == undefined) {
            res.json({ success: false, message: 'On or Of is required' })
        }
        else if (req.body.daily == '' || req.body.daily == undefined) {
            res.json({ success: false, message: 'Daily Limits  is required' })
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
                    res.json({ success: true, message: 'Remainder Added Successfully' })
                } catch (err) {
                    res.json({ success: false, message: 'SomeThing Went Wrong!' })
                }
            } catch (err) {
                res.json({ success: false, message: 'Wrong Habit ID' })
            }
    
        }
    }
    ,
    LinkToGoal:async(req, res) => {
        if (req.body.HId == '' || req.body.HId == undefined) {
            res.json({ success: false, message: 'Habit ID is required' })
        } else if (req.body.GId == '' || req.body.GId == undefined) {
            res.json({ success: false, message: 'Goal ID is required' })
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
                    res.json({ success: true, message: 'Successfully Linked EachOthers' })
                } catch (err) {
                    res.json({ success: false, message: 'SomeThing Went Wrong!!' })
                }
            } catch (err) {
                res.json({ success: false, message: 'Wrong Habit or Goal ID!!' })
            }
        }
    },
    addImage: async (req,res) =>{
        if(req.body.HId==''||req.body.UId==undefined){
            res.json({ success: false, message: 'HId is requaired' })
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
                res.json({ success: true, message: 'Image added su.....ly',Image:img})
            }catch(err){
                res.json({ success: false, message: 'Wrong HId',error:err })
            }
        }
    },
    Delete:async(req,res)=>{
        if (req.params.id == undefined || req.params.id == '') {
            return res.json({ success: false, message: 'Id is required' })
        } else {
            const _id = req.params.id
            try {
                const habit = await Habit.findOne({ _id })
                if(habit.UId==req.payload_id){
                    try {
                        const del = await Habit.deleteOne({ _id })
                        return res.json({ success: true, message: "Habit is Deleted Successfully" })
                    } catch (err) {
                        return res.json({ success: false, message: 'Habit Not Deleted' })
                    }
                }else{
                    return res.json({ success: false, message: "you can't delete this!" })
                }
            
            } catch (err) {
                return res.json({ success: false, message: 'Habit Not Found' })
            }
        }
    }
}
