import { Router } from "express";

const route = () => {
   /** @type {import('express').Router} */
   const app = new Router();

   app.all("*", (req, res) => {
      res.status(200).json({
         message: "EndPoint Not Found",
         url: req.url,
         method: req.method,
         status: 404,
      });
   });

   return app;
};

export default {
   prefix: "",
   route,
};
