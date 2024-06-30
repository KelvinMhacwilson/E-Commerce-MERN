import User from "../models/user.model.js";

export const allUsers = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== "ADMIN") {
      return res.status(200).json("Page DOES NOT exist");
    }

    const allUsers = await User.find();

    return res.status(200).json(allUsers);
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message || error,
    });
  }
};
