import { Router } from "express";

import PostSchema from "../../schema/post.js";
import slugify from "slugify";
// import {} from "../../validations/post.js";

const route = () => {
   const app = new Router();

   app.get("/:slug", (req, res) => {
      PostSchema.findOne({
         _id: req.params.slug.split("-").at(-1),
      })
         // .populate([
         //    {
         //       path: "author",
         //       model: "User",
         //    },
         // ])
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
         .then((p) => {
            console.log("post", p);
            res.status(201).json(p);
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
