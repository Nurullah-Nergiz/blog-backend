import { createHmac } from "crypto";
import jwt from "jsonwebtoken";

/**
 *
 * @param {String} pass
 * @returns String
 */
export const passToHash = (pass) => createHmac("sha512", process.env.passwordSalt).update(pass).digest("hex");

/**
 *
 * @param {firstName,lastName,email,password,active} user
 * @returns String
 */
export const setJWT = (user) => {
   user.password = new Date();
   return jwt.sign({ ...user }, process.env.jwtSalt);
};
