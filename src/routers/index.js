import checkToAuth from "../middleware/checkToAuth.js";
import auth from "./auth/index.js";
import comments from "./comments/index.js";
import post from "./post/index.js";
import usersPost from "./users/post.js";
import users from "./users/index.js";
import search from "./search/index.js";

export default (app) => {
   const setRoutes = (routes) => {
      routes.map(({ prefix, route, isLogin }) => {
         if (isLogin) app.use(prefix, checkToAuth, route());
         else app.use(prefix, route());
      });
   };
   setRoutes([auth, post, users, usersPost, comments, search]);
};
