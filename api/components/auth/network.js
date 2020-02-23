const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const Controller = require("./");

router.post("/login", login);

async function login(req, res) {
  try {
    const token = await Controller.login(req.body.username, req.body.password);
    response.success(req, res, token);
  } catch (error) {
    console.log(error);
    response.error(req, res, error.message, 400);
  }
}

module.exports = router;
