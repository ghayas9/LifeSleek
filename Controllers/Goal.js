const Goal = require('../Models/Goal')
const myDate = require('../Models/DateAndTime')



const addGoal = async (req, res) => {
    if(req.body.title==null||req.body.title==''){
        res.send({ success: false, message: 'title is required' })
    }
    else if(req.body.disc==null||req.body.disc==''){
        res.send({ success: false, message: 'disc is required' })
    }
    else if(req.body.target==null||req.body.target==''){
        res.send({ success: false, message: 'target is required' })
    }
    else if(req.body.catId==null||req.body.catId==''){
        res.send({ success: false, message: 'cat id is required' })
    }
    else if(req.body.dateFrom==null||req.body.dateFrom==''){
        res.send({ success: false, message: 'Start Date is required' })
    }
    else if(req.body.dateTo==null||req.body.dateTo==''){
        res.send({ success: false, message: 'End Date is required' })
    }
    else{
        const newDate = myDate()
        newDate.title = req.body.title
        newDate.dateFrom = req.body.dateFrom
        newDate.dateTo = req.body.dateTo
         try{
            const cdate = await newDate.save()
            const newGoal = Goal()
            newGoal.title = req.body.title
            newGoal.desc = req.body.desc
            newGoal.target = req.body.target
            newGoal.date = cdate._id
            newGoal.user = cdate.payload._id

            try{
                const cGoal = await newGoal()
                res.send({ success: true, message: 'Goal Successfully Added' })
            }catch(err){
                res.send({ success: false, message: 'Date problem : Goal - 33' })
            }
         }catch(err){
            res.send({ success: false, message: 'Date problem : Goal - 33' })
         }
    }
}