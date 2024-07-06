import { ApiError } from "../utils/Apierrors.js";
import { asynchandler } from "../utils/asynchandler.js";
import { User } from "../models/users.models.js";
import { Video } from "../models/video.models.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/Apiresponses.js";
import jwt from "jsonwebtoken";
import { SubscriptionSchema } from "../models/subscription.models.js";
import mongoose from "mongoose";

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asynchandler(async (req, res) => {
  const { channelId } = req.params;

  if (!channelId) throw new ApiError(200, "The channel id is required");

  const subscribers = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $lookup: {
        from: "subscriptionschemas",
        localField: "_id",
        foreignField: "channel",
        as: "tsubscribers",
      },
    },
    {
      $project: {
        tsubscribers: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, subscribers, "All subscribers fetched successfully")
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asynchandler(async (req, res) => {
  const { subscriberId } = req.params;
  if (!subscriberId) throw new ApiError(200, "The subscriber id is required");

  const channels = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(subscriberId),
      },
    },
    {
      $lookup: {
        from: "subscriptionschemas",
        localField: "_id",
        foreignField: "subscriber",
        as: "totalChannelSubscribed",
      },
    },
    {
      $project: {
        totalChannelSubscribed: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, channels, "All channels fetched successfully"));
});

const toggleSubscription = asynchandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user?._id;
  if (!channelId) throw new ApiError(200, "The channel id is required");

  const existingSubscriber = await SubscriptionSchema.findOne({
    channel: new mongoose.Types.ObjectId(channelId),
    subscriber: new mongoose.Types.ObjectId(userId),
  });

  if (existingSubscriber) {
    await SubscriptionSchema.findByIdAndDelete(userId);

    return res
      .status(200)
      .json(new ApiResponse(200, "User Unsubscribed Successfully"));
  } else {
    const newSubscriber = await SubscriptionSchema.create({
      subscriber: new mongoose.Types.ObjectId(userId),
      channel: new mongoose.Types.ObjectId(channelId),
      subscribedAt: new Date(),
    });
    await newSubscriber.save();

    if (!newSubscriber)
      throw new ApiError(500, "Not able to Subscribe the channel");

    return res
      .status(200)
      .json(
        new ApiResponse(200, newSubscriber, "User subscribed successfully")
      );
  }
});

export { getUserChannelSubscribers, getSubscribedChannels, toggleSubscription };
