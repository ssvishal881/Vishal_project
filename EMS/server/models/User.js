import { name } from "ejs";
import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  role: { type: String, enum: ["admin", "employee"], require: true },
  profileImage: { type: String },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", usersSchema);
export default User;
