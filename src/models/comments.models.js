import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    videos: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    externalVideoId: {
      type: String, // For storing external IDs like 'nFgsBxw-zWQ'
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
