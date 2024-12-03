import { Schema, Types, model } from "mongoose";

export default model(
   "Comments",
   new Schema(
      {
         text: { type: String, required: true, required: true },
         userId: { type: Types.ObjectId, ref: "User", required: true },
         postId: { type: Types.ObjectId, ref: "Post", required: true },
         replies: { type: Types.ObjectId, ref: "Comment" },
      },
      {
         timestamps: true,
      }
   )
);
