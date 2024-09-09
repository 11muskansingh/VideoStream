import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifiedJWT } from "../middlewares/auth.middleware.js";
import {
  publishVideo,
  getVideoById,
  updateVideoDetails,
  deleteVideo,
  getAllVideos,
  getVideosByCategory,
  getAllRelatedVideos,
  getVideoDetail,
} from "../controllers/video.controllers.js";
import mongoose from "mongoose";

const router = Router();
router.route("/publishVideo").post(
  verifiedJWT,
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishVideo
);

router.route("/c/:videoId").get(verifiedJWT, getVideoById);

router
  .route("/c/:videoId")
  .patch(verifiedJWT, upload.single("thumbnail"), updateVideoDetails);

router.route("/c/:videoId").delete(verifiedJWT, deleteVideo);

router.route("/all").get(getAllVideos);
router.route("/category/:category").get(getVideosByCategory);
router.route("/related/:videoId").get(getAllRelatedVideos);
router.route("/info/:videoId").get(getVideoDetail);
export default router;
