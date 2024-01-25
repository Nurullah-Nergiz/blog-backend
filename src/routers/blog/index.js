import { Router } from "express";

import blogSchema from "../../schema/blog.js";
// import {} from '../../validations/blog.js';

const route = () => {
   const app = new Router();

   app.get("/", (req, res) => {
      res.status(200).json("blog Page Get Method");
   });

   app.post("/", (req, res) => {
      res.status(201).json("blog Page Post Method");
   });

   return app;
};

export default {
   prefix: "/blog/",
   checkAuth: true,
   route,
};
