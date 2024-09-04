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
  products: [
    {
      productId: {
        type: String,
        //ref: "Product", // reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Order", orderSchema);
