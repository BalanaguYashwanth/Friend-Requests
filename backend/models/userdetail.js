import mongoose from "mongoose";

const userdetailSchema = mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'User'},
    name:{type:String, required:true},
    age:{type:Number, required:true},
    gender:{type:String, required:true},
    bio:String,
    request_friends:[],
    friends:[],
    additional_timestamp:Date
},{
    timestamp:true
})
 
export const userdetail = mongoose.model('UserDetail',userdetailSchema)
