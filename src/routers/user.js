const express=require('express')
const multer=require('multer')
const sharp=require('sharp')
const User=require('../models/user').user
// const User1=require('../models/user')
const auth=require('../middleware/auth')
const jwt=require('jsonwebtoken')
const {sendWelcomeEmail,sendCancelationEmail}=require('../emails/account')
const router=new express.Router()
let {PythonShell} = require('python-shell')

router.post('/users',async(req,res)=>{
    const userNew=new User(req.body)

    try{
        await userNew.save()
        //sendWelcomeEmail(user.email,user.name)
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET);
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

router.post('/users/login',async(req,res)=>{
    try{
        console.log('user obj', User)
        const user=await User.findByCredentials(req.body.email,req.body.password)
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

router.get('/users/me',auth,async(req,res)=>{
    // try{
    //     const users=await User.find({})
    //     res.send(users)
    // }catch(e){
    //     res.status(500).send(e)
    // }
    res.send(req.user)
   
})

router.get('/users/security',(req,res)=>{
    // try{
    //     const users=await User.find({})
    //     res.send(users)
    // }catch(e){
    //     res.status(500).send(e)
    // }
    try{
        PythonShell.run('CaptureImage.py', null, function (err, results) {
            // script finished
            if (err) throw err;
            console.log('running image capture');
          });
        PythonShell.run('keylogger.py', null, function (err) {
            if (err) throw err;
            console.log('Running keylogger');
          });
          res.json('Started HoneyPot')
        }
        catch(e){
            res.json('Not able to start HoneyPot')
        }
    
   
})

router.get('/users/:id',async(req,res)=>{
    // try{
    //     const user=await User1.findById(_id)
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }catch(e){
    //     res.status(500).send(e)
    // }

    const _id=req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(404).send()
    })
})

router.post('/users/logout',auth,async(req,res)=>{
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

router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/users/me',auth,async(req,res)=>{
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
        //const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
       
        res.send(req.user)

    }catch(e)
    {
        res.status(400).send()
    }
})

router.delete('/users/me',auth,async(req,res)=>{
    try{
        // const user=await User.findByIdAndDelete(req.user._id)
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

router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    console.log(req.file)
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
})

router.get('/users/me/avatar',auth,async(req,res)=>{
    // try{
    //     const user=await User.findById(req.params.id)
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