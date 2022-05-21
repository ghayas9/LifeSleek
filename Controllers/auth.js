const { jwtKey } =require("../Config/JwtConfig");
const jwt = require('jsonwebtoken')
// const jwtConfiq = require('../Config/jwtConfig')
// const JwtKey = jwtConfiq.secret

const CreatToken=(data)=>{
    return new Promise((res,rej)=>{
        jwt.sign(data,jwtKey,(err,token)=>{
            if(err){
                rej(err)
            }else{
                res(token)
            }
        })
    })
}

const newCreatToken=(data,key)=>{
    return new Promise((res,rej)=>{
        jwt.sign(data,key,(err,token)=>{
            if(err){
                rej(err)
            }else{
                res(token)
            }
        })
    })
}

const verifyToken=(token)=>{
    return new Promise((res,rej)=>{
        jwt.verify(token,jwtKey,(err,data)=>{
                if(err){
                    rej(err)
                }else{
                    res(data)
                }
        })
    })
}
const newverifyToken=(token,key)=>{
    return new Promise((res,rej)=>{
        jwt.verify(token,key,(err,data)=>{
                if(err){
                    rej(err)
                }else{
                    res(data)
                }
        })
    })
}


const verify =async(req,res,next)=>{
    if(req.headers['authorization']){
        const token =req.headers['authorization'].split(' ')[1]
        if(token){
            try{
               req.payload=await verifyToken(token)
               req.token=await token
               next()
            }catch(err){
                console.log(err)
                res.send({sucess:false ,message:'Server Issue ',error:`Error :code auth-v-39 ${err}`})
            }
        }
    }else{
        res.send({sucess:false ,message:'Please Provide Berar Token '})
    }
    
}

const checkPasswordIsChange =(tokenPassword,userPassword,res)=>{
   if(tokenPassword===userPassword){
       return true
   }else{
    res.send({sucess:false ,message:'Password is Changed'})
   }
}

const pHash = (password)=>{
    return password
}

module.exports ={
    CreatToken,
    verify,
    verifyToken,
    checkPasswordIsChange,
    pHash,
    newCreatToken,
    newverifyToken
}