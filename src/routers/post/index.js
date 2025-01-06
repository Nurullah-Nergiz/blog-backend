import { Router } from "express";

import PostSchema from "../../schema/post.js";
import { Types } from "mongoose";
import { validatePageParams } from "../../validations/pages.js";

const route = () => {
   /** @type {import('express').Router} */
   const app = new Router();

   app.get("/", (req, res) => {
      if (req.checkUserAuthentication()) {
         const {
            error,
            value: { page = 0, limit = 10 },
         } = validatePageParams(req.query);

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
            {
               $addFields: {
                  isLiked: {
                     $and: [
                        { $in: [new Types.ObjectId(req.user?._id), "$likes.author"] },
                        // {
                        //    $eq: ["$postId", "$_id"],
                        // },
                     ],
                  },
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
                  isLiked: 1,
                  comments: 1,
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
               res.status(200).json({ limit, page: page + 1, post });
            })
            .catch((err) => {
               console.log("post get slug error", err);
               res.status(500).json(err);
            });
      }
   });

   app.get("/:slug", (req, res) => {
      if (req.checkUserAuthentication()) {
         PostSchema.aggregate([
            { $match: { _id: new Types.ObjectId(req.params.slug.split("-").at(-1)) } },
            {
               $lookup: {
                  from: "comments",
                  localField: "_id",
                  foreignField: "postId",
                  pipeline: [
                     { $limit: 10 },
                     {
                        $sort: { createdAt: -1 },
                     },
                  ],
                  as: "comments",
               },
            },
            {
               $lookup: {
                  from: "likes", // Assuming your Likes model is in the same database
                  localField: "_id",
                  foreignField: "postId",
                  as: "likes",
               },
            },
            {
               $lookup: {
                  from: "bookmarks", // Assuming your Likes model is in the same database
                  localField: "_id",
                  foreignField: "postId",
                  as: "bookmarks",
               },
            },
            {
               $addFields: {
                  isLiked: {
                     $in: [new Types.ObjectId(req.user?._id), "$likes.author"],
                  },
                  isBookmarked: {
                     $in: [new Types.ObjectId(req.user?._id), "$bookmarks.userId"],
                  },
               },
            },
            {
               $project: {
                  likes: 0,
                  bookmarks: 0,
               },
            },
         ])
            .then((post) => {
               if (post.length === 0) {
                  return res.status(404).json({ message: "Post not found" });
               }
               res.status(200).json(post[0]);
            })
            .catch((err) => {
               console.log("post get slug error", err);
               res.status(500).json(err);
            });
         // res.json("as")
      }
   });

   app.post("/", (req, res) => {
      if (req.checkUserAuthentication()) {
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
      }
   });

   return app;
};

export default {
   prefix: "/posts/",
   isLogin: true,
   route,
};
