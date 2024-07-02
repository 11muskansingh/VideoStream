import { Router } from "express";
import { verifiedJWT } from "../middlewares/auth.middleware.js";

import {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment,
} from "../controllers/comments.controllers.js";

const router = Router();

router.route("/add/:videoId").post(verifiedJWT,addComment);

router.route("/c/:commentId").patch(verifiedJWT,updateComment);

router.route("/c/:commentId").delete(verifiedJWT,deleteComment);



export default router;