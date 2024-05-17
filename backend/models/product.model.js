import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: Array,
    description: String,
    price: Number,
    sellingPrice: Number,
  },
  { timestamps: true }
);

const Products = model("products", productSchema);

export default Products;
