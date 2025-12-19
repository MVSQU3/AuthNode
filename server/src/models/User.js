import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: { type: String, require: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
  resetToken: { type: String },
});

export default mongoose.model("User", userSchema);
