import Product from "../models/productsModel.js";
import path from "path"
import multer from "multer";
import { uploadToCloudinary } from "../middleware/multerMIddleware.js";


export const findAllProducts = async(req, res) =>{
    try {
        const allProducts = await Product.find({})
        if(allProducts.length == 0){
            return res.status(404).json('There is no products')
        }
        return res.status(200).json(allProducts)
        
    } catch (error) {
        return res.status(500).json({ message: "Failed to find products." });

    }

}


export const findAProduct = async(req, res) =>{
    try {
        const id =req.body.params
        const Product = await Product.find({_id : id})
        if(!Product){
            return res.status(404).json(`The product: ${id} is not found`)
        }
        return res.status(200).json(Product)
        
    } catch (error) {
        return res.status(500).json({ message: "Failed to find the product." });

    }

}

export const createProduct = async(req, res) =>{
    try {
        const {productName, 
            dosage, 
             
            productDescription, 
            productQuantity, 
            sale, 
            productPrice, 
            categoryId,
            perscription } = req.body;
            const finalPrice =productPrice - (productPrice*sale)
const productImage = req.file.path;
            if (!productName 
                || !productImage 
                || !productDescription 
                || !productQuantity
                || !sale
                || !productPrice
                || !finalPrice
                || !categoryId
                || !perscription){

                    return res.status(400).json("you need to fill all the properties")
                }
            const product = await new Product({
            productName, 
            dosage, 
            productImage, 
            productDescription, 
            productQuantity, sale, 
            productPrice, 
            finalPrice,
            categoryId,
            perscription})
            const file = req.file;
            const uploadResult = await uploadToCloudinary(file);
            product.save()
            return res.status(201).json(product)
    }catch (error) {
        return res.status(500).json({ message: "Failed to create the product." });

    }

}

    export const updateAProduct = async(req, res) => {
        const id = req.params.id

        try {
            const product =  await Product.findOne({_id: id})

            if(product.length == 0){
                return res.status(404).json('not found')
            }
            const productName = req.body.productName || product.productName
            const dosage= req.body.dosage || product.dosage
            const productImage = req.file ? req.file.path : product.productImage; // Check if req.file exists
            const productDescription= req.body.productDescription || product.productDescription
            const productQuantity= req.body.productQuantity || product.productQuantity
            const sale= req.body.sale || product.sale
            const productPrice= req.body.productPrice || product.productPrice
            const finalPrice= productPrice - (productPrice*sale)|| product.finalPrice
            const categoryId= req.body .categoryId|| product.categoryId
            const perscription= req.body.perscription || product.perscription
            // console.log("prodc" + productImage)
            console.log("product.productImage " + product.productImage)
            // console.log(product)


            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                {
                  productName,
                  dosage,
                  productDescription,
                  productQuantity,
                  sale,
                  productPrice,
                  finalPrice,
                  categoryId,
                  perscription,
                },
                { new: true }
              );
              
              const file = req.file;
              
              if (file) {
                // A file was uploaded, update the productImage
                const productImage = file.path;
                updatedProduct.productImage = productImage;
                
                // Upload the file to Cloudinary
                const uploadResult = await uploadToCloudinary(file);
              }
              
              return res.status(200).json(updatedProduct);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: `Failed to upadte the product: ${id}` });

        }
    }


export const deleteAProduct = async(req, res) =>{
    try {
        const id = req.params.id
        await Product.findByIdAndDelete(id)
        return res.status(204).json('produtct deleted')
        
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete product." });
      }
  }
