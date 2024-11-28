import { Schema, Types, model } from "mongoose";

export default model(
   "Likes",
   new Schema(
      {
         postId: { type: Types.ObjectId, ref: "Post", required: true },
         author: { type: Types.ObjectId, ref: "User", required: true },
      },
      {
         versionKey: false,
      }
   )
);
