import mongoose from "mongoose";
import { ApiError } from "../utils/Apierrors.js";
import { asynchandler } from "../utils/asynchandler.js";
import { User } from "../models/users.models.js";
//import{ Video } from "../models/video.models.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/Apiresponses.js";
import jwt from "jsonwebtoken";
import { Tweet } from "../models/tweets.models.js";
import { Video } from "../models/video.models.js";



//TODO: create tweet
const createTweet = asynchandler(async (req, res) => {
    const { content } = req.body;
    if(!content)
        throw new ApiError(400,"tweet cannot be empty");

    const newTweet =await Tweet.create({
        content : content,
        owner : req.user?._id,
    })

    if(!newTweet)
        throw new ApiError(400,"Not able to tweet");

     return res
     .status(200)
     .json(
        new ApiResponse(200 , newTweet , "Tweeted Successfully")
          )   
})


//TODO: update tweet
const updateTweet = asynchandler(async (req, res) => {
    const { tweetId } = req.params;
    const { content } = req.body;
    if(!tweetId )
        throw new ApiError(400,"Give correct tweet id");

    const updatedTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set:{
               content:content,
            }
        }
    )

    if(!updatedTweet)
        throw new ApiError(500 , "Problem updating the Tweet");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedTweet, "Tweet updated successfully"));
})


//TODO: delete tweet
const deleteTweet = asynchandler(async (req, res) => {

    const { tweetId } = req.params

    if(!tweetId )
        throw new ApiError(400,"TweetId  is required");

     await Tweet.findByIdAndDelete(
       tweetId
     )

     return res
      .status(200)
      .json(
        new ApiResponse(200,"Tweet Deleted Successfully")
      )    
})

// TODO: get user tweets
const getUserTweets = asynchandler(async (req, res) => {
    const { userId } = req.params

    if(!userId)
        throw new ApiError(400,"User Id is required");
     
    const user = await User.aggregate([
        {
            $match : {
                _id:new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup :{
                from : "tweets",
                localField:"_id",
                foreignField:"owner",
                as:"allTweets"
            }
        },
        {
            $project:{
                allTweets:1,
            }
        }
    ]);
     if(!user || user.length === 0)
        throw new ApiError(500,"Not able to find all the user Tweets");

     return res
           .status(200)
           .json(
                  new ApiResponse(200,user[0],"These are the Tweets")
                )
})

export {
    createTweet,
    updateTweet,
    deleteTweet,
    getUserTweets,
}