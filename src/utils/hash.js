import { createHmac } from "crypto";
import jwt from "jsonwebtoken";

/**
 *
 * @param {String} pass
 * @returns String
 */
export const passToHash = (pass) => createHmac("sha512", process.env.passwordSalt).update(pass).digest("hex");

/**
 * @param { Object } user
 * @param { String } user.name
 * @param { String } user.userName
 * @param { String } user.email
 * @param { String } user.password
 * @param { Boolean } user.active
 * @returns String
 */
export const setJWT = (user) => {
   user.password = new Date();
   return jwt.sign(
      {
         ...user,
         data: [Math.random().toString(32), new Date()],
      },
      process.env.jwtSalt
   );
};

