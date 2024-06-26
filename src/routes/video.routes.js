import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifiedJWT } from "../middlewares/auth.middleware.js";
import { publishVideo , getVideoById } from "../controllers/video.controllers.js";
import { get } from "mongoose";
   

const router = Router(); 
router.route("/publishVideo").post(
    verifiedJWT,
    upload.fields([
        {
            name:"videoFile",
            maxCount:1,
        },
       {
        name:"thumbnail",
        maxCount:1,
       }
    ]),
    publishVideo
)

router.route("/c/:videoId").get(verifiedJWT,getVideoById);

export default router;