import { Router } from "express";
import usersSchema from "../../schema/user.js";
// import {} from '../../validations/users.js';

const route = () => {
   const app = new Router();

   app.get("/:userName", (req, res) => {
      usersSchema
         .findOne({ userName: req.params.userName })
         .then((user) => {
            if (user) res.status(200).json(user);
            else res.status(404).json(user);
         })
         .catch((err) => {
            res.status(500).json(err);
         });
   });

   app.post("/", (req, res) => {
      res.status(201).json("users Page Post Method");
   });

   return app;
};

export default {
   prefix: "/users/",
   checkAuth: true,
   route,
};
