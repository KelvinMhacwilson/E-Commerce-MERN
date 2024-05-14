import express from "express";
import userSignUp from "../controllers/userSignUp.controller.js";
import userSignIn from "../controllers/userSignIn.controller.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userSignIn);

export default router;
