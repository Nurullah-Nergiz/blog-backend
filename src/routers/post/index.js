import { Router } from "express";

import PostSchema from "../../schema/post.js";
import { Types } from "mongoose";
import comment from "../../schema/comment.js";
// import {} from "../../validations/post.js";

const route = () => {
   /** @type {import('express').Router} */
   const app = new Router();

   app.get("/", (req, res) => {
      const { page = 0 } = req.query;
      const limit = 10;

      PostSchema.aggregate([
         // {
         // $match: {
         // _id: new Types.ObjectId(req.params.slug.split("-").at(-1))
         // score:
         // },
         // },
         // { $count: "totalDocs" },
         // {
         //    $group: { _id: null, pageCount: { $sum: 1 } },
         // },
         {
            $lookup: {
               from: "likes", // Assuming your Likes model is in the same database
               localField: "likes",
               foreignField: "_id",
               as: "likes",
            },
         },
         { $skip: limit * (parseInt(page) + 1) },
         { $limit: limit },
         { $sort: { createdAt: -1 } },
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
               likeCount: { $size: "$likes" },
               comments:1,
               // totalDocs: 1,
               // pageCount: {
               //    $ceil: {
               //       $divide: ["$totalDocs", limit],
               //    },
               // },
            },
         },
      ])
         .then((post) => {
            res.status(200).json({limit, page: page + 1, post});
         })
         .catch((err) => {
            console.log("post get slug error", err);
            res.status(500).json(err);
         });
   });

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
            $lookup: {
               from: "comments", // Assuming your Likes model is in the same database
               localField: "_id",
               foreignField: "postId",
               as: "comments",
               pipeline: [
                  {
                     $sort: { createdAt: -1 },
                  },
                  { $limit: 10 },
               ],
            },
         },
         {
            $addFields: {
               isLiked: {
                  $in: [new Types.ObjectId(req.user?._id), "$likes.userId"],
               },
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
               likeCount: { $size: "$likes" },
               isLiked: 1,
            },
         },
      ])
         .then((post) => {
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
