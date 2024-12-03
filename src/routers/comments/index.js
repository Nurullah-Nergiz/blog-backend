import { Router } from "express";
import commentSchema from "../../schema/comment.js";
// import {} from '../../validations/commnet.js';

const route = () => {
   /** @type {import('express').Router} */
   const app = new Router();

   app.get("/:id", (req, res) => {
      commentSchema
         .find({ postId: req.params.id })
         .populate("userId")
         .populate("replies")
         .then((comments) => {
            res.status(200).json(comments);
         })
         .catch((err) => {
            res.status(500).json(err);
         });
      
      // res.status(200).json("commnet Page Get Method");
   });

   app.post("/:id", (req, res) => {
      console.log(req.body);
      const comments = new commentSchema({ userId: req.user?._id, postId: req.params.id, ...req.body });
      comments
         .save()
         .then((user) => {
            console.log("user", user);
            res.status(201).json(user);
         })
         .catch((err) => {
            console.log(req.user);
            res.status(500).json([req.body, err]);
         });
      // res.status(200).json("user");
   });

   return app;
};

export default {
   prefix: "/comments/",
   isLogin: true,
   route,
};
