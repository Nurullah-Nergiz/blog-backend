import validateAuthToken from "../utils/validateAuthToken.js";

export default function (req, res, next) {
   req.checkUserAuthentication = () => {
      const userAuthStatus = validateAuthToken(req.headers["authentication"]);
      if (userAuthStatus === false) {
         res.status(403).json({
            message: "The authToken is not valid",
         });
         return false;
      } else if (userAuthStatus === null) {
         res.status(401).json({
            message: "authToken is required",
         });
         return false;
      } else if (userAuthStatus) {
         req.user = userAuthStatus;
         return true;
      } else {
         return false;
      }
   };
   next();
}
