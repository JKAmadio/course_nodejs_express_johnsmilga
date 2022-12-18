// we create a custom error class that inherits the Error class
// we use the Error class message as base to our message
// and we create a statuCode property
// use method: new CustomAPIError('this is the message', 404)
class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// we create a function that uses the class above
// this function will be used at the controllers
const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

module.exports = {
  createCustomError,
  CustomAPIError,
};
