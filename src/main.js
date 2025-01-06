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

(async () => {
   try {
      await Mongoose.connect(process.env.mongodbUrl);
      console.clear();
      console.log(`mongodb connected`);
   } catch (error) {
      console.log(error);
   }

   app.listen(process.env.PORT, (err) => {
      routes(app);

      // if (err) console.log("App Error", err);
      console.log(`app listen ${process.env.PORT}`);

      // app._router.stack.forEach(function (r) {
      //    if (r.route?.path) console.log(r.route?.path);
      // });
   });

   app.get("/", (req, res) => {
      res.status(200).json({
         name: process.env.npm_package_name,
         version: process.env.npm_package_version,
         description: process.env.npm_package_description,
      });
   });
})();
