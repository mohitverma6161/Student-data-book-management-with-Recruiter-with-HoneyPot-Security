const express=require('express')
const Info=require('../models/info')
const auth=require('../middleware/auth')
const Task = require('../models/task')
const router=new express.Router()

router.post('/info',auth,async(req,res)=>{
    //const info=new info(req.body)
    const info=new Info({
        ...req.body,
        owner:req.user._id})
    // console.log(info.owner)
    // const duplicate=await Info.findByCredentials(req.user._id)

    try{
        await info.save()
        res.status(201).json(info)
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
router.get('/info',auth,async(req,res)=>{
    try{
        const info=await Info.find({owner:req.user._id})
        res.status(200).send(info)
    }catch(e){
        res.status(500).send(e)
    }
})
router.get('/info/all',async(req,res)=>{
    try{
        const info=await Info.find({})
        res.status(200).send(info)
    }catch(e){
        res.status(500).send(e)
    }
})
module.exports=router