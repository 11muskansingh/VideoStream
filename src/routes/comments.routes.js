import { Router } from "express";
import { verifiedJWT } from "../middlewares/auth.middleware.js";

import {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment,
} from "../controllers/comments.controllers.js";

const router = Router();

router.route("/add/:videoId").post(verifiedJWT, addComment);

router.route("/updateComment/:commentId").patch(updateComment);

router.route("/deleteComment/:commentId").delete(deleteComment);
router.route("/get/:videoId").get(getVideoComments);

export default router;
