const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task=require('./task')
const Info=require('./info')

const userSchema=new mongoose.Schema({
    roll_no:{
        type:String,
        require:true,
        trim:true
    },
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is inavlid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "passowrd"')
            }
        }
    },
    dob:{
        type:String,
        trim:true,
        required:true
        // default:0
        // validate(value){
        //     if(value<0){
        //         throw new Error('Age must be a positive number')
        //     }
        // }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})
userSchema.virtual('infos',{
    ref:'Info',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()

    delete userObject.password
    // delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.statics.generateAuthToken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},Number(process.env.JWT_SECRET))
    
    user.tokens=user.tokens.concat({token:token})
    await user.save()
    
    return token
}

userSchema.statics.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email})
    
    if(!user){
        return {
            error: 'User is not in the db'
        }
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        return {
            error: 'Password does not matches'
        }
    }
    console.log('fetched user details', user)
    return user
}

//Hash the plain text password before saving
userSchema.pre('save',async function(next){
    const user=this

    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }

    next()
})

//Delete user tasks when user is removed

userSchema.pre('remove',async function(next){
    const user=this
    await Task.deleteMany({owner:user._id})
    next()
})

const User=mongoose.model('User',userSchema)


module.exports.user = User