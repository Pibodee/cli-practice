const globalErrorHandler = (err, req, res, next) => {
  console.log(err);
  res
    .status(err.statusCode || 500)
    .json({
      message: err.message || "Something went wrong, please tyr gain later",
    });
};

module.exports = {globalErrorHandler}