const mongoose=require('mongoose')
const validator=require('validator')

const projectSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    contributers:{
        type:String,
        required:true,
        trim:true
    },
    details:{
        type:String,
        required:true,
        trim:true
    },
    github:{
        type:String,
        trim:true
    },
    deploy:{
        type:String,
        trim:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})
const Project=mongoose.model('Project',projectSchema)

module.exports=Project
