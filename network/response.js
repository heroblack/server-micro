const httpStatus = require("http-status-codes");
exports.success = function(req, res, message, status = httpStatus.OK) {
  res.status(status).send({
    error: false,
    status: status,
    body: message
  });
};

exports.error = function(
  req,
  res,
  error = "Internal server error",
  status = httpStatus.INTERNAL_SERVER_ERROR
) {
  res.status(status).send({
    error: error,
    status: status,
    body: false
  });
};
