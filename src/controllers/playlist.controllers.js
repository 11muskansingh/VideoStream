import mongoose from "mongoose";
import { ApiError } from "../utils/Apierrors.js";
import { asynchandler } from "../utils/asynchandler.js";
import { User } from "../models/users.models.js";
//import{ Video } from "../models/video.models.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/Apiresponses.js";
import jwt from "jsonwebtoken";
import { Playlist } from "../models/playlists.models.js";
import { Video } from "../models/video.models.js";


//to create a playlist
const createPlayList = asynchandler(async (req,res)=>{
     const { name , description } = req.body

     if(!name)
        throw new ApiError(400,"Name of playlist is required");
     if(!description)
        throw new ApiError(400,"Description of playlist is required");

     const newPlayList = await Playlist.create({
        name : name,
        description : description,
        owner : req.user._id,
     })

     if(!newPlayList)
        throw new ApiError(400,"Not able to create the playlist");

     return res
     .status(200)
     .json(
        new ApiResponse(200 , newPlayList , "PlayList Created Successfully")
          )
})


//get user playlists
const getUserPlaylists = asynchandler(async (req, res) => {
    const { userId } = req.params

    if(!userId)
        throw new ApiError(400,"user Id is required");
     
    const user = await User.aggregate([
        {
            $match : {
                _id:new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup :{
                from : "playlists",
                localField:"_id",
                foreignField:"owner",
                as:"allPlaylists"
            }
        },
        {
            $project:{
                allPlaylists:1,
            }
        }
    ]);
     if(!user || user.length === 0)
        throw new ApiError(500,"Not able to find all the user playlists");

     return res
           .status(200)
           .json(
                  new ApiResponse(200,user[0],"These are the playlists")
                )   
})




//get playlist by id
const getPlaylistById = asynchandler(async (req, res) => {
    const { playlistId } = req.params
    if(!playlistId)
        throw new ApiError(400,"PlayList Id is required");

    const playList = await Playlist.findById(playlistId);

    if(!playList)
        throw new ApiError(400,"Give Correct PlayList Id");

    return res
     .status(200)
     .json(
        new ApiResponse(200,playList,"Playlist Fetched SuccessFully")
     )

})



//adding a video to a playlist
const addVideoToPlaylist = asynchandler(async (req, res) => {
    const { playlistId , videoId } = req.params

    if(!playlistId || !videoId)
        throw new ApiError(400,"Both playlist and video id are required");

    const video = await Video.findById(videoId);
    const playlist = await Playlist.findById(playlistId) ;

    if(!video)
        throw new ApiError(400,"Video doesnot exists");
    if(!playlist)
        throw new ApiError(400,"PlayList doesnot exists");

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
           $addToSet:{
              videos : videoId,
           } 
        },
        {
            new :true,
          }
    )

    if(!updatedPlaylist) 
        throw new ApiError(500 , "Problem uploading the video");
 
    return res
        .status(200)
        .json(new ApiResponse(200, updatedPlaylist, "Video added to playlist successfully"));
})


//remove video from playlist
const removeVideoFromPlaylist = asynchandler(async (req, res) => {
    const { playlistId, videoId }  = req.params

    if(!playlistId || !videoId)
        throw new ApiError(400,"Both playlist and video id are required");

    const video = await Video.findById(videoId);
    const playlist = await Playlist.findById(playlistId) ;

    if(!video)
        throw new ApiError(400,"Video doesnot exists");
    if(!playlist)
        throw new ApiError(400,"PlayList doesnot exists");

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull:{
                videos:videoId,
            }
        },
        {
            new :true,
        }
    )
    if(!updatedPlaylist) 
        throw new ApiError(500 , "Problem deleting the video");
 
    return res
        .status(200)
        .json(new ApiResponse(200, updatedPlaylist, "Video deleted from playlist successfully"));

})


// delete playlist
const deletePlaylist = asynchandler(async (req, res) => {
    const { playlistId } = req.params

    if(!playlistId)
        throw new ApiError(400,"PlayList Id is required");

     await Playlist.findByIdAndDelete(
        playlistId
     )

     return res
      .status(200)
      .json(
        new ApiResponse(200,"PlayList Deleted Successfully")
      )  
})



//update playlist
const updatePlaylist = asynchandler(async (req, res) => {
    const { playlistId } = req.params
    const { name, description }  = req.body

    if(!playlistId)
        throw new ApiError(400,"PlayList Id is required");

    if(!name)
        throw new ApiError(400,"Name of playlist is required");
     if(!description)
        throw new ApiError(400,"Description of playlist is required");

     const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set:{
                name : name,
                description : description,
            }  
        },
        {
            new :true,
        }
     )

     if(!updatedPlaylist) 
        throw new ApiError(500 , "Problem updating the details");
 
    return res
        .status(200)
        .json(new ApiResponse(200, updatedPlaylist, "playlist updated successfully"));
})


export {
    createPlayList,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
}