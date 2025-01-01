import checkUserLogin from "../middleware/verifyUserLogin.js";

export default (app, routes) => {
   routes.map(({ prefix, route }) => {
      app.use(prefix, checkUserLogin, route());
      // app.use(prefix, route());
   });
};
