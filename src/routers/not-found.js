import { Router } from "express";

const route = () => {
   /** @type {import('express').Router} */
   const app = new Router();

   app.all("*", (req, res) => {
      res.status(200).json({
         url: req.url,
         message: "Page Not Found",
         method: req.method,
         status: 404,
      });
   });

   return app;
};

export default {
   prefix: "",
   isLogin: true,
   route,
};
