const auth = require("../../../auth");
module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case "update":
        console.log("hola:", req.body.id);
        const owner = req.body.id;
        if (auth.check.own(req, owner)) {
          next();
        }
        break;
      default:
        next();
    }
  }

  return middleware;
};
