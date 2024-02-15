import { Schema, Types, model } from "mongoose";
import slugify from "slugify";
import likeSchema from "./likes.js";

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */
const postSchema = Schema(
   {
      title: { type: String, required: true },
      description: { type: String, required: true },
      thumbnail: { type: String },
      content: { type: String, required: true },
      author: { type: Types.ObjectId, ref: "User", required: true },
      // categories: [{ type: Schema.Types.Object, ref: "" }],
      tags: [{ type: String, validate: [(val) => val.length <= 10] }],
      slugs: {
         type: String,
         get: function () {
            return slugify(this.title + "-" + this._id, { lower: true });
         },
      },
      published: { type: Date, default: Date.now },
      // likes: {
      //    count: {
      //       type: Number,
      //       default: 0,
      //       get: async function () {
      //          return await likeSchema.findOne({
      //             _id: this._id,
      //          });
      //       },
      //    },
      // },
   },
   {
      timestamps: true,
      toJSON: { getters: true },
   }
);

export default model("Post", postSchema);
