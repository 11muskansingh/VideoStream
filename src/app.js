import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const corsOptions = {
  origin: "https://you-view-teal.vercel.app", // your frontend URL 
  methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
  credentials: true, // allows cookies and authorization headers
};

// Apply CORS with the specified options
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight requests

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Test route to check CORS configuration
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is configured correctly!" });
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});


// Import and apply routes
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);

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
