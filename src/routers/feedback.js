const express=require('express')
const Feedback=require('../models/feedback')
const auth=require('../middleware/auth')
const Task = require('../models/task')
const router=new express.Router()

router.post('/feedback',auth,async(req,res)=>{
    //const info=new info(req.body)
    const feedback=new Feedback({
        ...req.body,
        owner:req.user._id})
    // console.log(info.owner)
    // const duplicate=await Info.findByCredentials(req.user._id)

    try{
        await feedback.save()
        res.status(201).json(feedback)
    }catch(e){
        res.status(400)
        res.send(e)
    }
    // info.save().then(()=>{
    //     res.status(201).send(info)
    // }).catch((e)=>{
    //     res.status(400)
    //     res.send(e)
    // })
    
})
router.get('/feedback',auth,async(req,res)=>{
    try{
        const feedback=await Feedback.find({owner:req.user._id})
        res.status(200).send(feedback)
    }catch(e){
        res.status(500).send(e)
    }
})
module.exports=router