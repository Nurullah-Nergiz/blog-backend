import { Router } from "express";
import UserSchema from "../../schema/user.js";
import PostSchema from "../../schema/post.js";

const route = () => {
   const app = new Router();

   app.get("/", (req, res) => {
      const query = new RegExp(req.query.q ?? "a", "i");

      Promise.all([
         UserSchema.aggregate([
            {
               $match: {
                  $or: [
                     {
                        firstName: {
                           $regex: query,
                           // $options: "i"
                        },
                     },
                     {
                        lastName: {
                           $regex: query,
                           // $options: "i"
                        },
                     },
                     {
                        userName: {
                           $regex: query,
                           // $options: "i"
                        },
                     },
                     {
                        email: {
                           $regex: query,
                           // $options: "i"
                        },
                     },
                  ],
               },
            },
            {
               $limit: 6, // İki gönderiyle sınırla
            },
         ]),
         PostSchema.aggregate([
            {
               $lookup: {
                  from: "users", // 'users' koleksiyonundan veri çekiyoruz
                  localField: "author",
                  foreignField: "_id",
                  as: "author",
               },
            },
            {
               $unwind: "$author", // Yazar bilgisini düzeltme
            },
            {
               $project: {
                  title: 1,
                  content: 1,
                  author: {
                     firstName: "$author.firstName",
                     lastName: "$author.lastName",
                     username: "$author.userName",
                     email: "$author.email",
                  },
               },
            },
            {
               $match: {
                  $or: [
                     {
                        title: {
                           $regex: query,
                           // $options: "i"
                        },
                     },
                     {
                        description: {
                           $regex: query,
                           // $options: "i"
                        },
                     },
                     {
                        content: {
                           $regex: query,
                           // $options: "i"
                        },
                     },
                     {
                        "author.firstName": {
                           $regex: query,
                           // $options: "i"
                        },
                     },
                     {
                        "author.lastName": {
                           $regex: query,
                           // $options: "i"
                        },
                     },
                     {
                        "author.userName": {
                           $regex: query,
                           // $options: "i"
                        },
                     },
                     {
                        "author.email": {
                           $regex: query,
                           // $options: "i"
                        },
                     },
                  ],
               },
            },
            {
               $limit: 6, // İki gönderiyle sınırla
            },
         ]),
      ])
         .then(([users, posts]) => {
            res.status(200).json({ users, posts });
         })
         .catch((err) => {
            console.clear();
            console.log(err);
            res.status(500).json(["err", err]);
         });
   });

   return app;
};

export default {
   prefix: "/search/",
   checkAuth: true,
   route,
};
