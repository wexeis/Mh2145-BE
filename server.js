import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cloudinaryV2 from 'cloudinary';
import path from "path"
import multer from "multer";
import fs from "fs"

import db from "./config/dbconnection.js";
import userRoutes from "./routes/usersRoutes.js"
import productRoutes from "./routes/productsRoutes.js"
import categoryRoutes from "./routes/categoriesRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/ordersRoutes.js"




const app = express(); 
const __dirname = path.dirname(import.meta.url);

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));


const cloudinary = cloudinaryV2;

cloudinary.config({
    cloud_name: "dbaowiufy",
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    secure: true

})
export const uploads = (file,folder) =>{
    return new Promise(resolve =>{
        cloudinary.uploader.upload(file,(result)=>{
            resolve(
                {
                    url: result.url,
                    id: result.public_id
                },{
                     resource_type:"auto",

                     folder:folder
                }
            )
        })
    })
}
dotenv.config()
dotenv.config()

const port = process.env.PORT || 8000;



app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: '*'
}));
 db()
 app.listen(port, ()=>{
    console.log("we are listening on port: " + port)})

app.get('/', (req, res) => {
    res.send('hello world');
  });

app.use("/user", userRoutes)
app.use("/product", productRoutes)
app.use("/category", categoryRoutes)
app.use("/cart", cartRoutes)
app.use("/order", orderRoutes)