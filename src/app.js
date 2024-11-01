import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: ["https://you-view-9ej5j3zvg-11muskansinghs-projects.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// app.get("/check-cookies", (req, res) => {
//   console.log(req.cookies);
//   console.log(res.getHeaders());
//   res.json({ cookies: req.cookies });
// });

//calling routes
import userRouter from "./routes/user.routes.js";
//route declaration
app.use("/api/v1/users", userRouter);
//https://localhost:5000/api/v1/users

import videoRoutes from "./routes/video.routes.js";
app.use("/api/v1/videos", videoRoutes);

import subscriptionRoutes from "./routes/subscription.routes.js";
app.use("/api/v1/subscription", subscriptionRoutes);

import playlistRoutes from "./routes/playlist.routes.js";
app.use("/api/v1/playlist", playlistRoutes);

import tweetRoutes from "./routes/tweets.routes.js";
app.use("/api/v1/tweet", tweetRoutes);

import commentRoutes from "./routes/comments.routes.js";
app.use("/api/v1/comment", commentRoutes);

import likedRoutes from "./routes/likes.routes.js";
app.use("/api/v1/like", likedRoutes);

export { app };
