import { getSession } from "../../model/sessionModel.js";
import { findUserByEmail } from "../../model/userModel.js";
import {
  generateAccessJWT,
  verifyAccessJWT,
  verifyRefreshJWT,
} from "../../utility/jwtHelper.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../../utility/responseHelper.js";

// Admin auth
export const adminAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const token = authorization;

    // validate if accessJWT is valid
    const decoded = verifyAccessJWT(token);

    if (decoded?.email) {
      const sessionToken = await getSession({
        token: token,
        userEmail: decoded.email,
      });

      if (sessionToken?._id) {
        const user = await findUserByEmail(decoded.email);

        if (user?._id) {
          user.password = undefined;
          req.userInfo = user;

          return next();
        }
      }
    }

    throw new Error("Invalid token, unauthorized");
  } catch (error) {
    return res.status(400).send(error); //buildErrorResponse(res, error.message || "Invalid token!!");
  }
};

export const refreshAuth = async (req, res) => {
  try {
    const { authorization } = req.headers;
    // validate and decode refresh token
    const decoded = verifyRefreshJWT(authorization);

    // get the user based on email and generate new access token for the user
    if (decoded?.email) {
      const user = await findUserByEmail(decoded.email);

      if (user?._id) {
        // generate new access token and return back that token to client
        const accessJWT = await generateAccessJWT(user.email);

        return buildSuccessResponse(res, accessJWT, "New Access Token");
      }
    }

    throw new Error("Invalid token!!");
  } catch (error) {
    return buildErrorResponse(res, error.message);
  }
};
