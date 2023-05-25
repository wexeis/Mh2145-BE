import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
const app = express()
dotenv.config()

const key = process.env.mongoKey;

const port = process.env.PORT


const db = async () => {
  try {
    await mongoose.connect(key, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB'); // Display a success message upon successful connection

    // app.listen(port, () => {
    //   console.log('We are listening on port:', port);
    // });
  } catch (error) {
    console.log('Mongo connection error:', error);
    process.exit(1);
  }
};

export default db