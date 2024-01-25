import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */
const blogSchema = new Schema(
   {
      title: { type: String, required: true },
      slug: { type: String, required: true },
      content: { type: String, required: true },
      author: { type: Types.ObjectId, ref: "User", required: true },
      categories: [{ type: Schema.Types.Object, ref: "" }],
      tags: [{ type: String }],
      published: { type: Date, default: false },
   },
   {
      timestamps: true,
   }
);

const model = mongoose.model("blog", blogSchema);
export default new model();
