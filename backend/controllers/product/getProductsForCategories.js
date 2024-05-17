import Products from "../../models/product.model.js";

export const getProductsForCategories = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;

    const productForCategory = await Products.find({ category });

    return res.status(200).json(productForCategory);
  } catch (error) {
    res.status(400).json(error.message || error);
  }
};
