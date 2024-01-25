import jwt from "jsonwebtoken";

const checkToAuth = (req, res, next) => {
   if (req.headers["authentication"]) {
      console.log('asd');
      const decoded = jwt.verify(req.headers["authentication"], process.env.jwtSalt);
      if (decoded) {
         req.user = decoded.user;
         next();
      } else {
         res.status(403).json({
				message: "Bu işlemi yapabilmek için giriş yapmanız gerekiyor.",
			});
      }
   } else {
      res.status(403).json({
         message: "Bu işlemi yapabilmek için giriş yapmanız gerekiyor.",
      });
   }
};

export default checkToAuth;
