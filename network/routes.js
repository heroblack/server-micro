const user = require("../api/components/users/networks");
const auth = require("../api/components/auth/network");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../api/swagger.json");

const routes = server => {
  server.use("/api/users", user);
  server.use("/api/auth", auth);
  server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};

module.exports = routes;
