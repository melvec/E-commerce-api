import orderSchema from "../schema/orderSchema.js";

//Get all addresses from a user
export const getOrders = (userId) => {
  return orderSchema.find({ user: userId });
};

//Create an order
export const createOrder = (orderObj) => {
  return orderSchema(orderObj).save();
};

//UPDATE
export const updateOrder = (updatedObject) => {
  return orderSchema.findByIdAndUpdate(updatedObject?._id, updatedObject, {
    new: true,
  });
};

//DELETE
export const deleteOrder = (_id) => {
  return orderSchema.findByIdAndDelete(_id);
};
