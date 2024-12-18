import { Schema, model } from "mongoose";

export default model(
   "User",
   new Schema(
      {
         name: { type: String, required: "name is required" },
         userName: { type: String, unique: true, required: "userName is required" },
         email: {
            type: String,
            required: "Email address is required",
            unique: true,
         },
         password: {
            type: String,
            min: 8,
            required: "password is required",
            select: false,
         },
         bio: {
            type: String,
            default: "",
         },
         profilePicture: {
            type: String,
            default: "",
         },
         coverPicture: {
            type: String,
            default: "",
         },
         website: {
            type: String,
            default: "",
         },
         location: {
            type: String,
            default: "",
         },
         active: { type: Boolean, default: true },
      },
      {
         timestamps: true,
         toJSON: { Virtual: true, getters: true },
      }
   )
);
