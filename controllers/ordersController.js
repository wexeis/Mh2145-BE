import Cart from "../models/cartModel.js";
import Order from "../models/ordersModel.js";
import User from "../models/usersModel.js";





export const createAnOrder = async (req, res) => {
const id = req.body.cartId
console.log(id)
 try { 
  const cart = await Cart.find({ _id: id }).exec();
  console.log(cart)
  const userId = cart[0].userId
  console.log("hello" + userId)
  const user = await User.findById(userId).exec()

  if(user.length == 0){
    res.status(400).json(`${userId } user is not found `)
  }
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
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    status: "Pending"
  });
  console.log(order);


  // Validate order object before saving to database
  // if (!order.userId || !order.shippingAddress || !order.phoneNumber || !order.cartItems || !order.products || !order.totalPrice) {
  //   return res.status(400).json("Invalid order data");
  // }

  await order.save();

  await Cart.deleteOne({ userId: userId }).exec();

  res.status(200).json(order);


}catch(error){
  res.status(400).json(error)
}
};
export const getUserOrder = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const order = await Order.find({ userId: id });
    if (order.length === 0) {
      return res.status(400).json('Order not found');
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (orders.length === 0) {
      return res.status(400).json('Orders not found');
    }
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json(error);
  }
  }

  export const AdminOrderStatusUpdate = async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    console.log(id);
    console.log(status);
    try {
      const order = await Order.findOne({ _id: id });
      if (!order) {
        return res.status(400).json(`The order ${id} is not found`);
      }
      const orderUpdatedStatus = await Order.findByIdAndUpdate(id, { status: status }, {new: true});
      console.log(orderUpdatedStatus);
      return res.status(200).json(orderUpdatedStatus.status);
    } catch (error) {
      return res.status(400).json(error);
    }
  };