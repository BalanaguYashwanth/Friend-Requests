import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    isAdmin:{
        type:String,
        required:true,
        default:false
    }
},{
    timestamp:true
}) 

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})


export const User = mongoose.model('User',userSchema)

