const Goal = require('../Models/Goal')
const myDate = require('../Models/DateAndTime')
const mongoose = require('mongoose')
const Habit = require('../Models/Habit');
const Remainder = require('../Models/Reminder');
const Milestones = require('../Models/Milestones');
const User = require('../Models/User');
const Catagory = require('../Models/Catagory');

module.exports = {
    addGoal: async (req, res) => {
        console.log(req.body);
        if (req.body.title == '' || req.body.title == '') {
            res.json({ success: false, message: 'title is required' })
        }
        else if (req.body.desc == '' || req.body.desc == '') {
            res.json({ success: false, message: 'desc is required' })
        }
        else if (req.body.target == '' || req.body.target == '') {
            res.json({ success: false, message: 'target is required' })
        }
        else if (req.body.catId == '' || req.body.catId == '') {
            res.json({ success: false, message: 'cat id is required' })
        }
        // else if (req.body.catId) {
        //     try{
        //         const result  = Catagory.findOne({_id:req.body.catId})
        //     // res.json({ success: false, message: 'cat id is Unavailible!' })
        //     }catch(err){
        //         console.log(err);
        //         // const result  = Catagory.findOne({_id:req.body.catId})
        //     res.json({ success: false, message: 'cat id is Unavailible!' })
        //     }
            
        // }
        else if (req.body.dateFrom == '' || req.body.dateFrom == '') {
            res.json({ success: false, message: 'Start Date is required' })
        }
        else if (req.body.dateTo == '' || req.body.dateTo == '') {
            res.json({ success: false, message: 'End Date is required' })
        }
        else {
            const newDate = myDate()
            newDate.title = req.body.title
            newDate.dateFrom = new Date(req.body.dateFrom)
            newDate.dateTo = new Date(req.body.dateTo)

            try{
                const result  = Catagory.findOne({_id:req.body.catId})
                if(result){
                    // console.log(result);
            try {
                const cdate = await newDate.save()
                try {
                    const newGoal = new Goal()
                    newGoal.catagory = mongoose.Types.ObjectId(req.body.catId)
                    newGoal.title = req.body.title
                    newGoal.desc = req.body.desc
                    newGoal.target = req.body.target
                    newGoal.date = mongoose.Types.ObjectId(cdate._id)
                    newGoal.user = mongoose.Types.ObjectId(req.payload._id)
                    console.log(newGoal);
                    const cGoal = await newGoal.save()
                    res.json({ success: true, message: 'Goal Successfully Added', GId: cGoal._id })
                } catch (err) {
                    console.log(err)
                    res.json({ success: false, message: 'Goal problem : Goal - 43' })
                }
            } catch (err) {
                res.json({ success: false, message: 'Date problem : Goal - 46' })
            }}
        }catch(err){
                
        }
        }
    },
    addRemainder: async (req, res) => {
        if (req.body.GId == '' || req.body.GId == undefined) {
            res.json({ success: false, message: 'Goal is required' })
        }
        else if (req.body.IsOn == '' || req.body.IsOn == undefined) {
            res.json({ success: false, message: 'On or Of is required' })
        }
        else if (req.body.daily == '' || req.body.daily == undefined) {
            res.json({ success: false, message: 'Daily Limits  is required' })
        } else {
            const newRemainder = new Remainder()

            try {
                const myGoal = await Goal.findOne({ _id: req.body.GId })
                newRemainder.title = myGoal.title
                newRemainder.date = mongoose.Types.ObjectId(myGoal.date)
                newRemainder.IsOn = Boolean(req.body.IsOn)
                newRemainder.UId = mongoose.Types.ObjectId(req.payload._id)
                newRemainder.daily = Number(req.body.daily)
                try {
                    const CRemainder = await newRemainder.save()
                    const UpdateHabit = await Goal.updateOne({ _id: req.body.GId }, {
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
    },
    LinkToHabit: async (req, res) => {
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
    addMilestone: async (req, res) => {
        if (req.body.title == '' || req.body.title == undefined) {
            res.json({ success: false, message: 'Title Is Requaire' })
        }
        else if (req.body.desc == '' || req.body.desc == undefined) {
            res.json({ success: false, message: 'Description Is Requaire' })
        }
        else if (req.body.GId == '' || req.body.GId == undefined) {
            res.json({ success: false, message: 'Goal Id Is Requaire' })
        }
        else if (req.body.target == '' || req.body.target == undefined) {
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
                    res.json({ success: true, message: 'Milestone is Added' })
                } catch (err) {
                    console.log(err)
                    res.json({ success: false, message: 'Somthing Went Wrong' })
                }

            } catch (err) {
                console.log(err)
                res.json({ success: false, message: 'Wrong Goal Id!' })
            }

            res.json({ success: false, message: 'SomThing Went Wrong' })
        }
    },addImage: async (req,res) =>{
        if(req.files=='',req.files==undefined){
            // console.log(req.files)
            return res.json({success:false,message:'Image Not found'})
        }
        res.json({success:false,message:'Image  Not found'})
        
    },getGoal:async(req,res)=>{
                const UId = req.payload._id
            try{
                const allGoals =await Goal.find({UId}).
                populate([
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
                },
                {
                    path:'milestones',
                    model:'milestones'
                },
                {
                    path:'LinkToHabit',
                    model:'habits',
                    populate:([
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
                            model:'goals'
                        }
                    ])
                }
            ])
               return res.json({success:true, goals:allGoals}) 
            }catch(err){
                // console.log(err);
               return  res.json({success:false, message:'error'})
            }
        },
        Delete:async(req,res)=>{
            if (req.params.id == undefined || req.params.id == '') {
                return res.json({ success: false, message: 'Id is required' })
            } else {
                const _id = req.params.id
                try {
                    const goal = await Goal.findOne({ _id })
                    if(goal.UId==req.payload_id){
                        try {
                            const del = await Goal.deleteOne({ _id })
                            return res.json({ success: true, message: "Gaol is Deleted Successfully" })
                        } catch (err) {
                            return res.json({ success: false, message: 'Goal Not Deleted' })
                        }
                    }else{
                        return res.json({ success: false, message: "you can't delete this!" })
                    }
                
                } catch (err) {
                    return res.json({ success: false, message: 'Goal Not Found' })
                }
            }
        }
}