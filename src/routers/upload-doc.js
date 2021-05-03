
const express = require('express')
const Document=require('../models/upload-doc')
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


router.post('/x_migration',auth, async(req, res, next) => {
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
        const document=new Document({
          x_migration_main_id:image.asset_id,
          x_migration_main_url:image.secure_url,
          owner:req.user._id
        })
        await document.save()
    res.status(201).json(document)
        console.log(image)
      }
      
    )
  })
})
router.get('/x_migration',auth,async(req,res)=>{
  try{
    const document=await Document.find({owner:req.user._id})
    res.status(200).send(document)
}catch(e){
    res.status(500).send(e)
}
})


router.post('/x_passing',auth, async(req, res, next) => {
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
        const document=new Document({
          x_passing_main_id:image.asset_id,
          x_passing_main_url:image.url,
          owner:req.user._id
        })
        await document.save()
    res.status(201).json(document)
        console.log(image)
      }
      
    )
  })
})
router.get('/x_passing',auth,async(req,res)=>{
  try{
    const document=await Document.find({owner:req.user._id})
    res.status(200).send(document)
}catch(e){
    res.status(500).send(e)
}
})



router.post('/x_marksheet',auth, async(req, res, next) => {
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
        const document=new Document({
          x_marksheet_main_id:image.asset_id,
          x_marksheet_main_url:image.url,
          owner:req.user._id
        })
        await document.save()
    res.status(201).json(document)
        console.log(image)
      }
      
    )
  })
})
router.get('/x_marksheet',auth,async(req,res)=>{
  try{
    const document=await Document.find({owner:req.user._id})
    res.status(200).send(document)
}catch(e){
    res.status(500).send(e)
}
})


router.post('/x_skill',auth, async(req, res, next) => {
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
        const document=new Document({
          x_skill_main_id:image.asset_id,
          x_skill_main_url:image.url,
          owner:req.user._id
        })
        await document.save()
    res.status(201).json(document)
        console.log(image)
      }
      
    )
  })
})
router.get('/x_skill',auth,async(req,res)=>{
  try{
    const document=await Document.find({owner:req.user._id})
    res.status(200).send(document)
}catch(e){
    res.status(500).send(e)
}
})





//CLASS XII STARTS








router.post('/xii_migration',auth, async(req, res, next) => {
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
        const document=new Document({
          xii_migration_main_id:image.asset_id,
          xii_migration_main_url:image.url,
          owner:req.user._id
        })
        await document.save()
    res.status(201).json(document)
        console.log(image)
      }
      
    )
  })
})
router.get('/xii_migration',auth,async(req,res)=>{
  try{
    const document=await Document.find({owner:req.user._id})
    res.status(200).send(document)
}catch(e){
    res.status(500).send(e)
}
})


router.post('/xii_passing',auth, async(req, res, next) => {
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
        const document=new Document({
          xii_passing_main_id:image.asset_id,
          xii_passing_main_url:image.url,
          owner:req.user._id
        })
        await document.save()
    res.status(201).json(document)
        console.log(image)
      }
      
    )
  })
})
router.get('/xii_passing',auth,async(req,res)=>{
  try{
    const document=await Document.find({owner:req.user._id})
    res.status(200).send(document)
}catch(e){
    res.status(500).send(e)
}
})



router.post('/xii_marksheet',auth, async(req, res, next) => {
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
        const document=new Document({
          xii_marksheet_main_id:image.asset_id,
          xii_marksheet_main_url:image.url,
          owner:req.user._id
        })
        await document.save()
    res.status(201).json(document)
        console.log(image)
      }
      
    )
  })
})
router.get('/xii_marksheet',auth,async(req,res)=>{
  try{
    const document=await Document.find({owner:req.user._id})
    res.status(200).send(document)
}catch(e){
    res.status(500).send(e)
}
})


router.post('/xii_skill',auth, async(req, res, next) => {
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
        const document=new Document({
          xii_skill_main_id:image.asset_id,
          xii_skill_main_url:image.url,
          owner:req.user._id
        })
        await document.save()
    res.status(201).json(document)
        console.log(image)
      }
      
    )
  })
})
router.get('/xii_skill',auth,async(req,res)=>{
  try{
    const document=await Document.find({owner:req.user._id})
    res.status(200).send(document)
}catch(e){
    res.status(500).send(e)
}
})



//TEACHER


router.post('/teacher_marksheet',auth, async(req, res, next) => {
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
        const document=new Document({
          teacher_marksheet_main_id:image.asset_id,
          teacher_marksheet_main_url:image.url,
          owner:req.user._id
        })
        await document.save()
    res.status(201).json(document)
        console.log(image)
      }
      
    )
  })
})
router.get('/teacher_marksheet',auth,async(req,res)=>{
  try{
    const document=await Document.find({owner:req.user._id})
    res.status(200).send(document)
}catch(e){
    res.status(500).send(e)
}
})



router.post('/teacher_certificate',auth, async(req, res, next) => {
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
        const document=new Document({
          teacher_certificate_main_id:image.asset_id,
          teacher_certificate_main_url:image.url,
          owner:req.user._id
        })
        await document.save()
    res.status(201).json(document)
        console.log(image)
      }
      
    )
  })
})
router.get('/teacher_certificate',auth,async(req,res)=>{
  try{
    const document=await Document.find({owner:req.user._id})
    res.status(200).send(document)
}catch(e){
    res.status(500).send(e)
}
})


// UG DETAILS



router.post('/ug',auth, async(req, res, next) => {
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
        const document=new Document({
          ug_main_id:image.asset_id,
          ug_main_url:image.url,
          owner:req.user._id
        })
        await document.save()
    res.status(201).json(document)
        console.log(image)
      }
      
    )
  })
})
router.get('/ug',auth,async(req,res)=>{
  try{
    const document=await Document.find({owner:req.user._id})
    res.status(200).send(document)
}catch(e){
    res.status(500).send(e)
}
})


//PG DETAILS


router.post('/pg',auth, async(req, res, next) => {
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
        const document=new Document({
          pg_main_id:image.asset_id,
          pg_main_url:image.url,
          owner:req.user._id
        })
        await document.save()
    res.status(201).json(document)
        console.log(image)
      }
      
    )
  })
})
router.get('/pg',auth,async(req,res)=>{
  try{
    const document=await Document.find({owner:req.user._id})
    res.status(200).send(document)
}catch(e){
    res.status(500).send(e)
}
})


module.exports=router