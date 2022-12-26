// library that provides full support to web token
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authMiddleware = async (req, res, next) => {
  // we access the Autorization dictionary send on headers
  const authHeader = req.headers.authorization;

  // check if the authorization header exists and if it starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer"))
    throw new UnauthenticatedError("No token provided");

  // only get the token (remove 'Bearer' part)
  const token = authHeader.split(" ")[1];
  try {
    // after we confirm that an auth token is passed
    // we MUST verify that it's real with jwt's method "verify"
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    throw new UnauthenticatedError("Unauthorized token");
  }
};

module.exports = authMiddleware;
