import express from "express";
import dotenv from "dotenv";
import Mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";

import routes from "./routers/index.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
   cors({
      origin: "*",
      "Content-Type": "application/json",
   })
);

app.get("/", (req, res) => {
   res.send(process.env.npm_package_name);
});

app.listen(process.env.PORT, (err) => {
   if (err) console.log("App Error", err);

   routes(app);
   console.log(`app listen ${process.env.PORT}`);

   Mongoose.connect(process.env.mongodbUrl)
      .then(() => console.log(`mongodb connected`))
      .catch((error) => console.log(error));

   //    app._router.stack.forEach(function (r) {
   //       if (r.route?.path) console.log(r.route?.path);
   //    });
});
