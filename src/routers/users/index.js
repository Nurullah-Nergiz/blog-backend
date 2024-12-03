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
               $facet: {
                  followerCount: [
                     { $group: { _id: "$follower.user", count: { $sum: 1 } } },
                     // {$rename: {count: "followerCount"}}
                  ],
                  followedCount: [
                     { $group: { _id: "$follower.follower", count: { $sum: 1 } } },
                     // {$rename: {count: "followerCount"}}
                  
                  ],
               },
            },
         ])
         .then((user) => {
            if (user) res.status(200).json(user);
            else res.status(404).json(user);
         })
         .catch((err) => {
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
