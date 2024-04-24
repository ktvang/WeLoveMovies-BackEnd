const express = require("express");
const router = express.Router();
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Routes for handling theater endpoints
router
  .route("/")
  .get(controller.list) 
  .all(methodNotAllowed); 

module.exports = router;