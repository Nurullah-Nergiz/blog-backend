import { Schema, Types, model } from "mongoose";
import slugify from "slugify";

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */
const postSchema = Schema(
   {
      title: { type: String, required: true, },
      description: { type: String, required: true },
      thumbnail: { type: String },
      content: { type: String, required: true },
      author: { type: Types.ObjectId, ref: "User", required: true },
      // categories: [{ type: Schema.Types.Object, ref: "" }],
      tags: [{ type: String, validate: [(val) => val.length <= 10] }],
      slugs: {
         type:String,
         get: function () {
            return slugify( this.title + "-" + this._id, { lower: true });
         },
      },
      published: { type: Date, default: Date.now },
   },
   {
      timestamps: true,
      toJSON: {getters: true}
   }
);

export default model("Post", postSchema);
