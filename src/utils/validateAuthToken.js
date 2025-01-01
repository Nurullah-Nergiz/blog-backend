import jwt from "jsonwebtoken";

const validateAuthToken = (token = "") => {
   if (token) {
      try {
         const decoded = jwt.verify(token, process.env.jwtSalt);
         if (decoded) return decoded.user;
         else return false;
      } catch (error) {
         return false;
      }
   } else return null;
};

export default validateAuthToken;
