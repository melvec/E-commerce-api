import productSchema from "../schema/productSchema.js";

// GET ALL products
export const getProducts = () => {
  return productSchema.find();
};

// CREATE A product
export const createProduct = (productObj) => {
  return productSchema(productObj).save();
};

// UPDATE
export const updateProduct = (updatedObject) => {
  return productSchema.findByIdAndUpdate(updatedObject?._id, updatedObject, {
    new: true,
  });
};

// DELETE
export const deleteProduct = (_id) => {
  return productSchema.findByIdAndDelete(_id);
};
