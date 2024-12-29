import checkToAuth from "../middleware/checkToAuth.js";
import auth from "./auth/index.js";

import post from "./post/index.js";
import postLike from "./post/like.js";
import comments from "./comments/index.js";
import bookmarks from "./bookmarks/index.js";

import users from "./users/index.js";
import usersPost from "./users/post.js";
import usersFollowPost from "./users/follows/post.js";
import usersFollowGet from "./users/follows/get.js";

import search from "./search/index.js";
import explorePosts from "./explore/posts.js";
import exploreUsers from "./explore/users.js";

export default (app) => {
   const setRoutes = (routes) => {
      routes.map(({ prefix, route, isLogin = false }) => {
         if (isLogin === true) app.use(prefix, checkToAuth, route());
         else app.use(prefix, route());
      });
   };
   setRoutes([
      auth,
      post,
      postLike,
      users,
      usersPost,
      usersFollowPost,
      usersFollowGet,
      comments,
      search,
      explorePosts,
      exploreUsers,
      bookmarks,
   ]);
};
