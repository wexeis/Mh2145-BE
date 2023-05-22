import Cart from "../models/cartModel.js";
import Order from "../models/ordersModel.js";




export const createAnOrder = async (req, res) => {
 try { const userId = req.body.userId;
  const cart = await Cart.find({ userId: userId }).exec();
// console.log(cart[0].products)
  if (!cart) {
    return res.status(400).json("Cart not found");
  }

  let totalBill = 0;
  for (let i = 0; i < cart[0].products.length; i++) {
    totalBill += cart[0].products[i].finalPrice;
  }

  const order = new Order({
    userId,
    shippingAddress: req.body.shippingAddress,
    phoneNumber: req.body.phoneNumber,
    cartItems: cart[0]._id,
    products: cart[0].products,
    totalBill,
  });
  console.log(order);


  // Validate order object before saving to database
  // if (!order.userId || !order.shippingAddress || !order.phoneNumber || !order.cartItems || !order.products || !order.totalPrice) {
  //   return res.status(400).json("Invalid order data");
  // }

  await order.save();

  // Cart.deleteOne({ userId: userId }).exec();

  res.status(200).json(order);


}catch(error){
  res.status(400).json(error)
}
}
