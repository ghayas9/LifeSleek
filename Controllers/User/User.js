const User = require('../../Models/User');
const { CreatToken } = require('../Auth/auth');



const LogIn= async(req,res)=>{
    if(req.body.email==''||req.body.email==undefined){
        res.send({success:false,message:'email is required'})
    }
    if(req.body.password==''||req.body.password==undefined){
        res.send({success:false,message:'password is required'})
    }
    try{
        const user = await User.findOne({'email':req.body.email});
        if(user.password===req.body.password){
            try{
                const token = await CreatToken(user)
                res.send({success:true,message:'User Successfully LogIned',token:token})
            }catch(err){
                res.send({success:false,message:'server issue',error:'Error Code : User-C-L-21'})
            }
        }else{
            res.send({success:false,message:'incorrect password'})
        }
    }catch(err){
        res.send({success:false,message:'User not Found'})
    }
}