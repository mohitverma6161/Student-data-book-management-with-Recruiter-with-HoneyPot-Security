const mongoose=require('mongoose')
const validator=require('validator')

const feedbackSchema=new mongoose.Schema({
    recruiter:{
        type:String,
        required:true,
        trim:true
    },
    rating:{
        type:String,
        required:true,
        trim:true
    },
    review:{
        type:String,
        required:true,
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
const Feedback=mongoose.model('Feedback',feedbackSchema)

module.exports=Feedback
