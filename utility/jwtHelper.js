import jwt from "jsonwebtoken";
import { createSession } from "../model/sessionModel.js";

// replace secret keys with JWT_ACCESS_SECRET for access JWT
// replace secret keys with JWT_REFRESH_SECRET for access JWT

// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

// access jwt: session table, exp:15min

export const generateAccessJWT = async (email) => {
  try {
    // Ensure the secret key is set
    if (!process.env.ACCESS_JWT_SECRET_KEY) {
      throw new Error("Missing ACCESS_JWT_SECRET_KEY in environment variables");
    }

    // Generate the access token
    const accessToken = jwt.sign({ email }, process.env.ACCESS_JWT_SECRET_KEY, {
      expiresIn: "15m",
    });
    console.log(accessToken);
    // Create a session record (make sure createSession is correctly implemented)
    createSession({ token: accessToken, userEmail: email });

    return accessToken;
  } catch (error) {
    console.error("Error generating access JWT:", error.message);
    throw error; // rethrow the error for further handling
  }
};

//refresh jwt: user table, exp: 30day
export const generateRefreshJWT = async (email) => {
  try {
    const token = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return token;
  } catch (error) {
    console.log(error);
  }
};

// generate tokens
export const generateJWTs = async (email) => {
  return {
    accessJWT: await generateAccessJWT(email),
    refreshJWT: await generateRefreshJWT(email),
  };
};

// verify access token and return decoded email
export const verifyAccessJWT = (accessJWT) => {
  return jwt.verify(accessJWT, process.env.JWT_ACCESS_SECRET);
};

// verify refresh token and return decoded email
export const verifyRefreshJWT = (refreshJWT) => {
  return jwt.verify(refreshJWT, process.env.JWT_REFRESH_SECRET);
};
