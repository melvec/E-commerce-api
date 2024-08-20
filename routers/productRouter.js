import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../model/productModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";

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

// Update
productRouter.patch("/", async (req, res) => {
  try {
    // if(req.file){
    //   const uploadResult = await new Promise((resolve) => {
    //     cloudinary.uploader.upload_stream({ folder: 'Product' }, (error, uploadResult) => {
    //       if(error) {
    //         return reject(error)
    //       }

    //       return resolve(uploadResult);
    //     }).end(req.file.buffer);
    //   });

    //   req.body.thumbnail = uploadResult?.secure_url

    //   // Create a slug | url friendly product name
    //   req.body.slug = slugify(req.body.name, {
    //     lower: true,
    //     trim: true
    //   })

    //   const product = await updateproduct(req.body)

    //   product?._id
    //   ? buildSuccessResponse(res, product, "Product Updated Successfully.")
    //   : buildErrorResponse(res, "Could not update the product!")
    // }

    const { thumbnail, image, ...rest } = req.body;

    const product = await updateProduct(rest);

    product?._id
      ? buildSuccessResponse(res, product, "Product Updated Successfully.")
      : buildErrorResponse(res, "Could not update the product!");
  } catch (error) {
    buildErrorResponse(res, error?.message);
  }
});

//Private route |  delete
productRouter.delete("/", async (req, res) => {
  try {
    const productToDelete = await deleteProduct(req.body._id);

    return productToDelete?._id
      ? buildSuccessResponse(
          res,
          productToDelete,
          "Product deleted successfully"
        )
      : buildErrorResponse(res, "Could not delete product.");
  } catch (error) {
    buildErrorResponse(res, "Could not delete product.");
  }
});

export default productRouter;
