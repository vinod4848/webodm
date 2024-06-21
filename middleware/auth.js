const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const authMiddleware = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    if (token) {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.id);
      req.user = user;
      next();
    } else {
      res.send("Invalid Token");
    }
  } else {
    res.send("you don't have a token to access this route");
  }
};
const isAdmin = async (req, res, next) => {
  const isAdmin = req?.user?.role == "userAdmin";
  if (isAdmin) next();
  else res.send("Not Authozired");
};

module.exports = { authMiddleware, isAdmin };
