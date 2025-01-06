import { Router } from "express";
import postSchema from "../../schema/post.js";
import { Types } from "mongoose";
import { validatePageParams } from "../../validations/pages.js";

const route = () => {
   /** @type {import('express').Router} */
   const app = new Router();

   app.get("/", (req, res) => {
      if (req.checkUserAuthentication()) {
         const {
            error,
            value: { page = 0, limit = 12 },
         } = validatePageParams(req.query);
         if (!error) {
            postSchema
               .aggregate([
                  {
                     $match: {
                        $and: [{ author: { $ne: req.user?._id } }],
                     },
                  },
                  {
                     $lookup: {
                        from: "comments",
                        localField: "_id",
                        foreignField: "postId",
                        pipeline: [
                           {
                              $lookup: {
                                 from: "users",
                                 localField: "userId",
                                 foreignField: "_id",
                                 pipeline: [{ $project: { password: 0 } }],
                                 as: "author",
                              },
                           },

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
                     $lookup: {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        pipeline: [{ $project: { password: 0 } }],
                        as: "author",
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
                  { $skip: parseInt(page) * parseInt(limit) },
                  { $limit: parseInt(limit) },
                  { $sort: { publishedDate: -1 } },
               ])
               .then((posts) => {
                  res.status(200).json(posts);
               })
               .catch((err) => {
                  console.log("err:", err);
                  res.status(500).json(err);
               });
         } else {
            res.status(400).json(error);
         }
      }
   });

   return app;
};

export default {
   prefix: "/explore/",
   isLogin: true,
   route,
};
