import { Schema, model } from "mongoose";
import slugify from "slugify";

export default model(
   "User",
   new Schema({
      name: { type: String },
      userName: {
         type: String,
         unique: true,
      },
      tags: [
         {
            type: Array,
            default: [],
            validate: {
               validator: (v) => {
                  return v.length <= 5;
               },
               message: "Tags should not be more than 5",
            },
         },
      ],
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
      phoneNumbers: {
         type: Array,
         default: [],
      },

      isVerified: {
         type: Boolean,
         default: false,
         select: false,
      },
      isBlocked: {
         type: Boolean,
         default: false,
         select: false,
      },
      isEmailVerified: {
         type: Boolean,
         default: false,
         select: false,
      },
      isPhoneVerified: {
         type: Boolean,
         default: false,
         select: false,
      },
   })
);
