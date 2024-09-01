import addressSchema from "../schema/addressSchema.js";

//Get all addresses from a user
export const getAddresses = (userId) => {
  return addressSchema.find({ user: userId });
};

//Create an address
export const createAddress = (addressObj) => {
  return addressSchema(addressObj).save();
};

//UPDATE
export const updateAddress = (updatedObject) => {
  return addressSchema.findByIdAndUpdate(updatedObject?._id, updatedObject, {
    new: true,
  });
};

//DELETE
export const deleteAddress = (_id) => {
  return addressSchema.findByIdAndDelete(_id);
};
