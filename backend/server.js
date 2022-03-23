import mongoose from "mongoose";
import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import router from './router/userrouter.js'
import userroutes from './router/userdetailrouter.js'

dotenv.config()

const connectDB = () => {
    try{
        mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
        mongoose.connection.on('open',()=>console.log('connected'))
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(cors())

app.use(express.json())

app.use('/',router)
app.use('/get',userroutes)

app.get('/',(req,res)=>{
    res.send('hello connected')
})

app.listen(9000,()=>{
    console.log('server connected')
})

