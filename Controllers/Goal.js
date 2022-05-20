const Goal = require('../Models/Goal')
const myDate = require('../Models/DateAndTime')
const mongoose = require('mongoose')



const addGoal = async (req, res) => {
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
        newDate.dateFrom =new Date(req.body.dateFrom)
        newDate.dateTo =new Date(req.body.dateTo)
        try {
            const cdate = await newDate.save()
            try {
                const newGoal =new Goal()
                newGoal.catId = mongoose.Types.ObjectId(req.body.catId)
                newGoal.title = req.body.title
                newGoal.desc = req.body.desc
                newGoal.target = req.body.target
                newGoal.date = mongoose.Types.ObjectId(cdate._id)
                newGoal.user =mongoose.Types.ObjectId(req.payload._id)
                const cGoal = await newGoal.save()
                res.send({ success: true, message: 'Goal Successfully Added' })
            } catch (err) {
                console.log(err)
                res.send({ success: false, message: 'Goal problem : Goal - 43' })
            }
        } catch (err) {
            res.send({ success: false, message: 'Date problem : Goal - 46' })
        }
    }
}


module.exports = {
    addGoal
}