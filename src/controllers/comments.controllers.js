import mongoose from "mongoose";
import { ApiError } from "../utils/Apierrors.js";
import { asynchandler } from "../utils/asynchandler.js";
import { User } from "../models/users.models.js";
import { ApiResponse } from "../utils/Apiresponses.js";
import { Comment } from "../models/comments.models.js";

const addComment = asynchandler(async (req, res) => {
  // TODO: add a comment to a video
  const { videoId } = req.params;
  const { content } = req.body;

  if (!videoId) throw new ApiError(400, "Video id is required");
  if (!content) throw new ApiError(400, "Content is required");

  const newComment = await Comment.create({
    content: content,
    owner: req.user?._id,
    videos: videoId,
  });
  if (!newComment) throw new ApiError(500, "Not able to comment");

  return res
    .status(200)
    .json(new ApiResponse(200, newComment, "Commented Successfully"));
});

// TODO: update a comment
const updateComment = asynchandler(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId) throw new ApiError(400, "Id is required");

  const { content } = req.body;
  if (!content) throw new ApiError(400, "content  is required to update");

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content: content,
      },
    },
    {
      new: true,
    }
  );

  if (!updateComment) throw new ApiError(500, "Error updating comment");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated Successfully"));
});

// TODO: delete a comment
const deleteComment = asynchandler(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId) throw new ApiError(400, "Id is required");

  await Comment.findByIdAndDelete(commentId);
  return res
    .status(200)
    .json(new ApiResponse(200, "Comment deleted Successfully"));
});

//TODO: get all comments for a video
const getVideoComments = asynchandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
});

export { getVideoComments, addComment, updateComment, deleteComment };
