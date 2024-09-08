import express from "express";
import { createOrder, getOrder, getOrders } from "../model/orderModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";

const orderRouter = express.Router();

orderRouter.post("/", async (req, res) => {
  try {
    console.log(req.body);
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

//get orders
orderRouter.get("/", async (req, res) => {
  try {
    const orders = await getOrders();

    orders?.length
      ? buildSuccessResponse(res, orders, "orders")
      : buildErrorResponse(res, "Could not fetch data");
  } catch (error) {
    buildErrorResponse(res, "Could not fetch data");
  }
});

orderRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await getOrder(userId);

    orders?.length
      ? buildSuccessResponse(res, orders, "orders")
      : buildErrorResponse(res, "Could not fetch orders");
  } catch (error) {
    buildErrorResponse(res, "Could not fetch orders");
  }
});

export default orderRouter;
