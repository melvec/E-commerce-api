import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    suburb: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Address", addressSchema);
