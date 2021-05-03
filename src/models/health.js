const mongoose=require('mongoose')
const validator=require('validator')

const healthSchema=new mongoose.Schema({
    clinical_main_id:{
		type:String
	},
	clinical_main_url:{
		type:String
	},
	covid_main_id:{
		type:String
	},
	covid_main_url:{
		type:String
	},
	health_id_card_main_id:{
		type:String
	},
	health_id_card_main_url:{
		type:String
	},
	pharmacist_main_id:{
		type:String
	},
	pharmacist_main_url:{
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

const Health=mongoose.model('Health',healthSchema)

module.exports=Health