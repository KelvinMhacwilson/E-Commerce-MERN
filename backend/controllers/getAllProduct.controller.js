import Products from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.find().sort({ createdAt: -1 });

    return res.status(200).json(allProducts);
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
