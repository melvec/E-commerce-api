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

addressRouter.get("/:userId", async (req, res) => {
  try {
    // Assuming you're getting the user ID from query parameters
    const userId = req.params.userId;
    if (!userId) {
      return buildErrorResponse(res, "User ID is required");
    }

    const addresses = await getAddresses(userId);

    addresses?.length
      ? buildSuccessResponse(res, addresses, "Addresses fetched successfully")
      : buildErrorResponse(res, "No addresses found for this user");
  } catch (error) {
    console.error("Error fetching addresses:", error);
    buildErrorResponse(res, "Could not fetch data");
  }
});

addressRouter.post("/", async (req, res) => {
  try {
    const address = await createAddress(req.body);
    address?.id
      ? buildSuccessResponse(res, address, "Address created successfully")
      : buildErrorResponse(res, "Could not create the address");
  } catch (error) {
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
