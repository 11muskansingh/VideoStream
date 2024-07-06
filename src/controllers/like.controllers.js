import mongoose from "mongoose";
import { ApiError } from "../utils/Apierrors.js";
import { asynchandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/Apiresponses.js";
import { Like } from "../models/likes.models.js";
import { User } from "../models/users.models.js";
//TODO: toggle like on video
const toggleVideoLike = asynchandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) throw new ApiError(400, " Video Id is required");

  const userId = req.user?._id;

  const liked = await Like.findOne({
    likedBy: new mongoose.Types.ObjectId(userId),
    videos: new mongoose.Types.ObjectId(videoId),
  });

  if (liked) {
    await Like.deleteOne({
      _id: liked._id,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "Video unLiked successfully"));
  } else {
    const newLike = await Like.create({
      likedBy: userId,
      videos: videoId,
      likedAt: new Date(),
    });

    if (!newLike) throw new ApiError(500, "Problem liking the video");

    return res
      .status(200)
      .json(new ApiResponse(200, newLike, "Video Liked successfully"));
  }
});

//TODO: toggle like on comment
const toggleCommentLike = asynchandler(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId) throw new ApiError(400, " Comment Id is required");

  const userId = req.user?._id;

  const comment = await Like.findOne({
    likedBy: new mongoose.Types.ObjectId(userId),
    comment: new mongoose.Types.ObjectId(commentId),
  });

  if (comment) {
    await Like.deleteOne({
      _id: comment._id,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "Comment unLiked successfully"));
  } else {
    const newComment = await Like.create({
      likedBy: userId,
      comment: commentId,
      likedAt: new Date(),
    });

    if (!newComment) throw new ApiError(500, "Problem liking the video");

    return res
      .status(200)
      .json(new ApiResponse(200, newComment, "Comment Liked successfully"));
  }
});

//TODO: toggle like on tweet
const toggleTweetLike = asynchandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!tweetId) throw new ApiError(400, "Comment Id is required");

  const userId = req.user?._id;

  const tweet = await Like.findOne({
    likedBy: new mongoose.Types.ObjectId(userId),
    tweet: new mongoose.Types.ObjectId(tweetId),
  });

  if (tweet) {
    await Like.deleteOne({
      _id: tweet._id,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "Tweet unLiked successfully"));
  } else {
    const newTweet = await Like.create({
      likedBy: userId,
      tweet: tweetId,
      likedAt: new Date(),
    });

    if (!newTweet) throw new ApiError(500, "Problem liking the tweet");

    return res
      .status(200)
      .json(new ApiResponse(200, newTweet, "Tweet Liked successfully"));
  }
});

//TODO: get all liked videos by user
const getLikedVideosByUser = asynchandler(async (req, res) => {
  const { userId } = req.params;

  const likedVideos = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "likedBy",
        as: "alllikedVideos",
      },
    },
    {
      $addFields: {
        videosLiked: {
          videosLiked: "$alllikedVideos",
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        likedVideos[0].videosLiked,
        "All liked Videos fetched successfully"
      )
    );
});

export {
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  getLikedVideosByUser,
};
