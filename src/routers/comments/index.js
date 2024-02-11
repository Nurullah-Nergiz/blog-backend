import { Router } from "express";
import commentSchema from "../../schema/comment.js";
// import {} from '../../validations/commnet.js';

const route = () => {
   const app = new Router();

   app.get("/", (req, res) => {
      res.status(200).json("commnet Page Get Method");
   });

   app.post("/:id", (req, res) => {
      console.log(req.body);
      const comments = new commentSchema(req.body);
      comments
         .save()
         .then((user) => {
            console.log("user", user);
            res.status(201).json(user);
         })
         .catch((err) => {
            res.status(500).json([req.body, err]);
         });
   });

   return app;
};

export default {
   prefix: "/comments/",
   checkAuth: true,
   route,
};
