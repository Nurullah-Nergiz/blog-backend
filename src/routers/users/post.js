import { Router } from "express";
import PostSchema from "../../schema/post.js";
// import User from "../../models/user.js";
// import {} from "../../validations/users.js";

const route = () => {
   const app = new Router();

   app.get("/:userName/posts", (req, res) => {
      const { userName } = req.params;

      PostSchema.find()
         .populate([
            {
               path: "author",
               match: { userName },
               model: "User",
            },
         ])
         .then((post) => {
            if (post.length === 0) {
               return res.status(404).json({ message: "Post not found" });
            }
            res.json(post);
         })
         .catch((err) => res.status(500).json(err));
   });

   return app;
};

export default {
   prefix: "/users/",
   isLogin: false,
   route,
};
