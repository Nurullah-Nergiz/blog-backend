import { Schema, Types, model } from "mongoose";

export default model(
   "Followers",
   new Schema(
      {
         user: { type: Types.ObjectId, ref: "Users" },
         follower: { type: Types.ObjectId, ref: "Users" },
      },
      { id: false }
   )
);
