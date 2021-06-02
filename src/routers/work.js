
const express = require('express')
const Work=require('../models/work')
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


router.post('/offer_letter',auth, async(req, res, next) => {
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
        const work=new Work({
          offer_letter_main_id:image.asset_id,
          offer_letter_main_url:image.url,
          owner:req.user._id
        })
        await work.save()
    res.status(201).json(work)
        console.log(image)
      }
      
    )
  })
})
router.get('/offer_letter',auth,async(req,res)=>{
  try{
    const work=await Work.find({owner:req.user._id})
    res.status(200).send(work)
}catch(e){
    res.status(500).send(e)
}
})

router.delete('/offer_letter',auth,async(req,res)=>{
  
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
    
    await Work.findOneAndUpdate({$and:[{owner:req.user._id},{offer_letter_main_id:{ "$ne": undefined }}]},{offer_letter_main_url:k})
    await Work.findOneAndRemove({$and:[{offer_letter_main_url:k},{offer_letter_main_id:{ "$ne": undefined }}]})
    res.send('done')
  }catch(e){
    res.status(500).send(e)
  }
  })

router.post('/pay_slip',auth, async(req, res, next) => {
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
          const work=new Work({
            pay_slip_main_id:image.asset_id,
            pay_slip_main_url:image.url,
            owner:req.user._id
          })
          await work.save()
      res.status(201).json(work)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/pay_slip',auth,async(req,res)=>{
    try{
      const work=await Work.find({owner:req.user._id})
      res.status(200).send(work)
  }catch(e){
      res.status(500).send(e)
  }
  })

  router.delete('/pay_slip',auth,async(req,res)=>{
  
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
      
      await Work.findOneAndUpdate({$and:[{owner:req.user._id},{pay_slip_main_id:{ "$ne": undefined }}]},{pay_slip_main_url:k})
      await Work.findOneAndRemove({$and:[{pay_slip_main_url:k},{pay_slip_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })

  router.post('/non_disclosure',auth, async(req, res, next) => {
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
          const work=new Work({
            non_disclosure_main_id:image.asset_id,
            non_disclosure_main_url:image.url,
            owner:req.user._id
          })
          await work.save()
      res.status(201).json(work)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/non_disclosure',auth,async(req,res)=>{
    try{
      const work=await Work.find({owner:req.user._id})
      res.status(200).send(work)
  }catch(e){
      res.status(500).send(e)
  }
  })


  router.delete('/non_disclosure',auth,async(req,res)=>{
  
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
      
      await Work.findOneAndUpdate({$and:[{owner:req.user._id},{non_disclosure_main_id:{ "$ne": undefined }}]},{non_disclosure_main_url:k})
      await Work.findOneAndRemove({$and:[{non_disclosure_main_url:k},{non_disclosure_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })

  router.post('/uan_card',auth, async(req, res, next) => {
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
          const work=new Work({
            uan_card_main_id:image.asset_id,
            uan_card_main_url:image.url,
            owner:req.user._id
          })
          await work.save()
      res.status(201).json(work)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/uan_card',auth,async(req,res)=>{
    try{
      const work=await Work.find({owner:req.user._id})
      res.status(200).send(work)
  }catch(e){
      res.status(500).send(e)
  }
  })

  router.delete('/uan_card',auth,async(req,res)=>{
  
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
      
      await Work.findOneAndUpdate({$and:[{owner:req.user._id},{uan_card_main_id:{ "$ne": undefined }}]},{uan_card_main_url:k})
      await Work.findOneAndRemove({$and:[{uan_card_main_url:k},{uan_card_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })

  
  router.post('/pension',auth, async(req, res, next) => {
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
          const work=new Work({
            pension_main_id:image.asset_id,
            pension_main_url:image.url,
            owner:req.user._id
          })
          await work.save()
      res.status(201).json(work)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/pension',auth,async(req,res)=>{
    try{
      const work=await Work.find({owner:req.user._id})
      res.status(200).send(work)
  }catch(e){
      res.status(500).send(e)
  }
  })

  router.delete('/pension',auth,async(req,res)=>{
  
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
      
      await Work.findOneAndUpdate({$and:[{owner:req.user._id},{pension_main_id:{ "$ne": undefined }}]},{pension_main_url:k})
      await Work.findOneAndRemove({$and:[{pension_main_url:k},{pension_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })
  
  router.post('/skill_certificate',auth, async(req, res, next) => {
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
          const work=new Work({
            skill_certificate_main_id:image.asset_id,
            skill_certificate_main_url:image.url,
            owner:req.user._id
          })
          await work.save()
      res.status(201).json(work)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/skill_certificate',auth,async(req,res)=>{
    try{
      const work=await Work.find({owner:req.user._id})
      res.status(200).send(work)
  }catch(e){
      res.status(500).send(e)
  }
  })


  router.delete('/skill_certificate',auth,async(req,res)=>{
  
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
      
      await Work.findOneAndUpdate({$and:[{owner:req.user._id},{skill_certificate_main_id:{ "$ne": undefined }}]},{skill_certificate_main_url:k})
      await Work.findOneAndRemove({$and:[{skill_certificate_main_url:k},{skill_certificate_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })

  router.post('/itr',auth, async(req, res, next) => {
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
          const work=new Work({
            itr_main_id:image.asset_id,
            itr_main_url:image.url,
            owner:req.user._id
          })
          await work.save()
      res.status(201).json(work)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/itr',auth,async(req,res)=>{
    try{
      const work=await Work.find({owner:req.user._id})
      res.status(200).send(work)
  }catch(e){
      res.status(500).send(e)
  }
  })


  router.delete('/itr',auth,async(req,res)=>{
  
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
      
      await Work.findOneAndUpdate({$and:[{owner:req.user._id},{itr_main_id:{ "$ne": undefined }}]},{itr_main_url:k})
      await Work.findOneAndRemove({$and:[{itr_main_url:k},{itr_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })

  router.post('/resume',auth, async(req, res, next) => {
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
          const work=new Work({
            resume_main_id:image.asset_id,
            resume_main_url:image.url,
            owner:req.user._id
          })
          await work.save()
      res.status(201).json(work)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/resume',auth,async(req,res)=>{
    try{
      const work=await Work.find({owner:req.user._id})
      res.status(200).send(work)
  }catch(e){
      res.status(500).send(e)
  }
  })


  router.delete('/resume',auth,async(req,res)=>{
  
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
      
      await Work.findOneAndUpdate({$and:[{owner:req.user._id},{resume_main_id:{ "$ne": undefined }}]},{resume_main_url:k})
      await Work.findOneAndRemove({$and:[{resume_main_url:k},{resume_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })

module.exports=router