import { Router } from "express";

import PostSchema from "../../schema/post.js";
// import {} from "../../validations/post.js";

const route = () => {
   const app = new Router();

   app.get("/:id", (req, res) => {
      PostSchema.findOne({
         _id: req.params.id,
      })
         .populate([
            {
               path: "author",
               model: "User",
            },
         ])
         .then((post) => {
            res.status(200).json(post);
         });
   });

   app.post("/", (req, res) => {
      const post = new PostSchema(req.body);
      post
         .save()
         .then((user) => {
            console.log("user", user);
            res.status(201).json(user);
         })
         .catch((err) => {
            res.status(500).json(err);
         });
   });

   return app;
};

export default {
   prefix: "/post/",
   checkAuth: true,
   route,
};
