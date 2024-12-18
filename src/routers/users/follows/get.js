import { Router } from "express";
import followersSchema from "../../../schema/followers.js";
// import {} from "../../validations/follow.js";

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

   return app;
};

export default {
   prefix: "/users/",
   isLogin: false,
   route,
};
