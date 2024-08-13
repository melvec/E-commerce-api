import sessionSchema from "../schema/sessionSchema.js";

//read @filter must be an object
export const getSession = (filter) => {
  return sessionSchema.findOne(filter);
};

//Create
export const createSession = (sessionObj) => {
  console.log("create session entered");
  return sessionSchema(sessionObj).save();
};

//delete
export const deleteSession = (filter) => {
  return sessionSchema.findOneAndDelete(filter);
};
