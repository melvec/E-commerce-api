import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  payment: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  products: [
    {
      _id: {
        type: String,
        //ref: "Product", // reference to the Product model
        required: true,
      },
      cartQuantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Order", orderSchema);
