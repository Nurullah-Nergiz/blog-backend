import { Schema, Types, model } from "mongoose";

export default model(
   "Comment",
   new Schema({
      text: { type: String, required: true },
      author: { type: Types.ObjectId, ref: "User", required: true },
      blog: { type: Types.ObjectId, ref: "blog" },
      replies: { type: Types.ObjectId, ref: "comment", default: "" },
   })
);
