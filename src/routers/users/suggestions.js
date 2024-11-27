import { Router } from "express";
import usersSchema from "../../schema/users.js";
// import {} from '../../validations/users.js';

const route = () => {
   const app = new Router();

   app.get("/", (req, res) => {
      res.status(200).json("users Page Get Method");
   });


   return app;
};

export default {
   prefix: "/users/suggestions",
   checkAuth: true,
   route,
};
