import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import router from "./routes/index.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const corsConfig = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsConfig));
app.use(cookieParser());
app.use("/api/", router);

const PORT = 8000 || process.env.PORT;

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log(`Server listening on port ${PORT}`);
  });
});
