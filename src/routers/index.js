import checkToAuth from "../middleware/checkToAuth.js";
import auth from "./auth/index.js";

import post from "./post/index.js";
import postLike from "./post/like.js";
import comments from "./comments/index.js";
import bookmarks from "./users/bookmarks.js";

import users from "./users/index.js";
import usersPost from "./users/post.js";
import usersFollow from "./users/follow.js";

import search from "./search/index.js";
import explore from "./explore/index.js";

export default (app) => {
   const setRoutes = (routes) => {
      routes.map(({ prefix, route, isLogin }) => {
         if (isLogin) app.use(prefix, checkToAuth, route());
         else app.use(prefix, route());
      });
   };
   setRoutes([auth, post, postLike, users, usersPost, usersFollow, comments, search, explore, bookmarks]);
};
