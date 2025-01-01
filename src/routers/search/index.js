import { Router } from "express";
import UserSchema from "../../schema/user.js";
import PostSchema from "../../schema/post.js";

const route = () => {
   const app = new Router();

   app.get("/", async (req, res) => {
      const { q:query } = req.query;

      if (!query) {
         return res.status(400).json({ error: "Query parameter is required" });
      }

      try {
         const users = await UserSchema.find({ username: { $regex: query, $options: "i" } });
         const posts = await PostSchema.find({ title: { $regex: query, $options: "i" } });

         res.json({ users, posts });
      } catch (error) {
         res.status(500).json({ error: "An error occurred while searching" });
      }
   });

   return app;
};

export default {
   prefix: "/search/",
   checkAuth: true,
   route,
};
