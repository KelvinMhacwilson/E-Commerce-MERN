import userPermission from "../helper/permission.js";
import Products from "../models/product.model.js";
import User from "../models/user.model.js";

export const uploadProduct = async (req, res) => {
  try {
    const user = await userPermission(req.userId);

    if (!user) {
      return res.status(403).json("Access Denied");
    }

    const newProduct = await Products.create(req.body);

    return res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json({
      message: message.error || error,
      success: false,
      error: true,
    });
  }
};
