const User = require('../../Models/User');
const { CreatToken, pHash } = require('../Auth/auth');



const LogIn= async(req,res)=>{
    if(req.body.email==''||req.body.email==undefined){
        res.send({success:false,message:'email is required'})
    }
    if(req.body.password==''||req.body.password==undefined){
        res.send({success:false,message:'password is required'})
    }

    res.send({t:true})
    // try{
    //     const user = await User.findOne({'email':req.body.email});
    //     //Password Is In Hash form in database
    //     if(user.password===pHash(req.body.password)){
    //         try{
    //             const token = await CreatToken(user)
    //             res.send({success:true,message:'User Successfully LogIned',token:token})
    //         }catch(err){
    //             res.send({success:false,message:'server issue',error:'Error Code : User-C-L-21'})
    //         }
    //     }else{
    //         res.send({success:false,message:'incorrect password'})
    //     }
    // }catch(err){
    //     res.send({success:false,message:'User not Found'})
    // }
}


const Register = async(req,res)=>{
    if(req.body.name==''||req.body.name==undefined ){
        res.send({success:false,message:'name is required'})
    }
    if(req.body.email==''||req.body.email==undefined){
        res.send({success:false,message:'email or number is required'})
    }
    if(req.body.password==''||req.body.password==undefined){
        res.send({success:false,message:'password is required'})
    }
    

    const newUser = new User()

    newUser.name = req.body.name
    newUser.email = req.body.email
    newUser.password = pHash(req.body.password)
    try{
        const user=await newUser.save();
        res.send({success:true,message:'Registered successfully',email:user.email})
        // res.send({success:true,message:newBuyer})
    }catch(err){
        res.send({success:false,message:'Server Issue',error:'Error Code: U-C-R-56',})
    }
}


const EmailVerfication =(req,res)=>{
    if(req.body.email==''||req.body.email==undefined){
        res.send({success:false,message:'email or number is required'})
    }
   try{
    const token =await CreatToken({
        email:req.body.email,
        code:Math.floor((Math.random() * 4000) + 9999)
    })
    if('email'=='email'){
        //send Email
        res.send({success:true,message:'please check your Email',token})
    }
    if('number'=='number'){
        //send Message
        res.send({success:true,message:'please check your Inbox',token})
    }
    }catch(err){
        res.send({success:false,message:'Server Issue',error:'Error Code: U-C-EV-69'})
    }
                
}

module.exports ={
    LogIn,
    Register,
    EmailVerfication
}