
const express = require('express')
const Health=require('../models/health')
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


router.post('/clinical',auth, async(req, res, next) => {
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
        const health=new Health({
          clinical_main_id:image.asset_id,
          clinical_main_url:image.url,
          owner:req.user._id
        })
        await health.save()
    res.status(201).json(health)
        console.log(image)
      }
      
    )
  })
})
router.get('/clinical',auth,async(req,res)=>{
  try{
    const health=await Health.find({owner:req.user._id})
    res.status(200).send(health)
}catch(e){
    res.status(500).send(e)
}
})

router.delete('/clinical',auth,async(req,res)=>{
  
  // try{
  // Device.updateMany({"owner":req.user._id},{"$set":{"x_migration_main_url":null}});
  // res.send('done')
  // }catch(e){
  //     console.log('4')
  //       res.status(500).send(e)
  //   }
  try{
    const k=Math.random()
    console.log(k)
    
    await Health.findOneAndUpdate({$and:[{owner:req.user._id},{clinical_main_id:{ "$ne": undefined }}]},{clinical_main_url:k})
    await Health.findOneAndRemove({$and:[{clinical_main_url:k},{clinical_main_id:{ "$ne": undefined }}]})
    res.send('done')
  }catch(e){
    res.status(500).send(e)
  }
  })



router.post('/covid',auth, async(req, res, next) => {
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
          const health=new Health({
            covid_main_id:image.asset_id,
            covid_main_url:image.url,
            owner:req.user._id
          })
          await health.save()
      res.status(201).json(health)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/covid',auth,async(req,res)=>{
    try{
      const health=await Health.find({owner:req.user._id})
      res.status(200).send(health)
  }catch(e){
      res.status(500).send(e)
  }
  })


  router.delete('/covid',auth,async(req,res)=>{
  
    // try{
    // Device.updateMany({"owner":req.user._id},{"$set":{"x_migration_main_url":null}});
    // res.send('done')
    // }catch(e){
    //     console.log('4')
    //       res.status(500).send(e)
    //   }
    try{
      const k=Math.random()
      console.log(k)
      
      await Health.findOneAndUpdate({$and:[{owner:req.user._id},{covid_main_id:{ "$ne": undefined }}]},{covid_main_url:k})
      await Health.findOneAndRemove({$and:[{covid_main_url:k},{covid_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })

  router.post('/health_id_card',auth, async(req, res, next) => {
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
          const health=new Health({
            health_id_card_main_id:image.asset_id,
            health_id_card_main_url:image.url,
            owner:req.user._id
          })
          await health.save()
      res.status(201).json(health)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/health_id_card',auth,async(req,res)=>{
    try{
      const health=await Health.find({owner:req.user._id})
      res.status(200).send(health)
  }catch(e){
      res.status(500).send(e)
  }
  })


  router.delete('/health_id_card',auth,async(req,res)=>{
  
    // try{
    // Device.updateMany({"owner":req.user._id},{"$set":{"x_migration_main_url":null}});
    // res.send('done')
    // }catch(e){
    //     console.log('4')
    //       res.status(500).send(e)
    //   }
    try{
      const k=Math.random()
      console.log(k)
      
      await Health.findOneAndUpdate({$and:[{owner:req.user._id},{health_id_card_main_id:{ "$ne": undefined }}]},{health_id_card_main_url:k})
      await Health.findOneAndRemove({$and:[{health_id_card_main_url:k},{health_id_card_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })

  router.post('/pharmacist',auth, async(req, res, next) => {
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
          const health=new Health({
            pharmacist_main_id:image.asset_id,
            pharmacist_main_url:image.url,
            owner:req.user._id
          })
          await health.save()
      res.status(201).json(health)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/pharmacist',auth,async(req,res)=>{
    try{
      const health=await Health.find({owner:req.user._id})
      res.status(200).send(health)
  }catch(e){
      res.status(500).send(e)
  }
  })


  router.delete('/pharmacist',auth,async(req,res)=>{
  
    // try{
    // Device.updateMany({"owner":req.user._id},{"$set":{"x_migration_main_url":null}});
    // res.send('done')
    // }catch(e){
    //     console.log('4')
    //       res.status(500).send(e)
    //   }
    try{
      const k=Math.random()
      console.log(k)
      
      await Health.findOneAndUpdate({$and:[{owner:req.user._id},{pharmacist_main_id:{ "$ne": undefined }}]},{pharmacist_main_url:k})
      await Health.findOneAndRemove({$and:[{pharmacist_main_url:k},{pharmacist_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })

  

module.exports=router