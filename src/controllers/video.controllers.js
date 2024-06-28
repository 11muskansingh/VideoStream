import mongoose from "mongoose";
import { User } from "../models/users.models.js";
import { Video }  from "../models/video.models.js"; 
import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/Apierrors.js";
import { ApiResponse } from "../utils/Apiresponses.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { getVideoDurationInSeconds } from "get-video-duration"


const publishVideo = asynchandler(async(req,res)=>{
  //steps to publish a video in our channel
  //get the title and description from the user
  //check if both fields are given
  //upload the video and the thumbnail image on our server
  //upload it on cloudinary
  //recheck if they are uploaded or not
  //create the video object - create entry in db
  //check for video creation

  const { title , description} = req.body;
  if(!title || !description)
    throw new ApiError(400,"Both the title and the description fields are required");
   
  const videoLocalPath = await req.files?.videoFile[0]?.path;
  if(!videoLocalPath)
    throw new ApiError(400,"Video is Required to upload on server")
   
  const videoFile = await uploadonCloudinary(videoLocalPath);
  if(!videoFile)
    throw new ApiError(400,"Video is Required to upload on cloudinary")

  const thumbnailLocalPath = await req.files?.thumbnail[0]?.path;
    if(!thumbnailLocalPath)
    throw new ApiError(400,"Thumbnail is Required to upload")
   
    const thumbnail=await uploadonCloudinary(thumbnailLocalPath);
    if(!thumbnail)
        throw new ApiError(400,"Thumbnail is Required to upload")
      
    const duration= await getVideoDurationInSeconds(videoLocalPath);
    if(!duration)
      throw new ApiError(500, 'Failed to get video duration');
  
  const newVideo = await Video.create({
      videoFile:videoFile.url,
      title,
      description,
      thumbnail:thumbnail.url,
      owner:req.user?._id,
      duration,
  })

  if(!newVideo)
    throw new ApiError(500,"Not able to Upload the video");
  console.log(newVideo);

  return res
  .status(200)
  .json(
    new ApiResponse(200,newVideo,"Video Uploaded Successfully")
  )
});

const getVideoById = asynchandler(async (req,res)=>{
     const {videoId} = req.params;
     const video=await Video.findById(videoId);

     if(!video)
        throw new ApiError(400,"Give Correct videoId");

     return res
     .status(200)
     .json(
        new ApiResponse(200,video,"Video Fetched SuccessFully")
     )
})


const updateVideoDetails = asynchandler(async(req,res)=>{
  //take videoid from the user using url
  //update the tile, description, and thumbnail of the video.

  const { videoId }=req.params;
  if(!videoId)
    throw new ApiError(400 , "The video doesnot exist");

   const{ title , description}=req.body;
     
   const updateFields = {};
   if(title)
    updateFields.title=title;
   if(description)
    updateFields.description=description;
   
   const thumbnailLocalPath = await req.file?.path;
   if(!thumbnailLocalPath)
    throw new ApiError(400,"Thumbnail is Required to change");

   const thumbnail =await uploadonCloudinary(thumbnailLocalPath);
   if(!thumbnail)
    throw new ApiError(400,"Thumbnail is Required to upload on cloudinary");




  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set :{
        ...updateFields,
        thumbnail:thumbnail?.url,
      }
    },
    {
      new:true,
    }
  )

  return res
  .status(200)
  .json(new ApiResponse(200, video, "Details Updated Successfully"));
});

const deleteVideo = asynchandler( async (req,res)=>{
       const { videoId } =req.params
       if(!videoId)
        throw new ApiError(400 , "The video doesnot exist");

      await Video.findByIdAndDelete(videoId);

      return res
      .status(200)
      .json(
        new ApiResponse(200,"Video Deleted Successfully")
      )
});

 const togglePublishStatus = asynchandler(async (req,res)=>{
    const { videoId } =req.params;
      //const video=await Video.findById(videoId);
    if(!videoId)
      throw new ApiError(400,"VideoId is required");

    const video =await Video.findByIdAndUpdate(
      videoId,
      {
        $set : {
          isPublished : !ispublished,
        }
      },
      {
        new :true,
      }
      )
      await video.save();
      return res
      .status(200)
      .json(
        new ApiResponse(200,video,"Published status toggeled successfullly"));
 });

 const getAllVideos =asynchandler(async(req,res)=>{
  //yet to be completed
 });



export {
    publishVideo,
    getVideoById,
    updateVideoDetails,
     deleteVideo, 
     togglePublishStatus, 
     getAllVideos,
}