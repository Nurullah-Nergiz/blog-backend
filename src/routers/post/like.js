import { Router } from "express";
import likesSchema from "../../schema/likes.js";
// import {} from '../../validations/likes.js';

const route = () => {
   /** @type {import('express').Router} */
   const app = new Router();

   app.post("/:id/like", (req, res) => {
      if (req.checkUserAuthentication()) {
         const filter = { postId: req.params.id, author: req.user._id };
         likesSchema
            .findOne(filter)
            .then((likeData) => {
               if (likeData) {
                  res.status(409).json(likeData);
               } else {
                  const newLike = new likesSchema(filter);
                  newLike
                     .save()
                     .then((like) => {
                        res.status(201).json(like);
                     })
                     .catch((err) => {
                        res.status(500).json(err);
                     });
               }
            })
            .catch((err) => {
               res.status(500).json(err);
            });
      }
   });

   app.post("/:id/unlike", (req, res) => {
      if (req.checkUserAuthentication()) {
         const filter = { postId: req.params.id, author: req.user._id };
         likesSchema
            .findOne(filter)
            .then((likeData) => {
               if (!likeData) {
                  res.status(204).json(likeData);
               } else {
                  likesSchema
                     .deleteOne(filter)
                     .then((like) => {
                        res.status(202).json(like);
                     })
                     .catch((err) => {
                        res.status(500).json(err);
                     });
               }
            })
            .catch((err) => {
               res.status(500).json(err);
            });
      }
   });

   return app;
};

export default {
   prefix: "/posts/",
   isLogin: true,
   route,
};
