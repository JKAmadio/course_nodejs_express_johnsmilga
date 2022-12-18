const { CustomAPIError } = require("../errors/custom-error");

// we can stablish a custom error message
// mais infos: https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
const errorHandler = (err, req, res, next) => {
  // this condition is important because we must garantee that
  // err will have the statusCode property
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ msg: "Somethig went wrong. Please try again later" });
};

module.exports = errorHandler;
