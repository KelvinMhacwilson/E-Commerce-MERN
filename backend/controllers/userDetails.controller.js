import User from "../models/user.model.js";

export async function userDetails(req, res) {
  try {
    const user = await User.findById(req.userId);

    return res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message || error,
      error: true,
    });
  }
}
