import express from "express";
import { createProduct, getProducts } from "../model/productModel.js";

const productRouter = express.Router();

//Public routes

// get all products
productRouter.get("/", async (req, res) => {
  try {
    const products = await getProducts();

    products?.length
      ? buildSuccessResponse(res, products, "products")
      : buildErrorResponse(res, "Could not fetch data");
  } catch (error) {
    buildErrorResponse(res, "Could not fetch data");
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const product = await createProduct(req.body);

    return product?._id
      ? buildSuccessResponse(res, product, "product creaetd successfully")
      : buildErrorResponse(res, "Could not create product.");
    //}

    // buildErrorResponse(res, "Could not create product.");
  } catch (error) {
    buildErrorResponse(res, "Could not create product.");
  }
});

export default productRouter;
