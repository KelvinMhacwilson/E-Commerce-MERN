import Cart from "../../models/cart.model.js";

export const deleteCartProduct = async (req, res) => {
  try {
    const { cartProductId } = req.body;

    const deleteCartProduct = await Cart.deleteOne({ _id: cartProductId });

    return res.status(200).json(deleteCartProduct);
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message || error,
    });
  }
};
