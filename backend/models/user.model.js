import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    profilePic: String,
    role: String,
  },
  {
    timestamps: true,
  }
);

const User = model("user", userSchema);

export default User;
