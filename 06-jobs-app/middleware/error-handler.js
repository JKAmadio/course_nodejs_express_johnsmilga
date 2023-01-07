const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  // we create this auxiliar variable to handle the error
  // we set some default values
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again later",
  };

  // this err.code 11000 is fired whe we set "unique: true" and
  // the user tries to create duplicated objects
  // more infos: https://www.mongodb.com/docs/manual/core/index-unique/
  if (err.code && err.code === 11000)
    customError.msg = `Duplicate value for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;

  // the validators that we set at the model's schemas throw a specific structured error
  // it has a name property with value 'ValidationError'
  // and contains a 'errors' object that contains the properties with error
  // more infos: console.log(err)
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // CastErrors are thrown when we use the "find" method with some value
  // that don't corresponds with the type stablished at the Schema
  // example: we try to find Number with a String
  if (err.name === "CastError") {
    customError.msg = `No item found with ${err.path} : ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND; //Not Found error is a convention
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

module.exports = errorHandlerMiddleware;
