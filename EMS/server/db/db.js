import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
  //web hook test
  //Secutity test
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
};

export default connectToDatabase;
