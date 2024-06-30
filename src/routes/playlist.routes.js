import { Router } from "express";
import { verifiedJWT } from "../middlewares/auth.middleware.js";

import {
    createPlayList,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
} from "../controllers/playlist.controllers.js";

const router = Router();

router.route("/create").post(verifiedJWT,createPlayList);

router.route("/user/:userId").get(verifiedJWT,getUserPlaylists);

router.route("/:playlistId").get(verifiedJWT,getPlaylistById);


router.route("/add/:playlistId/:videoId").patch(verifiedJWT,addVideoToPlaylist);

router.route("/remove/:playlistId/:videoId").patch(verifiedJWT,removeVideoFromPlaylist);

router.route("/play/:playlistId").delete(verifiedJWT,deletePlaylist);

router.route("/:playlistId").patch(verifiedJWT,updatePlaylist);



export default router;