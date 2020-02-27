const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../utils/error");
const secret = config.jwt.secret;

/**Genera token */
function sign(data) {
  return jwt.sign(data, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

const check = {
  own: function(req, owner) {
    try {
      const decode = decodeHeader(req);
      if (decode.id !== owner) {
        throw error("No Authorized!!!", 401);
      }
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

function getToken(auth) {
  if (!auth) {
    throw error("no viene token :(", 402);
  }

  if (auth.indexOf("Bearer ") === -1) {
    throw new Error("Formato no valido!!!");
  }

  return auth.replace("Bearer ", "");
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);
  req.user = decoded;
  return decoded;
}

module.exports = {
  sign,
  check
};
