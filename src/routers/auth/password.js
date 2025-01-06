import { Router } from "express";
import UserSchema from "../../schema/user.js";
import { passToHash } from "../../utils/hash.js";
import { validateToResetPassword } from "../../validations/auth.js";

const route = () => {
   /** @type {import('express').Router} */
   const app = new Router();

   app.post("/reset-password", (req, res) => {
      if (req.checkUserAuthentication()) {
         const data = validateToResetPassword(req.body);
         res.status(200).json({
            message: "Password Changed",
            body: req.body,
            data,
            //    newPass,
            //     oldPass,
            //    err: error
         });
         //     if (!error) {
         // } else {
         //     res.status(400).json({ message: error });
         //     return;
         //  }
         //  UserSchema.findOneAndUpdate({ email: req.user.email }, { password: passToHash(req.body.newPassword) });
         res.status(200).json(req.user);
      }
   });

   app.post("/", (req, res) => {
      res.status(201).json("auth Page Post Method");
   });

   return app;
};

export default {
   prefix: "/auth/",
   route,
};
