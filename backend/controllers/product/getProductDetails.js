import Products from "../../models/product.model.js";

export default async function (req, res) {
  try {
    const { id } = req.params;

    const product = await Products.findById(id);

    if (product) {
      return res.status(200).json(product);
    }
  } catch (error) {
    return res.status(400).json(error.message || error);
  }
}
