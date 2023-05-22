import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
const app = express()
dotenv.config()

const key = process.env.mongoKey;



const db = async ()=>{
    try {await mongoose.connect(key,   {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
} catch(error){console.log("mongo connection error " + error)
process.exit(1)}};

export default db