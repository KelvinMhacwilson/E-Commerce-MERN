import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function userSignIn(req, res) {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      return res.status(400).json("No Credentials");
    }

    const user = await User.findOne({ email });

    const hashedPassword = await bcrypt.compare(password, user?.password || "");

    if (!user || !hashedPassword) {
      return res.status(400).json("Invalid Credentials");
    }

    const tokenData = {
      _id: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "Login successfully",
      data: token,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export default userSignIn;
