import { Router } from "express";
import bookmarkSchema from "../../schema/bookmarks.js";
// import {} from '../../validations/users.js';

const route = () => {
   /** @type {import('express').Router} */
   const app = new Router();

   app.get("/", (req, res) => {
      res.status(200).json("users Page Get Method");
   });

   app.post("/:userId/bookmarks/:postId", (req, res) => {
      const w = { userId: req.params.userId, postId: req.params.postId };
      bookmarkSchema
         .find(w)
         .then((bookmark) => {
            if (bookmark) {
               res.send("kayıtlı");
            } else {
               const bk = new bookmarkSchema(w);
               bk.save()
                  .then((data) => {
                     res.send(data);
                     console.log("data:", data);
                  })
                  .catch((err) => {
                     console.log("err:", err);
                     res.status(500).json(err);
                  });
            }
         })
         .catch((err) => {
            console.log("err:", err);
            res.status(500).json(err);
         });
   });

   return app;
};

export default {
   prefix: "/users/",
   checkAuth: true,
   route,
};
