
const express = require('express')
const Photo=require('../models/photo')
const router=new express.Router()
const auth=require('../middleware/auth')
// MULTER
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})


router.post('/self_photo',auth, async(req, res, next) => {
  const upload = multer({ storage }).single('image')
 const id=undefined
 const url=undefined
  upload(req, res, function(err) {
    if (err) {
      return res.send(err)
    }
    console.log('file uploaded to server')
    console.log(req.file)

    // SEND FILE TO CLOUDINARY
    const cloudinary = require('cloudinary').v2
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET
    })
    
    const path = req.file.path
    const uniqueFilename = new Date().toISOString()
    cloudinary.uploader.upload(
      path,
      { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
      
      async function(err, image) {
        if (err) return res.send('file format is wrong! Only image file supported')
        console.log('file uploaded to Cloudinary')
        // remove file from server
        const fs = require('fs')
         fs.unlinkSync(path)
        // return image details
        // res.json('Uploaded Successfully')
        const photo=new Photo({
          self_photo_main_id:image.asset_id,
          self_photo_main_url:image.url,
          owner:req.user._id
        })
        await photo.save()
    res.status(201).json(photo)
        console.log(image)
      }
      
    )
  })
})
router.get('/self_photo',auth,async(req,res)=>{
  try{
    const photo=await Photo.find({owner:req.user._id})
    res.status(200).send(photo)
}catch(e){
    res.status(500).send(e)
}
})



router.post('/father_photo',auth, async(req, res, next) => {
    const upload = multer({ storage }).single('image')
   const id=undefined
   const url=undefined
    upload(req, res, function(err) {
      if (err) {
        return res.send(err)
      }
      console.log('file uploaded to server')
      console.log(req.file)
  
      // SEND FILE TO CLOUDINARY
      const cloudinary = require('cloudinary').v2
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
      })
      
      const path = req.file.path
      const uniqueFilename = new Date().toISOString()
      cloudinary.uploader.upload(
        path,
        { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
        
        async function(err, image) {
          if (err) return res.send('file format is wrong! Only image file supported')
          console.log('file uploaded to Cloudinary')
          // remove file from server
          const fs = require('fs')
           fs.unlinkSync(path)
          // return image details
          // res.json('Uploaded Successfully')
          const photo=new Photo({
            father_photo_main_id:image.asset_id,
            father_photo_main_url:image.url,
            owner:req.user._id
          })
          await photo.save()
      res.status(201).json(photo)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/father_photo',auth,async(req,res)=>{
    try{
      const photo=await Photo.find({owner:req.user._id})
      res.status(200).send(photo)
  }catch(e){
      res.status(500).send(e)
  }
  })
  
  
router.post('/mother_photo',auth, async(req, res, next) => {
    const upload = multer({ storage }).single('image')
   const id=undefined
   const url=undefined
    upload(req, res, function(err) {
      if (err) {
        return res.send(err)
      }
      console.log('file uploaded to server')
      console.log(req.file)
  
      // SEND FILE TO CLOUDINARY
      const cloudinary = require('cloudinary').v2
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
      })
      
      const path = req.file.path
      const uniqueFilename = new Date().toISOString()
      cloudinary.uploader.upload(
        path,
        { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
        
        async function(err, image) {
          if (err) return res.send('file format is wrong! Only image file supported')
          console.log('file uploaded to Cloudinary')
          // remove file from server
          const fs = require('fs')
           fs.unlinkSync(path)
          // return image details
          // res.json('Uploaded Successfully')
          const photo=new Photo({
            mother_photo_main_id:image.asset_id,
            mother_photo_main_url:image.url,
            owner:req.user._id
          })
          await photo.save()
      res.status(201).json(photo)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/mother_photo',auth,async(req,res)=>{
    try{
      const photo=await Photo.find({owner:req.user._id})
      res.status(200).send(photo)
  }catch(e){
      res.status(500).send(e)
  }
  })
  
  
router.post('/brother_photo',auth, async(req, res, next) => {
    const upload = multer({ storage }).single('image')
   const id=undefined
   const url=undefined
    upload(req, res, function(err) {
      if (err) {
        return res.send(err)
      }
      console.log('file uploaded to server')
      console.log(req.file)
  
      // SEND FILE TO CLOUDINARY
      const cloudinary = require('cloudinary').v2
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
      })
      
      const path = req.file.path
      const uniqueFilename = new Date().toISOString()
      cloudinary.uploader.upload(
        path,
        { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
        
        async function(err, image) {
          if (err) return res.send('file format is wrong! Only image file supported')
          console.log('file uploaded to Cloudinary')
          // remove file from server
          const fs = require('fs')
           fs.unlinkSync(path)
          // return image details
          // res.json('Uploaded Successfully')
          const photo=new Photo({
            brother_photo_main_id:image.asset_id,
            brother_photo_main_url:image.url,
            owner:req.user._id
          })
          await photo.save()
      res.status(201).json(photo)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/brother_photo',auth,async(req,res)=>{
    try{
      const photo=await Photo.find({owner:req.user._id})
      res.status(200).send(photo)
  }catch(e){
      res.status(500).send(e)
  }
  })
  
  
  
router.post('/sister_photo',auth, async(req, res, next) => {
    const upload = multer({ storage }).single('image')
   const id=undefined
   const url=undefined
    upload(req, res, function(err) {
      if (err) {
        return res.send(err)
      }
      console.log('file uploaded to server')
      console.log(req.file)
  
      // SEND FILE TO CLOUDINARY
      const cloudinary = require('cloudinary').v2
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
      })
      
      const path = req.file.path
      const uniqueFilename = new Date().toISOString()
      cloudinary.uploader.upload(
        path,
        { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
        
        async function(err, image) {
          if (err) return res.send('file format is wrong! Only image file supported')
          console.log('file uploaded to Cloudinary')
          // remove file from server
          const fs = require('fs')
           fs.unlinkSync(path)
          // return image details
          // res.json('Uploaded Successfully')
          const photo=new Photo({
            sister_photo_main_id:image.asset_id,
            sister_photo_main_url:image.url,
            owner:req.user._id
          })
          await photo.save()
      res.status(201).json(photo)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/sister_photo',auth,async(req,res)=>{
    try{
      const photo=await Photo.find({owner:req.user._id})
      res.status(200).send(photo)
  }catch(e){
      res.status(500).send(e)
  }
  })
  
  
  
  
  


  

module.exports=router