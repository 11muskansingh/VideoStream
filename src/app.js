import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//calling routes
import userRouter from "./routes/user.routes.js";
//route declaration
app.use("/api/v1/users", userRouter);
//https://localhost:5000/api/v1/users

import videoRoutes from "./routes/video.routes.js"
app.use("/api/v1/videos",videoRoutes)

import subscriptionRoutes from "./routes/subscription.routes.js"
app.use("/api/v1/subscription",subscriptionRoutes);

export { app };
