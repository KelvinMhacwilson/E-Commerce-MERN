import express from "express";
import userSignUp from "../controllers/userSignUp.controller.js";
import userSignIn from "../controllers/userSignIn.controller.js";
import { userDetails } from "../controllers/userDetails.controller.js";
import { authToken } from "../middleware/authToken.js";
import userLogout from "../controllers/userLogout.controller.js";
import { allUsers } from "../controllers/allUsers.controller.js";
import { updateUser } from "../controllers/updateUser.controller.js";
import { uploadProduct } from "../controllers/uploadProduct.controller.js";
import { getAllProducts } from "../controllers/getAllProduct.controller.js";
import { updateProduct } from "../controllers/updateProduct.controller.js";
import { getProductCategory } from "../controllers/product/getProductCategory.js";
import { getProductsForCategories } from "../controllers/product/getProductsForCategories.js";
import getProductDetails from "../controllers/product/getProductDetails.js";
import { addToCart } from "../controllers/user/addToCart.controller.js";
import { totalItemsInCart } from "../controllers/user/totalItemsInCart.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userSignIn);
router.get("/logout", userLogout);
router.get("/user-details", authToken, userDetails);

// Admin Panel
router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUser);
router.post("/upload-product", authToken, uploadProduct);
router.post("/update-product", authToken, updateProduct);
router.get("/all-products", getAllProducts);
router.get("/get-products-category", getProductCategory);

// Product
router.post(`/category-product`, getProductsForCategories);
router.get(`/product-details/:id`, getProductDetails);

// Cart
router.post(`/add-to-cart`, authToken, addToCart);
router.get("/cart-total", authToken, totalItemsInCart);

export default router;
