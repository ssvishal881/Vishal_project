import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("MONGODB_URL =", process.env.MONGODB_URL);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log("Connection Error:", err));
