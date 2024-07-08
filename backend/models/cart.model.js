import { Schema, model } from "mongoose";

const cartProductSchema = new Schema(
  {
    productId: {
      ref: "products",
      type: String,
    },
    quantity: Number,
    userId: String,
  },
  { timestamps: true }
);

const Cart = model("carts", cartProductSchema);

export default Cart;
