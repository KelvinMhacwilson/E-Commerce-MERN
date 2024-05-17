import Products from "../../models/product.model.js";

export const getProductCategory = async (req, res) => {
  try {
    const productCategory = await Products.distinct("category");

    const productByCategory = [];

    for (const category of productCategory) {
      const product = await Products.findOne({ category });

      if (product) {
        productByCategory.push(product);
      }
    }

    return res.status(200).json(productByCategory);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
};
