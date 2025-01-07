import { Router } from "express";
import UserSchema from "../../schema/user.js";
import { validateToRegister } from "../../validations/auth.js";
import { passToHash, setJWT } from "../../utils/hash.js";
import status from "http-status";

const route = () => {
   const router = Router();

   router.post("/login", (req, res) => {
      const { email, password } = req.body;

      UserSchema.findOne({ email })
         .select("+password")
         .then((user) => {
            if (!user) {
               res.status(status.NOT_FOUND).json({ message: "User not found" });
            } else if (user.password == passToHash(password)) {
               user.password = undefined;
               res.status(status.OK).json({
                  user,
                  authentication: setJWT(user),
               });
            } else {
               res.status(status.BAD_REQUEST).json({ message: "password" });
            }
         });
   });

   router.post("/register", (req, res) => {
      // validations data
      const { error, value } = validateToRegister(req.body);

      // password hashing
      value.password = passToHash(value.password);

      if (!error) {
         // user added to database
         const user = new UserSchema(value);
         user
            .save()
            .then((user) =>
               res.status(status.CREATED).json({
                  user,
                  authentication: setJWT(user),
               })
            )
            .catch((err) => res.status(500).json({ message: err }));
      } else {
         // validations error
         res.status(status.BAD_REQUEST).json({ message: error });
      }
   });

   return router;
};

export default {
   prefix: "/auth/",
   route,
};
