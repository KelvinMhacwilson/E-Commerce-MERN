import User from "../models/user.model.js";

export const updateUser = async (req, res) => {
  try {
    const { userId, email, name, role } = req.body;

    const user = await User.findById(req.userId);

    if (!user || user.role !== "ADMIN") {
      return res.status(200).json("Page Does Not Exist");
    }

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const updateUser = await User.findByIdAndUpdate(userId, payload);

    return res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
