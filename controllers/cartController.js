import Cart from "../models/cartModel.js";
import Product from "../models/productsModel.js";

export const AllCarts = async(req, res) =>{
    try{
      const carts = await Cart.find({}).exec();
      if(!carts){
        return res.status(404).json({message: "no carts"})
      }
      else{
        return res.status(200).json(carts)
      }
      
    }catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
  }}


  export const Acart = async(req, res) =>{
    console.log(req.params.id)
    const id = req.params.id
  try{
      const cart = await Cart.find({user_id: id}).exec();
      if(!cart){
        return res.status(404).json({message:"no items in the cart"})
      
      }else{
        return res.status(200).json(cart)
      }
    }catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
  }
  }
  
    

export const addToCart = async (req, res) => {
  console.log(req.body);
  try {
    const { productId, productName, dosage, quantity, productImage, sale, productPrice, finalPrice } = req.body;
    const userId = req.body.userId;

    const cartProducts = Array.isArray(req.body.products) ? req.body.products : [{ productId, productName, dosage, quantity, productImage, sale, productPrice, finalPrice }];

    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      cart = new Cart({
        userId: userId,
        products: [],
        totalBill: 0,
      });
    }

    let totalBill = cart.totalBill;

    for (const cartProduct of cartProducts) {
      const { productId, productName, dosage, quantity, productImage, finalPrice } = cartProduct;

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      const existingProduct = cart.products.find((item) => item.productId.toString() === productId);
      if (!existingProduct) {
        cart.products.push({ productId, productName, dosage, quantity, productImage, sale, productPrice, finalPrice });
      } else {
        existingProduct.quantity += quantity;
      }

      totalBill += finalPrice * quantity;
    }

    cart.totalBill = totalBill;
    await cart.save();

    res.status(201).json({ success: true, cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const deleteAllCarts = async (req, res) => {
    try {
      await Cart.deleteMany({});
      res.status(200).json({ success: true, message: "All carts deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
  
  export const deleteACart = async (req, res) =>{
    const id = req.params.id
    try { 
      const cart = await Cart.find({userId: id})
      if(cart.length === 0){
        return res.status(404).json({ success: false, message: "User doesn't have a cart" })
      }
      await Cart.deleteOne({userId:id})
      return res.status(201).json({ success: true, message: `Cart ${id} is deleted` })
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
  