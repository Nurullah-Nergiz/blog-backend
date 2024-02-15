import { Router } from "express";
import likesSchema from "../../schema/likes.js";
// import {} from '../../validations/likes.js';

const route = () => {
   const app = new Router();

   app.get("/", (req, res) => {
      res.status(200).json("likes Page Get Method");
   });

   app.post("/:id", (req, res) => {
      res.status(201).json("likes Page Post Method");
   });

   return app;
};

export default {
   prefix: "/likes/",
   checkAuth: true,
   route,
};
