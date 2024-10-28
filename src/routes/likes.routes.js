import { Router } from "express";
import { verifiedJWT } from "../middlewares/auth.middleware.js";

import {
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  getLikedVideosByUser,
} from "../controllers/like.controllers.js";

const router = Router();

router.route("/video/:videoId").post(verifiedJWT, toggleVideoLike);

router.route("/comment/:commentId").post(verifiedJWT, toggleCommentLike);

router.route("/tweet/:tweetId").post(verifiedJWT, toggleTweetLike);

router.route("/likedVideos").get(verifiedJWT, getLikedVideosByUser);

export default router;
