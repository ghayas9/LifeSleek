const User = require('../Models/User');
const Goal = require('../Models/Goal')
const Cat = require('../Models/Catagory')



const addCatagory=async(req,res)=>{
    if(req.body.name==null|| req.body.name==''){
        res.send({ success: false, message: 'name is required' })
    }
    else if(req.file ==null|| req.file==''){
        res.send({ success: false, message: 'Image is required' })
    }else{
        ///ADD MIDDELWAIR FOR UPLOADIND IMAGE
        const newCat = new Cat()
        newCat.name = req.body.name
        newCat.iconImage = `/cat/${req.file.filename}`

        const result = await newCat.save()
        res.send({ success: true, message: 'cat is successfully added',fl:req.file })
    }

}

const DeleteCat =async (req,res)=>{
    if(req.params.id==null||req.params.id==''){
        res.send({success:false,message:'Id is required'})
    }else{
        const _id=req.params.id
        try{
            const cat =await Cat.find({_id})
            try{
                const del =await Cat.deleteOne({_id})
                res.send({success:true,message:"Cat is Deleted!"})
            }catch(err){
                res.send({success:false,message:'Cat Not Deleted'}) 
            }
        }catch(err){
            res.send({success:false,message:'Cat Not Found'})
        }
        
    }
}


const getAllCat =async(req,res)=>{
    try{
        const cat = await Cat.find()
        res.send({ success: true, cat })
    }catch(err){
        res.send({ success: false, message: "Can't find ",error:"Error code : cat-GA-cat-27" })
    }
    
}

module.exports = {
    getAllCat,
    addCatagory,
    DeleteCat
}