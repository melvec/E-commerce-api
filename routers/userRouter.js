// Login the user
import { createUser, findUserByEmail } from "../model/userModel.js";
import { comparePassword, hashPassword } from "../utility/bcryptHelper.js";
import {
  adminAuth,
  refreshAuth,
} from "../middleware/authMiddleware/authMiddleware.js";
import express from "express";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";
import { generateJWTs } from "../utility/jwtHelper.js";

const userRouter = express.Router();

// Login the user
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user with email
    const user = await findUserByEmail(email);

    // return error if user is not found or user is not verified
    if (!user?._id) {
      return buildErrorResponse(res, "User account does not exist!");
    }
    // compare the password
    const isPasswordMatched = comparePassword(password, user.password);

    if (isPasswordMatched) {
      const jwt = await generateJWTs(user.email);
      return buildSuccessResponse(res, jwt, "Logged in successfully");
    }
    return buildErrorResponse(res, "Invalid Credentials");
  } catch (error) {
    buildErrorResponse(res, "Invalid Credentials!");
  }
});
// CREATE USER  |POST | SIGNUP
userRouter.post("/", async (req, res) => {
  try {
    const { password } = req.body;

    const encryptedPassword = hashPassword(password);

    // create user in db
    const user = await createUser({
      ...req.body,
      password: encryptedPassword,
    });
    user?._id
      ? buildSuccessResponse(res, user, "User created Successfully!!")
      : buildErrorResponse(res, "Could not create user!!");
  } catch (error) {
    if (error.code === 11000) {
      error.message = "User with this email already exists!";
    }

    buildErrorResponse(res, error.message);
  }
});

// PRIVATE ROUTES
//set user// adminAuth middleware removed
userRouter.get("/", adminAuth, async (req, res) => {
  try {
    buildSuccessResponse(res, req.userInfo, "User Info");
  } catch (error) {
    buildErrorResponse(res, error.message);
  }
});

// GET NEW ACCESS TOKEN
userRouter.get("/accessjwt", refreshAuth);

export default userRouter;
