import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    parentCategory: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    name: {
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
    quantity: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Product
export default mongoose.model("Product", productSchema);
