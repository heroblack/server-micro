const express = require("express");
const router = express.Router();
const response = require("../../../../network/response");
const Controller = require("../index");

router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
router.put("/", upsert);
router.delete("/:id", remove);
async function list(req, res) {
  try {
    const users = await Controller.list();
    response.success(req, res, users);
  } catch (error) {
    response.error(req, res, error);
  }
}

async function get(req, res) {
  try {
    console.log("req.params.id:", req.params.id);
    const user = await Controller.get(req.params.id);
    console.log("users:", user);
    response.success(req, res, user);
  } catch (error) {
    response.error(req, res, error.message);
  }
}

async function upsert(req, res) {
  console.log("req.body:", req.body);
  let data = req.body;
  try {
    let userResponse = await Controller.upsert(data);
    console.log("userResponse:", userResponse);
    response.success(req, res, userResponse);
  } catch (error) {
    response.error(req, res, error.message);
  }
}

async function remove(req, res) {
  try {
    console.log("req.params.id:", req.params.id);
    await Controller.remove(req.params.id);
    response.success(req, res, "Usuario eliminado con exito.");
  } catch (error) {
    response.error(req, res, error.message);
  }
}

module.exports = router;
