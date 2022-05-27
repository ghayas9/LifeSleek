const Medicine = require('../Models/Medicine')

module.exports = {
    addMedicine:async(req,res)=>{
        if(req.body.name==''||req.body.name==undefined){
            res.send({success:false,message:'Name id requaired'})
        }
        else if(req.body.totalDose==''||req.body.totalDose==undefined){
            res.send({success:false,message:'totalDose id requaired'})
        }
        else if(req.body.dailyDose==''||req.body.dailyDose==undefined){
            res.send({success:false,message:'dailyDose id requaired'})
        }else{
            try{
                const newMedicine = new Medicine()
                newMedicine.name = req.body.name
                newMedicine.totalDose = req.body.totalDose
                newMedicine.dailyDose = req.dailyDose
                const cm = await newMedicine.save()
                res.send({success:true,message:'Medicine added Successfully', MId:cm._id})
            }catch(err){
                res.send({success:false,message:'Something went wrong'})
            }
        }
    },
    addRemainder:async(req,res)=>{
        if(req.body.MId==''||req.body.MId==undefined){
            
        }
        if(req.body.MId==''||req.body.MId==undefined){

        }
    }
}