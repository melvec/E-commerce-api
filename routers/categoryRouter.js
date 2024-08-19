import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "../model/categoryModel.js";
import { adminAuth } from "../middleware/authMiddleware/authMiddleware.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";

const categoryRouter = express.Router();

// PUBLIC ROUTES

// GET ALL CATEGORIES
categoryRouter.get("/", async (req, res) => {
  try {
    const categories = await getCategories();

    categories?.length
      ? buildSuccessResponse(res, categories, "Categories")
      : buildErrorResponse(res, "Could not fetch data");
  } catch (error) {
    buildErrorResponse(res, "Could not fetch data");
  }
});

// adminAuth, upload.single("image") removed temporary, for cloudinary
categoryRouter.post("/", async (req, res) => {
  try {
    //   const uploadResult = await new Promise((resolve) => {
    //     cloudinary.uploader.upload_stream({ folder: 'Category' }, (error, uploadResult) => {
    //       if(error) {
    //         return reject(error)
    //       }

    //       return resolve(uploadResult);
    //     }).end(req.file.buffer);
    //   });

    //   if(req.file){
    //     req.body.thumbnail = uploadResult?.secure_url
    console.log(req.body);
    const category = await createCategory(req.body);

    return category?._id
      ? buildSuccessResponse(res, category, "Category creaetd successfully")
      : buildErrorResponse(res, "Could not create category.");
    //}

    // buildErrorResponse(res, "Could not create category.");
  } catch (error) {
    buildErrorResponse(res, "Could not create category.");
  }
});

//Private route | Update
categoryRouter.patch("/", async (req, res) => {
  try {
    const category = await updateCategory(req.body);
    return category?._id
      ? buildSuccessResponse(res, category, "Category updated successfully")
      : buildErrorResponse(res, "Could not update category.");
  } catch (error) {}
});

//Private route |  delete
categoryRouter.delete("/", async (req, res) => {
  try {
    const categoryToDelete = await deleteCategory(req.body._id);

    return categoryToDelete?._id
      ? buildSuccessResponse(
          res,
          categoryToDelete,
          "Category deleted successfully"
        )
      : buildErrorResponse(res, "Could not delete category.");
  } catch (error) {
    buildErrorResponse(res, "Could not delete category.");
  }
});

export default categoryRouter;
