import userPermission from "../helper/permission.js";
import Products from "../models/product.model.js";

export const updateProduct = async (req, res) => {
  try {
    if (!userPermission(req.userId)) {
      return res.status(403).json("Access Denied");
    }

    const { _id, ...resBody } = req.body;
    const updatedProduct = await Products.findByIdAndUpdate(_id, resBody);

    return res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
