import Cart from "../../models/cart.model.js";

export const totalItemsInCart = async (req, res) => {
  try {
    const userId = req?.userId;
    const cartItems = await Cart.countDocuments({ userId });

    return res.status(200).json(cartItems);
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message || error,
    });
  }
};
