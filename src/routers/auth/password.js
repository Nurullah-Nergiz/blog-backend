import { Router } from "express";
import UserSchema from "../../schema/user.js";
import { passToHash } from "../../utils/hash.js";
import { validateToResetPassword } from "../../validations/auth.js";

const route = () => {
   /** @type {import('express').Router} */
   const app = new Router();

   app.post("/reset-passwords", (req, res) => {
      if (req.checkUserAuthentication()) {
         const {
            error,
            value: { oldPassword, newPassword },
         } = validateToResetPassword(req.body);
         if (!error) {
            if (oldPassword === newPassword) {
               UserSchema.findByIdAndUpdate(req.user._id, { password: passToHash(newPassword) })
                  .then(() => {
                     res.status(200).json({
                        message: "Password has been updated",
                     });
                  })
                  .catch((err) => {
                     res.status(400).json({
                        message: "Error while updating password",
                        error: err,
                     });
                  });
            } else {
               res.status(400).json({
                  message: "Old password and new password should not be same",
               });
            }
         } else {
            res.status(400).json({
               message: error.details[0].message,
            });
         }
      }
      //  UserSchema.findOneAndUpdate({ email: req.user.email }, { password: passToHash(req.body.newPassword) });
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
