const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authMiddleware = async (req, res, next) => {
  // access the authentication string through the request header
  const authHeader = req.headers.authorization;

  // throw error if doesn't exist or bad formatted (doesn't start with Bearer)
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("No token provided");
  }
  // get only the token and verify
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Unautorized user");
  }
};

module.exports = {
  authMiddleware,
};
