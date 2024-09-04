import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToMongoDb } from "./config/dbConfig.js";
import userRouter from "./routers/userRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import productRouter from "./routers/productRouter.js";
import addressRouter from "./routers/addressRouter.js";
import orderRouter from "./routers/orderRouter.js";
import Stripe from "stripe";

const app = express();
const PORT = process.env.PORT || 8000;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Middlewares
app.use(cors());
app.use(express.json());

// Connect to db
connectToMongoDb();

// Routers
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.post("/create-payment-intent", async (req, res) => {
  try {
    console.log("entered create-payment-intent ");
    const { amount, currency, customer } = req.body;
    console.log(amount);
    const paymentIntent = await stripe.paymentIntents.create({
      currency: currency,
      amount: amount || 10,
      metadata: { customerName: customer },
      automatic_payment_methods: { enabled: true },
    });
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// Start Server
app.listen(PORT, (error) => {
  error ? console.log("Error", error) : console.log("Server is running");
});
