
const express = require('express')
const Govt=require('../models/govt')
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


router.post('/aadhar',auth, async(req, res, next) => {
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
        const govt=new Govt({
          aadhar_main_id:image.asset_id,
          aadhar_main_url:image.url,
          owner:req.user._id
        })
        await govt.save()
    res.status(201).json(govt)
        console.log(image)
      }
      
    )
  })
})
router.get('/aadhar',auth,async(req,res)=>{
  try{
    const govt=await Govt.find({owner:req.user._id})
    res.status(200).send(govt)
}catch(e){
    res.status(500).send(e)
}
})



router.post('/pan',auth, async(req, res, next) => {
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
          const govt=new Govt({
            pan_main_id:image.asset_id,
            pan_main_url:image.url,
            owner:req.user._id
          })
          await govt.save()
      res.status(201).json(govt)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/pan',auth,async(req,res)=>{
    try{
      const govt=await Govt.find({owner:req.user._id})
      res.status(200).send(govt)
  }catch(e){
      res.status(500).send(e)
  }
  })
  

  router.post('/driving_license',auth, async(req, res, next) => {
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
          const govt=new Govt({
            driving_license_main_id:image.asset_id,
            driving_license_main_url:image.url,
            owner:req.user._id
          })
          await govt.save()
      res.status(201).json(govt)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/driving_license',auth,async(req,res)=>{
    try{
      const govt=await Govt.find({owner:req.user._id})
      res.status(200).send(govt)
  }catch(e){
      res.status(500).send(e)
  }
  })

  
router.post('/domicile',auth, async(req, res, next) => {
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
          const govt=new Govt({
            domicile_main_id:image.asset_id,
            domicile_main_url:image.url,
            owner:req.user._id
          })
          await govt.save()
      res.status(201).json(govt)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/domicile',auth,async(req,res)=>{
    try{
      const govt=await Govt.find({owner:req.user._id})
      res.status(200).send(govt)
  }catch(e){
      res.status(500).send(e)
  }
  })

  
router.post('/caste',auth, async(req, res, next) => {
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
          const govt=new Govt({
            caste_main_id:image.asset_id,
            caste_main_url:image.url,
            owner:req.user._id
          })
          await govt.save()
      res.status(201).json(govt)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/caste',auth,async(req,res)=>{
    try{
      const govt=await Govt.find({owner:req.user._id})
      res.status(200).send(govt)
  }catch(e){
      res.status(500).send(e)
  }
  })

  
router.post('/birth',auth, async(req, res, next) => {
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
          const govt=new Govt({
            birth_main_id:image.asset_id,
            birth_main_url:image.url,
            owner:req.user._id
          })
          await govt.save()
      res.status(201).json(govt)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/birth',auth,async(req,res)=>{
    try{
      const govt=await Govt.find({owner:req.user._id})
      res.status(200).send(govt)
  }catch(e){
      res.status(500).send(e)
  }
  })

  
router.post('/income_certificate',auth, async(req, res, next) => {
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
          const govt=new Govt({
            income_certificate_main_id:image.asset_id,
            income_certificate_main_url:image.url,
            owner:req.user._id
          })
          await govt.save()
      res.status(201).json(govt)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/income_certificate',auth,async(req,res)=>{
    try{
      const govt=await Govt.find({owner:req.user._id})
      res.status(200).send(govt)
  }catch(e){
      res.status(500).send(e)
  }
  })

    
router.post('/disabled',auth, async(req, res, next) => {
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
          const govt=new Govt({
            disabled_main_id:image.asset_id,
            disabled_main_url:image.url,
            owner:req.user._id
          })
          await govt.save()
      res.status(201).json(govt)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/disabled',auth,async(req,res)=>{
    try{
      const govt=await Govt.find({owner:req.user._id})
      res.status(200).send(govt)
  }catch(e){
      res.status(500).send(e)
  }
  })

  
  router.post('/bike_registration',auth, async(req, res, next) => {
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
          const govt=new Govt({
            bike_registration_main_id:image.asset_id,
            bike_registration_main_url:image.url,
            owner:req.user._id
          })
          await govt.save()
      res.status(201).json(govt)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/bike_registration',auth,async(req,res)=>{
    try{
      const govt=await Govt.find({owner:req.user._id})
      res.status(200).send(govt)
  }catch(e){
      res.status(500).send(e)
  }
  })


  
  router.post('/car_registration',auth, async(req, res, next) => {
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
          const govt=new Govt({
            car_registration_main_id:image.asset_id,
            car_registration_main_url:image.url,
            owner:req.user._id
          })
          await govt.save()
      res.status(201).json(govt)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/car_registration',auth,async(req,res)=>{
    try{
      const govt=await Govt.find({owner:req.user._id})
      res.status(200).send(govt)
  }catch(e){
      res.status(500).send(e)
  }
  })

  
  router.post('/arm_license',auth, async(req, res, next) => {
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
          const govt=new Govt({
            arm_license_main_id:image.asset_id,
            arm_license_main_url:image.url,
            owner:req.user._id
          })
          await govt.save()
      res.status(201).json(govt)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/arm_license',auth,async(req,res)=>{
    try{
      const govt=await Govt.find({owner:req.user._id})
      res.status(200).send(govt)
  }catch(e){
      res.status(500).send(e)
  }
  })

  
  router.post('/marriage_certificate',auth, async(req, res, next) => {
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
          const govt=new Govt({
            marriage_certificate_main_id:image.asset_id,
            marriage_certificate_main_url:image.url,
            owner:req.user._id
          })
          await govt.save()
      res.status(201).json(govt)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/marriage_certificate',auth,async(req,res)=>{
    try{
      const govt=await Govt.find({owner:req.user._id})
      res.status(200).send(govt)
  }catch(e){
      res.status(500).send(e)
  }
  })

  
  router.post('/ration_card',auth, async(req, res, next) => {
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
          const govt=new Govt({
            ration_card_main_id:image.asset_id,
            ration_card_main_url:image.url,
            owner:req.user._id
          })
          await govt.save()
      res.status(201).json(govt)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/ration_card',auth,async(req,res)=>{
    try{
      const govt=await Govt.find({owner:req.user._id})
      res.status(200).send(govt)
  }catch(e){
      res.status(500).send(e)
  }
  })

  
  router.post('/voter_id',auth, async(req, res, next) => {
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
          const govt=new Govt({
            voter_id_main_id:image.asset_id,
            voter_id_main_url:image.url,
            owner:req.user._id
          })
          await govt.save()
      res.status(201).json(govt)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/voter_id',auth,async(req,res)=>{
    try{
      const govt=await Govt.find({owner:req.user._id})
      res.status(200).send(govt)
  }catch(e){
      res.status(500).send(e)
  }
  })
  
  router.post('/passport',auth, async(req, res, next) => {
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
          const govt=new Govt({
            passport_main_id:image.asset_id,
            passport_main_url:image.url,
            owner:req.user._id
          })
          await govt.save()
      res.status(201).json(govt)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/passport',auth,async(req,res)=>{
    try{
      const govt=await Govt.find({owner:req.user._id})
      res.status(200).send(govt)
  }catch(e){
      res.status(500).send(e)
  }
  })

  
module.exports=router