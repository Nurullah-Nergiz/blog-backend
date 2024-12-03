import { Schema, Types, model } from "mongoose";

export default model(
   "Bookmarks",
   new Schema(
      {
         userId: { type: Types.ObjectId, ref: "User", required: true },
         postId: { type: Types.ObjectId, ref: "Post", required: true },
      },
      { id: false, versionKey: false, timestamps: true }
   )
);
