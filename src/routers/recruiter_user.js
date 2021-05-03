const express=require('express')
const multer=require('multer')
const sharp=require('sharp')
const RecruiterUser=require('../models/recruiter_user').user
const User=require('../models/user').user
const auth=require('../middleware/auth1')
const jwt=require('jsonwebtoken')
const {sendWelcomeEmail,sendCancelationEmail}=require('../emails/account')
const router=new express.Router()

router.post('/recruiteruser',async(req,res)=>{
    const userNew=new RecruiterUser(req.body)

    try{
        await userNew.save()
        console.log(userNew)
        //sendWelcomeEmail(user.email,user.name)
        const user=await RecruiterUser.findByCredentials(req.body.email,req.body.password)
        console.log('bhadwa')
        console.log(user)
        const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET);
        console.log(token)
        user.tokens=user.tokens.concat({token:token})
            await user.save()
        res.status(201).send({user,token})
    }
    catch(e){
        res.status(400)
        res.send(e)
    }
    
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((e)=>{
    //     res.status(400)
    //     res.send(e)
    // })
    
})

router.post('/recruiteruser/login',async(req,res)=>{
    try{
        console.log('user obj', RecruiterUser)
        const user=await RecruiterUser.findByCredentials(req.body.email,req.body.password)
        console.log('here at login')
        const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET);
        console.log('user ', user)
        console.log('token', token)

        if(user.error){
            res.status(200).json({
                error: user.error
            })
        } else {
            user.tokens=user.tokens.concat({token:token})
            await user.save()
            res.status(200).json({user,token})
        }
        
    }catch(e){
        res.status(200).json({
            error: e
        })
    }
})

router.get('/recruiteruser/me',auth,async(req,res)=>{
    // try{
    //     const recruiteruser=await RecruiterUser.find({})
    //     res.send(recruiteruser)
    // }catch(e){
    //     res.status(500).send(e)
    // }
    res.send(req.user)
   
})
router.get('/view_users',auth,async(req,res)=>{
    try{
        const user=await User.find({})
        
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }

})
// router.get('/recruiteruser/:id',async(req,res)=>{
//     try{
//         const user=await RecruiterUser.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send()
//     }

//     // const _id=req.params.id
//     // RecruiterUser.findById(_id).then((user)=>{
//     //     if(!user){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch((e)=>{
//     //     res.status(404).send()
//     // })
// })

router.post('/recruiteruser/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post('/recruiteruser/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/recruiteruser/me',auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','password','age']
    const isValidOperation=updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }
    
    try{
        
        updates.forEach((update)=>{
            req.user[update]=req.body[update]
        })
        await req.user.save()
        //const user=await RecruiterUser.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
       
        res.send(req.user)

    }catch(e)
    {
        res.status(400).send()
    }
})

router.delete('/recruiteruser/me',auth,async(req,res)=>{
    try{
        // const user=await RecruiterUser.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove()
        sendCancelationEmail(req.user.email,req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

const upload=multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        // if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
        // {
        //     return cb(new Error('Please upload an image'))
        // }
        cb(undefined,true)
    }
})

router.post('/recruiteruser/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    console.log(req.file)
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/recruiteruser/me/avatar',auth,async(req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
})

router.get('/recruiteruser/me/avatar',auth,async(req,res)=>{
    // try{
    //     const user=await RecruiterUser.findById(req.params.id)
    //     if(!user || !user.avatar){
    //         throw new Error()
    //     }
    try{
        res.set('Content-Type','image/jpg')
        // res.set('Content-Type','application/pdf')
        res.send(req.user.avatar)
        console.log(req.user.avatar)
    }catch(e){
        res.status(404).send()
    }
})

module.exports=router
//.resize({width:250,height:250}).png().