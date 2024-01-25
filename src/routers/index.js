import checkToAuth from "../middleware/checkToAuth.js";
import auth from "./auth/index.js";
import blog from "./blog/index.js";

export default (app) => {
   const setRoutes = (routes) => {
      routes.map(({ prefix, route, isLogin }) => {
         if (isLogin) app.use(prefix, checkToAuth, route());
         else app.use(prefix, route());
      });
   };
   setRoutes([auth, blog]);
};
