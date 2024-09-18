import orderSchema from "../schema/orderSchema.js";

//Get order per user
export const getOrder = (userId) => {
  return orderSchema.find({ user: userId });
};

//Get all orders | private
export const getOrders = () => {
  return orderSchema.find();
};

//Create an order
export const createOrder = (orderObj) => {
  return orderSchema(orderObj).save();
};

//UPDATE order status
export const updateOrder = (updatedObject) => {
  console.log(updatedObject);
  return orderSchema.findByIdAndUpdate(updatedObject?._id, updatedObject, {
    new: true,
  });
};

//DELETE
export const deleteOrder = (_id) => {
  return orderSchema.findByIdAndDelete(_id);
};
