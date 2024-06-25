import mongoose from "mongoose";

const subscription = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
export const SubscriptionSchema = mongoose.model(
  "SubscriptionSchema",
  subscription
);
