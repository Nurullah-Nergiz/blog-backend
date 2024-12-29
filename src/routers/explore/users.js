import { Router } from "express";
import userSchema from "../../schema/user.js";
import followSchema from "../../schema/followers.js";
import { Types } from "mongoose";
// import {} from '../../validations/explore.js';

const route = () => {
   /** @type {import('express').Router} */
   const app = new Router();

   app.get("/", async (req, res) => {
      console.clear();
      // console.log("req.user._id:", req.user._id);

      const following = await followSchema.find(
         { user: req.user._id },
         {
            follower: 1,
            _id: 0,
            // users: { $push: "$follower" }
         }
      );
      const followingIds = following.map((f) => f.follower);
      followingIds.push(new Types.ObjectId(req.user?._id));
      // console.log("followingIds:", followingIds);

      userSchema
         .aggregate([
            {
               $match: {
                  _id: {
                     $not: { $in: followingIds },
                  },
               },
            },
            {
               $project: {
                  _id: 1,
                  name: 1,
                  username: 1,
                  profilePic: 1,
               },
            },
            {
               $limit: 5,
            },
            {
               $sort: { createdAt: -1 },
            },
         ])
         .then((posts) => {
            res.status(200).json(posts);
         })
         .catch((err) => {
            console.log("err:", err);
            res.status(500).json(err);
         });
   });

   return app;
};

export default {
   prefix: "/explore/users",
   route,
};
