const express=require('express')
const Project=require('../models/project')
const auth=require('../middleware/auth')
const Task = require('../models/task')
const router=new express.Router()

router.post('/project',auth,async(req,res)=>{
    //const info=new info(req.body)
    const project=new Project({
        ...req.body,
        owner:req.user._id})
    // console.log(info.owner)
    // const duplicate=await Info.findByCredentials(req.user._id)

    try{
        await project.save()
        res.status(201).json(project)
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
router.get('/project',auth,async(req,res)=>{
    try{
        const project=await Project.find({owner:req.user._id})
        res.status(200).send(project)
    }catch(e){
        res.status(500).send(e)
    }
})
module.exports=router