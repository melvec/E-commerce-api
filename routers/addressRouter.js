import express from "express";
import {
  createAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "../model/addressModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";

const addressRouter = express.Router();

//get addresses of a user
addressRouter.get("/", async (req, res) => {
  try {
    const { user } = req.body;
    const addresses = await getAddresses(user);

    addresses?.length
      ? buildSuccessResponse(res, addresses, "addresses")
      : buildErrorResponse(res, "Could not fetch daata");
  } catch (error) {
    buildErrorResponse(res, "Could not fetch daata");
  }
});

addressRouter.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const address = await createAddress(req.body);
    address?.id
      ? buildSuccessResponse(res, address, "Address created successfully")
      : buildErrorResponse(res, "Could not create the address");
  } catch (error) {
    console.log(error);
    buildErrorResponse(res, "Could not create the address");
  }
});
addressRouter.patch("/", async (req, res) => {
  try {
    const address = await updateAddress(req.body);
    address?.id
      ? buildSuccessResponse(res, address, "Address updated successfully")
      : buildErrorResponse(res, "Could not update the address");
  } catch (error) {
    buildErrorResponse(res, "Could not update the address");
  }
});

addressRouter.delete("/", async (req, res) => {
  try {
    const addressToDelete = await deleteAddress(req.body._id);
    return addressToDelete?._id
      ? buildSuccessResponse(
          res,
          addressToDelete,
          "Address deleted successfully"
        )
      : buildErrorResponse(res, "could not delete address");
  } catch (error) {
    buildErrorResponse(res, "could not delete address");
  }
});

export default addressRouter;
