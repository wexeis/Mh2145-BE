import mongoose from "mongoose";
const orderSchema = mongoose.Schema({
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      productName:{
        type: String,
      
      },
      productImage: {
        type: String,
      },
     quantity: {
        type: Number,
        required: true,
        default: 1
      },
    
      finalPrice: {
        type: Number,
        required: true
      }
    }
  ],
  shippingAddress: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true

  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'],
    required: true,
    default: 'Pending',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: {
    type: String
  },

  lastName: {
    type: String
  }, 
  email: {
    type: String
  },
totalBill:{
  type: Number
}},
{timestamps:true});
;

const Order = mongoose.model('Order', orderSchema);

export default Order;