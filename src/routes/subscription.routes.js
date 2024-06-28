import { Router } from "express";
import { verifiedJWT } from "../middlewares/auth.middleware.js";
import { 
    getUserChannelSubscribers,
    getSubscribedChannels,
} from "../controllers/subscription.controllers.js";

const router = Router();

router.route("/u/:channelId").get(verifiedJWT,getUserChannelSubscribers);

router.route("/c/:subscriberId").get(verifiedJWT,getSubscribedChannels);


export default router;