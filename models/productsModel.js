import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required:true,
  },

  dosage:{
    type: String,

  },

  productImage: {
    type: String,
    required:true,
  },

  productDescription: {
    type: String,
  },

  productQuantity: {
    type: Number,
    required:true
  },

  sale:{
    type: Number,
    required: true,
  },

  productPrice: {
    type: Number,
    required:true
  },

  finalPrice:{
    type: Number,
    required: true
  },


  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required:true
  },
  perscription: {
    type: Boolean,
    required: true
  }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
