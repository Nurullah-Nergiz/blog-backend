import { Schema, Types, model } from "mongoose";

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */
export default model(
   "Post",
   new Schema(
      {
         title: { type: String, required: true },
         slug: { type: String, required: true },
         description: { type: String, required: true },
         thumbnail: { type: String },
         content: { type: String, required: true },
         author: { type: Types.ObjectId, ref: "User", required: true },
         // categories: [{ type: Schema.Types.Object, ref: "" }],
         tags: [{ type: String, validate: [(val) => val.length <= 10] }],
         published: { type: Date, default: Date.now },
      },
      {
         timestamps: true,
      }
   )
);
