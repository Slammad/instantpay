const express=require('express');
const router =express.Router();
const User=require('../models/usermodel');
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')


router.get('/',(req,res,next)=>{
    const users=User.find()
    .exec()
    .then(document=>{
        console.log(document);
        res.status(200).json(document)
    })
    .catch()
   
})

router.get("/:userid",(req,res,next)=>{
    const id=req.params.userid;
    const user = User.findById(id).exec().then(
        doc=>{
            console.log(doc),
            res.status(200).json({
                message:"User found",
                data:doc
            })

        }
        
        ).catch((err)=>console.log(err));

})

router.post('/signup',(req,res,next)=>{
    User.find({email:req.body.email}).exec().then(
        doc=>{
            if(doc.length >= 1){
                return res.status(422).json({
                    message:"User Exists"
                })
            }else{
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    if(err){
                        return res.status(500).json({
                            message:err
                        });
                    }else{
                        const user= new User({
                            _id:mongoose.Types.ObjectId(),
                             business:req.body.business,
                             email:req.body.email,
                             password:hash,
                             phones:req.body.phones
                            })  
                            
                            user.save().then(result=>{
                                console.log(result)
                                res.status(200).json({
                                    message:"get Request to users",
                                    createduser:user
                                })
                            }).catch(err=>console.log(err));
            
                        
                    }
                })
                
            }
        }
    ).catch()
   
   
   
})

router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email}).exec().then(user=>{
        if(user.length < 1){
            return res.status(401).json({
                message:"Auth Failed"
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:"Auth Failed",
                })
            }
            if(result){
                return res.status(200).json({
                    message:"Auth Successful"
                })
            }

            res.status(401).json({
                message:"Auth Failed"
            })

        })
    }).catch(err=>console.log(error))
}) 

router.delete('/:userid',(req,res,next)=>{
    const id =req.params.userid;
    User.remove({_id:id}).exec().then(
        docs=>console.log("Deleted Successfully")
    ).catch()
});
module.exports=router;