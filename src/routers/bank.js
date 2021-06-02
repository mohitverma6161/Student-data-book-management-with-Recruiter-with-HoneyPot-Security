
const express = require('express')
const Bank=require('../models/bank')
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


router.post('/passbook',auth, async(req, res, next) => {
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
        const bank=new Bank({
          passbook_main_id:image.asset_id,
          passbook_main_url:image.url,
          owner:req.user._id
        })
        await bank.save()
    res.status(201).json(bank)
        console.log(image)
      }
      
    )
  })
})
router.get('/passbook',auth,async(req,res)=>{
  try{
    const bank=await Bank.find({owner:req.user._id})
    res.status(200).send(bank)
}catch(e){
    res.status(500).send(e)
}
})


router.delete('/passbook',auth,async(req,res)=>{
  
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
    
    await Bank.findOneAndUpdate({$and:[{owner:req.user._id},{passbook_main_id:{ "$ne": undefined }}]},{passbook_main_url:k})
    await Bank.findOneAndRemove({$and:[{passbook_main_url:k},{passbook_main_id:{ "$ne": undefined }}]})
    res.send('done')
  }catch(e){
    res.status(500).send(e)
  }
  })


router.post('/bank_statement',auth, async(req, res, next) => {
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
          const bank=new Bank({
            bank_statement_main_id:image.asset_id,
            bank_statement_main_url:image.url,
            owner:req.user._id
          })
          await bank.save()
      res.status(201).json(bank)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/bank_statement',auth,async(req,res)=>{
    try{
      const bank=await Bank.find({owner:req.user._id})
      res.status(200).send(bank)
  }catch(e){
      res.status(500).send(e)
  }
  })


  router.delete('/bank_statement',auth,async(req,res)=>{
  
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
      
      await Bank.findOneAndUpdate({$and:[{owner:req.user._id},{bank_statement_main_id:{ "$ne": undefined }}]},{bank_statement_main_url:k})
      await Bank.findOneAndRemove({$and:[{bank_statement_main_url:k},{bank_statement_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })

  router.post('/loan',auth, async(req, res, next) => {
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
          const bank=new Bank({
            loan_main_id:image.asset_id,
            loan_main_url:image.url,
            owner:req.user._id
          })
          await bank.save()
      res.status(201).json(bank)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/loan',auth,async(req,res)=>{
    try{
      const bank=await Bank.find({owner:req.user._id})
      res.status(200).send(bank)
  }catch(e){
      res.status(500).send(e)
  }
  })

  router.delete('/loan',auth,async(req,res)=>{
  
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
      
      await Bank.findOneAndUpdate({$and:[{owner:req.user._id},{loan_main_id:{ "$ne": undefined }}]},{loan_main_url:k})
      await Bank.findOneAndRemove({$and:[{loan_main_url:k},{loan_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })
  

  router.post('/demand_draft',auth, async(req, res, next) => {
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
          const bank=new Bank({
            demand_draft_main_id:image.asset_id,
            demand_draft_main_url:image.url,
            owner:req.user._id
          })
          await bank.save()
      res.status(201).json(bank)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/demand_draft',auth,async(req,res)=>{
    try{
      const bank=await Bank.find({owner:req.user._id})
      res.status(200).send(bank)
  }catch(e){
      res.status(500).send(e)
  }
  })

  router.delete('/demand_draft',auth,async(req,res)=>{
  
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
      
      await Bank.findOneAndUpdate({$and:[{owner:req.user._id},{demand_draft_main_id:{ "$ne": undefined }}]},{demand_draft_main_url:k})
      await Bank.findOneAndRemove({$and:[{demand_draft_main_url:k},{demand_draft_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })


  router.post('/debit_card',auth, async(req, res, next) => {
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
          const bank=new Bank({
            debit_card_main_id:image.asset_id,
            debit_card_main_url:image.url,
            owner:req.user._id
          })
          await bank.save()
      res.status(201).json(bank)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/debit_card',auth,async(req,res)=>{
    try{
      const bank=await Bank.find({owner:req.user._id})
      res.status(200).send(bank)
  }catch(e){
      res.status(500).send(e)
  }
  })


  router.delete('/debit_card',auth,async(req,res)=>{
  
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
      
      await Bank.findOneAndUpdate({$and:[{owner:req.user._id},{debit_card_main_id:{ "$ne": undefined }}]},{debit_card_main_url:k})
      await Bank.findOneAndRemove({$and:[{debit_card_main_url:k},{debit_card_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })

  //INSURANCE




  router.post('/insurance_health',auth, async(req, res, next) => {
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
          const bank=new Bank({
            insurance_health_main_id:image.asset_id,
            insurance_health_main_url:image.url,
            owner:req.user._id
          })
          await bank.save()
      res.status(201).json(bank)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/insurance_health',auth,async(req,res)=>{
    try{
      const bank=await Bank.find({owner:req.user._id})
      res.status(200).send(bank)
  }catch(e){
      res.status(500).send(e)
  }
  })

  router.delete('/insurance_health',auth,async(req,res)=>{
  
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
      
      await Bank.findOneAndUpdate({$and:[{owner:req.user._id},{insurance_health_main_id:{ "$ne": undefined }}]},{insurance_health_main_url:k})
      await Bank.findOneAndRemove({$and:[{insurance_health_main_url:k},{insurance_health_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })


  
  router.post('/insurance_cyber',auth, async(req, res, next) => {
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
          const bank=new Bank({
            insurance_cyber_main_id:image.asset_id,
            insurance_cyber_main_url:image.url,
            owner:req.user._id
          })
          await bank.save()
      res.status(201).json(bank)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/insurance_cyber',auth,async(req,res)=>{
    try{
      const bank=await Bank.find({owner:req.user._id})
      res.status(200).send(bank)
  }catch(e){
      res.status(500).send(e)
  }
  })


  router.delete('/insurance_cyber',auth,async(req,res)=>{
  
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
      
      await Bank.findOneAndUpdate({$and:[{owner:req.user._id},{insurance_cyber_main_id:{ "$ne": undefined }}]},{insurance_cyber_main_url:k})
      await Bank.findOneAndRemove({$and:[{insurance_cyber_main_url:k},{insurance_cyber_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })

  
  router.post('/insurance_home',auth, async(req, res, next) => {
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
          const bank=new Bank({
            insurance_home_main_id:image.asset_id,
            insurance_home_main_url:image.url,
            owner:req.user._id
          })
          await bank.save()
      res.status(201).json(bank)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/insurance_home',auth,async(req,res)=>{
    try{
      const bank=await Bank.find({owner:req.user._id})
      res.status(200).send(bank)
  }catch(e){
      res.status(500).send(e)
  }
  })

  router.delete('/insurance_home',auth,async(req,res)=>{
  
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
      
      await Bank.findOneAndUpdate({$and:[{owner:req.user._id},{insurance_home_main_id:{ "$ne": undefined }}]},{insurance_home_main_url:k})
      await Bank.findOneAndRemove({$and:[{insurance_home_main_url:k},{insurance_home_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })

  
  router.post('/insurance_travel',auth, async(req, res, next) => {
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
          const bank=new Bank({
            insurance_travel_main_id:image.asset_id,
            insurance_travel_main_url:image.url,
            owner:req.user._id
          })
          await bank.save()
      res.status(201).json(bank)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/insurance_travel',auth,async(req,res)=>{
    try{
      const bank=await Bank.find({owner:req.user._id})
      res.status(200).send(bank)
  }catch(e){
      res.status(500).send(e)
  }
  })

  router.delete('/insurance_travel',auth,async(req,res)=>{
  
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
      
      await Bank.findOneAndUpdate({$and:[{owner:req.user._id},{insurance_travel_main_id:{ "$ne": undefined }}]},{insurance_travel_main_url:k})
      await Bank.findOneAndRemove({$and:[{insurance_travel_main_url:k},{insurance_travel_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })


  
  router.post('/insurance_car',auth, async(req, res, next) => {
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
          const bank=new Bank({
            insurance_car_main_id:image.asset_id,
            insurance_car_main_url:image.url,
            owner:req.user._id
          })
          await bank.save()
      res.status(201).json(bank)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/insurance_car',auth,async(req,res)=>{
    try{
      const bank=await Bank.find({owner:req.user._id})
      res.status(200).send(bank)
  }catch(e){
      res.status(500).send(e)
  }
  })


  router.delete('/insurance_car',auth,async(req,res)=>{
  
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
      
      await Bank.findOneAndUpdate({$and:[{owner:req.user._id},{insurance_car_main_id:{ "$ne": undefined }}]},{insurance_car_main_url:k})
      await Bank.findOneAndRemove({$and:[{insurance_car_main_url:k},{insurance_car_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })

  
  router.post('/insurance_bike',auth, async(req, res, next) => {
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
          const bank=new Bank({
            insurance_bike_main_id:image.asset_id,
            insurance_bike_main_url:image.url,
            owner:req.user._id
          })
          await bank.save()
      res.status(201).json(bank)
          console.log(image)
        }
        
      )
    })
  })
  router.get('/insurance_bike',auth,async(req,res)=>{
    try{
      const bank=await Bank.find({owner:req.user._id})
      res.status(200).send(bank)
  }catch(e){
      res.status(500).send(e)
  }
  })


  router.delete('/insurance_bike',auth,async(req,res)=>{
  
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
      
      await Bank.findOneAndUpdate({$and:[{owner:req.user._id},{insurance_bike_main_id:{ "$ne": undefined }}]},{insurance_bike_main_url:k})
      await Bank.findOneAndRemove({$and:[{insurance_bike_main_url:k},{insurance_bike_main_id:{ "$ne": undefined }}]})
      res.send('done')
    }catch(e){
      res.status(500).send(e)
    }
    })
module.exports=router