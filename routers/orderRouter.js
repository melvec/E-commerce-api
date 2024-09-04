import express from "express";
import { createOrder } from "../model/orderModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";

const orderRouter = express.Router();

orderRouter.post("/", async (req, res) => {
  try {
    const order = await createOrder(req.body);
    console.log("order", order);
    order?._id
      ? buildSuccessResponse(res, order, "Order created")
      : buildErrorResponse(res, "Could not create order");
  } catch (error) {
    console.log(error);
    buildErrorResponse(res, "Could not create order");
  }
});

export default orderRouter;
