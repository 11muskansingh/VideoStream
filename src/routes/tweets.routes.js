import { Router } from "express";
import { verifiedJWT } from "../middlewares/auth.middleware.js";

import {
  createTweet,
  updateTweet,
  deleteTweet,
  getUserTweets,
} from "../controllers/tweets.controllers.js";

const router = Router();

router.route("/create").post(verifiedJWT, createTweet);

router.route("/update/:tweetId").patch(verifiedJWT, updateTweet);

router.route("/delete/:tweetId").delete(verifiedJWT, deleteTweet);

router.route("/get/:userId").get(verifiedJWT, getUserTweets);
export default router;
