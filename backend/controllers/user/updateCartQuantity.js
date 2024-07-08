import Cart from "../../models/cart.model.js";

export const updateCartQuantity = async (req, res) => {
  try {
    const { quantity, cartProductId } = req.body;
    console.log(cartProductId, quantity);

    const updatedCartProduct = await Cart.updateOne(
      { _id: cartProductId },
      {
        ...(quantity && { quantity: quantity }),
      }
    );

    return res.status(200).json(updatedCartProduct);
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message || error,
    });
  }
};
