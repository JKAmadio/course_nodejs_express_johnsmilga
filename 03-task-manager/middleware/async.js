const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      // this "next" will 'call' the error handler middleware
      next(error);
    }
  };
};

module.exports = asyncWrapper;
