import mongoose from "mongoose";
import { ApiError } from "../utils/Apierrors.js";
import { ApiResponse } from "../utils/Apiresponses.js";
import { User } from "../models/users.models.js";
import { Video } from "../models/video.models.js";
import { asynchandler } from "../utils/asynchandler.js";

// TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
const getChannelStats = asynchandler(async (req, res) => {});

// TODO: Get all the videos uploaded by the channel
const getChannelVideos = asynchandler(async (req, res) => {
  const { channelId } = req.params;
  const channel = User.findById(channelId);

  if (!channel) throw new ApiError(400, "Channel does not exists");

  const uploadedVideo = User.aggregate([
    {
      $lookup: {
        from: "videos",
        localField: "_id",
        foreignField: "owner",
        as: "allvideos",

        // pipeline:[
        //   {
        //     $match:{

        //     }
        //   }
        // ]
      },
    },
  ]);
});

export { getChannelStats, getChannelVideos };
