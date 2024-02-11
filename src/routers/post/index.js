import { Router } from "express";

import PostSchema from "../../schema/post.js";
import slugify from "slugify";
// import {} from "../../validations/post.js";

const route = () => {
   const app = new Router();

   app.get("/:slug", (req, res) => {
      PostSchema.findOne({
         slug: req.params.slug,
      })
         .populate([
            {
               path: "author",
               model: "User",
            },
         ])
         .then((post) => {
            res.status(200).json(post);
         })
         .catch((err) => {
            console.log("post get slug error", err);
            res.status(500).send(err);
         });
   });

   app.post("/", (req, res) => {
      // res.json(slugify(req.body.title,{lower:true}))
      const post = new PostSchema(req.body);
      post
         .save()
         .then((newPost) => {
            PostSchema.findOneAndUpdate(
               { _id: newPost._id },
               { slug: slugify(newPost.title + "-" + newPost._id, { lower: true }) }
            )
               .then((updatedPost) => {
                  console.log("post", updatedPost);
                  res.status(201).json(updatedPost);
               })
               .catch((err) => res.status(500).send(err));
         })
         .catch((err) => {
            console.log("post Add error", err);
            res.status(500).send(err);
         });
   });

   return app;
};

export default {
   prefix: "/post/",
   checkAuth: true,
   route,
};
