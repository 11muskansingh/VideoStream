import { Router } from "express";
import { verifiedJWT } from "../middlewares/auth.middleware.js";
import { 
    getUserChannelSubscribers,
    getSubscribedChannels,
    toggleSubscription,
} from "../controllers/subscription.controllers.js";

const router = Router();

router.route("/u/:channelId").get(verifiedJWT,getUserChannelSubscribers);

router.route("/c/:subscriberId").get(verifiedJWT,getSubscribedChannels);

router.route("/toggle/:channelId").post(verifiedJWT, toggleSubscription);


export default router;