import initializeRoutes from "../utils/initializeRoutes.js";
import notFound from "./not-found.js";

import auth from "./auth/index.js";
import authPasswords from "./auth/password.js";

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
   initializeRoutes(app, [
      auth,
      authPasswords,
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
      notFound,
   ]);
};
