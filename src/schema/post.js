import { Schema, Types, VirtualType, model } from "mongoose";
import slugify from "slugify";
import likeSchema from "./likes.js";
import bookmarks from "./bookmarks.js";

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */
const postSchema = Schema(
   {
      content: { type: String, required: true },
      thumbnail: { type: String },
      author: { type: Types.ObjectId, ref: "User", required: true },
      // categories: [{ type: Schema.Types.Object, ref: "" }],
      tags: [{ type: String, validate: [(val) => val.length <= 10] }],
      slugs: {
         type: String,
         get: function () {
            return slugify(this.title + "-" + this._id, { lower: true });
         },
      },
      publishedDate: { type: Date, default: Date.now },
      isPublished: { type: Boolean, default: true },
   },
   {
      timestamps: true,
      toJSON: { Virtual:true, getters: true },
   }
);

export default model("Post", postSchema);
