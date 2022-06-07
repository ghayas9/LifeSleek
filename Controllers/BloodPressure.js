const BP = require('../Models/BloodPressure')


module.exports = {
    addRecored:async(req,res)=>{
        if(req.body.dateTime==''||req.body.dateTime==undefined){
            res.json({success:true,message:'dateTime is requaired'})
        }
        if(req.body.dateTime==''||req.body.dateTime==undefined){
            res.json({success:true,message:'dateTime is requaired'})
        }
    }
}