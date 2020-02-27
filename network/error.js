const response = require("./response");

function error(err, req, res, next) {
  console.error("[error] FABIO", err);
  console.error("[error] FABIO-->", err.message);
  console.error("[error] FABIO-->", err.statusCode);
  const message = err.message || "Error interno";
  const status = err.statusCode || 500;

  response.error(req, res, message, status);
}

module.exports = error;
