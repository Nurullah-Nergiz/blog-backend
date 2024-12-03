import { Router } from "express";
import PostSchema from "../../schema/post.js";
// import {} from "../../validations/users.js";

const route = () => {
   const app = new Router();

   app.get("/:id/posts", (req, res) => {
      PostSchema.find({ author: req.params.id })
         .populate([
            {
               path: "author",
               model: "User",
            },
         ])
         .then((post) => {
            res.json(post);
         })
         .catch((err) => res.json(err));
   });

   return app;
};

export default {
   prefix: "/users/",
   checkAuth: false,
   route,
};
