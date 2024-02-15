import { Router } from "express";

import PostSchema from "../../schema/post.js";
import { Types } from "mongoose";
// import {} from "../../validations/post.js";

const route = () => {
   const app = new Router();

   app.get("/:slug", (req, res) => {
      PostSchema.aggregate([
         { $match: { _id: new Types.ObjectId(req.params.slug.split("-").at(-1)) } },
         {
            $lookup: {
               from: "likes", // Assuming your Likes model is in the same database
               localField: "likes",
               foreignField: "_id",
               as: "likes",
            },
         },
         {
            $project: {
               _id: 1,
               title: 1,
               description: 1,
               thumbnail: 1,
               content: 1,
               author: 1,
               categories: 1,
               tags: 1,
               slugs: 1,
               published: 1,
               likeCount: { $size: "$likes" } ,
            },
         },
      ]).then((post) => {
            res.status(200).json(post);
         })
         .catch((err) => {
            console.log("post get slug error", err);
            res.status(500).json(err);
         });
         // res.json("as")
   });

   app.post("/", (req, res) => {
      // res.json(slugify(req.body.title,{lower:true}))
      const post = new PostSchema(req.body);
      post
         .save()
         .then((p) => {
            console.log("post", p);
            res.status(201).json(p);
         })
         .catch((err) => {
            console.log("post Add error", err);
            res.status(500).send(err);
         });
   });

   return app;
};

export default {
   prefix: "/post/",
   checkAuth: true,
   route,
};
