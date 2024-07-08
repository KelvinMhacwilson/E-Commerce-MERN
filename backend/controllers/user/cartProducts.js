import Cart from "../../models/cart.model.js";

export const cartProducts = async (req, res) => {
  try {
    const currentUser = req.userId;

    const allProducts = await Cart.find({ userId: currentUser }).populate(
      "productId"
    );

    return res.status(200).json(allProducts);
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message || error,
    });
  }
};
