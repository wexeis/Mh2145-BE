
import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  products: [
    {
      productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      productName:{
        type: String
      },
      dosage:{
        type: String
      },
      quantity:{
        type: Number,
        required: true,
        default: 1
      },
      productImage: {
        type: String,
      },
    
      sale:{
        type: Number,
      },
    
      productPrice: {
        type: Number,
      },
    
      finalPrice:{
        type: Number,
        required: true
      },
    }
  ],

totalBill:{
    type: Number,
    required: true
}}, 
{timestamps:true});



const Cart = mongoose.model('Cart', cartSchema);

export default Cart;