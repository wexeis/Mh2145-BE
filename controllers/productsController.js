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
export const findAProductByCategory = async(req, res) =>{
   const categoryId = req.params.id
    try { const product = await Product.find({categoryId: categoryId}) 
    if(product.length == 0){
        res.status(404).json('Not found')
    }
    res.status(200).json(product)
        
        
    } catch (error) {
        return res.status(500).json({ message: "Failed to find products." });

        
    }
}

export const createProduct = async (req, res) => {
    console.log(req.body);
    console.log(req.file)
    try {
      const {
        productName,
        dosage,
        productDescription,
        productQuantity,
        sale,
        productPrice,
        categoryId,
        perscription,
      } = req.body;
  
      const finalPrice = productPrice - productPrice * sale;
      console.log(finalPrice)

      if (
        !productName ||
        !req.file ||
        !productDescription ||
        !productQuantity ||
        !sale ||
        !productPrice ||
        !categoryId ||
        !perscription
      ) {
        return res.status(400).json("You need to fill all the properties");
      }
  
      const file = req.file;
      const uploadResult = await uploadToCloudinary(file);
      const product = await new Product({
        productName,
        dosage,
        productImage: uploadResult.secure_url, 
        productDescription,
        productQuantity,
        sale,
        productPrice,
        finalPrice: finalPrice,
        categoryId,
        perscription,
      });

      await product.save(); // Wait for the product to be saved to the database
  
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ message: "Failed to create the product." });
    }
  };

    export const updateAProduct = async(req, res) => {
        const id = req.params.id

        try {
            const product =  await Product.findOne({_id: id})

            if(product.length == 0){
                return res.status(404).json('not found')
            }
            const productName = req.body.productName || product.productName
            const dosage= req.body.dosage || product.dosage
            const productDescription= req.body.productDescription || product.productDescription
            const productQuantity= req.body.productQuantity || product.productQuantity
            const sale= req.body.sale || product.sale
            const productPrice= req.body.productPrice || product.productPrice
            const finalPrice= productPrice - (productPrice*sale)|| product.finalPrice
            const categoryId= req.body .categoryId|| product.categoryId
            const perscription= req.body.perscription || product.perscription

            const file = req.file;
            let productImage = product.productImage; 
            
            if (file) {
              const uploadResult = await uploadToCloudinary(file);
              productImage = uploadResult.secure_url;
            }
            
            console.log("product iamge  " +  productImage)

            
            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                {
                  productName,
                productImage: productImage,
                  dosage,
                  productDescription,
                  productQuantity,
                  sale,
                  productPrice,
                  finalPrice: finalPrice,
                  categoryId,
                  perscription,
                },
                { new: true }
              );
              
            
              
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
