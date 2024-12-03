import { Router } from "express";
import followersSchema from "../../schema/followers.js";
// import {} from '../../validations/users.js';

const route = () => {
   /** @type {import('express').Router} */
   const app = new Router();

   app.get("/:id/followers", (req, res) => {
      followersSchema
         .find({ user: req.params.id }, { follower: 1, _id: 0 })
         .populate({
            path: "follower",
            model: "User",
         })
         .then((result) => {
            res.json(result);
         });
   });
   app.get("/:id/following", (req, res) => {
    followersSchema
       .find({ follower: req.params.id })
       .populate({
          path: "user",
          model: "User",
       })
       .then((result) => {
          res.json(result);
       });
 });

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