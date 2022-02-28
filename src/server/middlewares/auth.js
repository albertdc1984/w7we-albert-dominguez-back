const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const headerAuth = req.header("Authorization");
  if (!headerAuth) {
    const error = new Error("You don't have a token");
    next(error);
  } else {
    const token = headerAuth.replace("Bearer ", "");
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      error.code = 404;
      next(error);
    }
  }
};

module.exports = auth;
