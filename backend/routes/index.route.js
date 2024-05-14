import express from "express";
import userSignUp from "../controllers/userSignUp.controller.js";
import userSignIn from "../controllers/userSignIn.controller.js";
import { userDetails } from "../controllers/userDetails.controller.js";
import { authToken } from "../middleware/authToken.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userSignIn);
router.get("/user-details", authToken, userDetails);

export default router;
