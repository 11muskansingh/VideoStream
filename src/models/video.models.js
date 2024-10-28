import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      //cloudinary url
      type: String,
      required: true,
    },
    thumbnail: {
      //cloudinary url
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
  { versionKey: false }
);

export const Video = mongoose.model("Video", videoSchema);
