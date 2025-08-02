// import mongoose from "mongoose";

// export const connectToMongoDb = () => {
//   try {
//     const connect = mongoose.connect(
//       process.env.DB_CONNECT_URL + "/ecommerce-db"
//     );
//     if (connect) {
//       console.log(
//         `Database conected: ${process.env.DB_CONNECT_URL}/ecommerce-db`
//       );
//     }
//   } catch (error) {
//     console.log("Error:", error);
//   }
// };

import mongoose from "mongoose";

export const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};
