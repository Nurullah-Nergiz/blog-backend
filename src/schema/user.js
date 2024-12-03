import { Schema, model } from "mongoose";

export default model(
   "User",
   new Schema(
      {
         firstName: { type: String, required: "firstName is required" },
         lastName: { type: String, required: "lastName is required" },
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
         
         active: { type: Boolean, default: true },
      },
      {
         timestamps: true,
         toJSON: { Virtual:true, getters: true },
      }
   )
);
