// Login the user
import { createUser, findUserByEmail } from "../model/userModel.js";
import { comparePassword, hashPassword } from "../utility/bcryptHelper.js";
import express from "express";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    const passwordMatch = comparePassword(password, user.password);

    if (passwordMatch) {
      buildSuccessResponse(res, email, "Login successful");
    }
  } catch (error) {
    buildErrorResponse(res, "Invalid Credentials");
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
    console.log(user);
  } catch (error) {
    console.log(error);
  }

  // try {
  //   // hash the password
  //   const { password } = req.body;

  //   const encryptedPassword = hashPassword(password);

  //   user?._id ? res.send(200, email + password) : res.send(500, "error");
  // } catch (error) {
  //   if (error.code === 11000) {
  //     error.message = "User with this email already exists!!";
  //   }
  //   res.send(500, error);
  // }
});

export default userRouter;
