import { Router } from "express";
import followersSchema from "../../../schema/followers.js";
// import {} from '../../validations/users.js';

const route = () => {
   /** @type {import('express').Router} */
   const app = new Router();

   

   app.post("/:id/follow", (req, res) => {
      const filter = { user: req.params.id, follower: req.user._id };
      followersSchema.findOne(filter).then((result) => {
         if (result) {
            res.status(400).json("Already Following");
         } else {
            followersSchema.create(filter).then((result) => {
               res.status(201).json("Followed");
            });
         }
      });
   });

   app.post("/:id/unfollow", (req, res) => {
      const filter = { user: req.params.id, follower: req.user._id };
      followersSchema.findOneAndDelete(filter).then((result) => {
         if (result) {
            res.status(200).json("Unfollowed");
         } else {
            res.status(400).json("Not Following");
         }
      });
   });

   return app;
};

export default {
   prefix: "/users/",
   isLogin: true,
   route,
};
