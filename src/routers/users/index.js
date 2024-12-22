import { Router } from "express";
import usersSchema from "../../schema/user.js";
import { Types } from "mongoose";
// import {} from '../../validations/users.js';

const route = () => {
   /** @type {import('express').Router} */
   const app = new Router();

   app.get("/", (req, res) => {
      usersSchema
         .find()
         .then((users) => {
            res.status(200).json(users);
         })
         .catch((err) => {
            res.status(500).json(err);
         });
   });

   app.get("/:userName", (req, res) => {
      usersSchema
         .aggregate([
            {
               $match: {
                  userName: req.params.userName,
               },
            },
            {
               $lookup: {
                  from: "followers",
                  localField: "_id",
                  foreignField: "userId",
                  as: "followers",
               },
            },
            {
               $addFields: {
                  isFollowing: {
                     $in: [new Types.ObjectId(req.user?._id), "$followers.followerId"],
                  },
                  followersCount: { $size: "$followers" },
                  followingCount: {
                     $size: {
                        $filter: {
                           input: "$followers",
                           as: "follower",
                           cond: { $eq: ["$$follower.followerId", new Types.ObjectId(req.user?._id)] },
                        },
                     },
                  },
               },
            },
            {
               $project: {
                  password: 0,
                  followers: 0,
                  __v: 0,
               },
            },
         ])
         .then((user) => {
            if (user.length !== 0) res.status(200).json(user[0]);
            else res.status(404).json(user);
         })
         .catch((err) => {
            console.log("err:", err);
            res.status(500).json(err);
         });
   });

   app.post("/", (req, res) => {
      res.status(201).json("users Page Post Method");
   });

   return app;
};

export default {
   prefix: "/users/",
   checkAuth: true,
   route,
};
