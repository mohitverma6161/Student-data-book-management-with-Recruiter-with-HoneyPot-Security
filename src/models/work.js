const mongoose=require('mongoose')
const validator=require('validator')

const workSchema=new mongoose.Schema({
    offer_letter_main_id:{
		type:String
	},
	offer_letter_main_url:{
		type:String
	},
	pay_slip_main_id:{
		type:String
	},
	pay_slip_main_url:{
		type:String
	},
	non_disclosure_main_id:{
		type:String
	},
	non_disclosure_main_url:{
		type:String
	},
	uan_card_main_id:{
		type:String
	},
	uan_card_main_url:{
		type:String
	},
    pension_main_id:{
		type:String
	},
	pension_main_url:{
		type:String
	},
    skill_certificate_main_id:{
		type:String
	},
	skill_certificate_main_url:{
		type:String
	},
    itr_main_id:{
        type:String
    },
    itr_main_url:{
        type:String
    },
    resume_main_id:{
        type:String
    },
    resume_main_url:{
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

const Work=mongoose.model('Work',workSchema)

module.exports=Work