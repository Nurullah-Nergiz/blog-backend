import { Router } from "express";
import bookmarkSchema from "../../schema/bookmarks.js";
// import {} from '../../validations/users.js';

const route = () => {
   /** @type {import('express').Router} */
   const app = new Router();

   app.get("/", (req, res) => {
      bookmarkSchema
         .find({ userId: req.user._id })
         .populate({ path: "postId", populate: { path: "author" } })
         .then((data) => {
            res.status(200).json(data);
         })
         .catch((err) => {
            console.log("err:", err);
            res.status(500).json(err);
         });
   });

   app.post("/:postId", (req, res) => {
      const filter = { userId: req.user._id, postId: req.params.postId };
      bookmarkSchema
         .findOne(filter)
         .then((bookmark) => {
            if (bookmark) {
               res.status(409).json(bookmark);
            } else {
               const bk = new bookmarkSchema(filter);
               bk.save()
                  .then((data) => {
                     res.status(201).json(data);
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

   app.delete("/:postId", (req, res) => {
      if (req.verifyUserLogin()) {
         const filter = { userId: req.user._id, postId: req.params.postId };
         bookmarkSchema
            .findOne(filter)
            .then((bookmark) => {
               if (!bookmark) {
                  res.status(404).json(filter);
               } else {
                  bookmarkSchema
                     .deleteOne(filter)
                     .then((data) => {
                        res.status(202).json(data);
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
      }
   });

   return app;
};

export default {
   prefix: "/bookmarks/",
   isLogin: true,
   route,
};
