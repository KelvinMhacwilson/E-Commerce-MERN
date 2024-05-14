import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

async function userSignUp(req, res) {
  try {
    const { name, email, profilePic, password, confirmPassword } = req.body;
    if (!name) {
      throw new Error("Please enter name");
    }

    if (!email) {
      throw new Error("Please enter email");
    }

    if (!password) {
      throw new Error("Please enter password");
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
      //  throw new Error("User already exists");
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password Does not Match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePic,
      role: "GENERAL",
    });

    res.status(201).json({
      data: newUser,
      success: true,
      error: false,
      message: "User created successfully",
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export default userSignUp;
