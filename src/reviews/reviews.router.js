const express = require("express");
const router = express.Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:reviewId")
  .put(controller.update) // Update review
  .delete(controller.delete) // Delete review
  .all(methodNotAllowed); // Handle unsupported methods

module.exports = router;