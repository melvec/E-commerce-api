import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    shop: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    },
    dimensions: {
      type: String,
      required: false,
    },
    frame: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Categories
export default mongoose.model("Product", productSchema);
