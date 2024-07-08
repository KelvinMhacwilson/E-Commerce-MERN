import Cart from "../../models/cart.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req?.body;

    const isProductAvailable = await Cart.findOne({ productId });

    if (isProductAvailable) {
      return res.status(400).json({ message: "Product already exist in cart" });
    }

    if (!productId) {
      return res.status(400).json({ message: "Product does not exist" });
    }

    const payload = {
      productId,
      quantity: 1,
      userId: req.userId,
    };

    const cart = await Cart.create(payload);
    return res.status(200).json({
      data: cart,
      message: "Product added to cart",
    });
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message || error,
    });
  }
};
