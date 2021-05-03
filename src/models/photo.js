const mongoose=require('mongoose')
const validator=require('validator')

const photoSchema=new mongoose.Schema({
    self_photo_main_id:{
		type:String
	},
	self_photo_main_url:{
		type:String
	},
	father_photo_main_id:{
		type:String
	},
	father_photo_main_url:{
		type:String
	},
	mother_photo_main_id:{
		type:String
	},
	mother_photo_main_url:{
		type:String
	},
	brother_photo_main_id:{
		type:String
	},
	brother_photo_main_url:{
		type:String
	},
    sister_photo_main_id:{
		type:String
	},
	sister_photo_main_url:{
		type:String
	},
	owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})

const Photo=mongoose.model('Photo',photoSchema)

module.exports=Photo