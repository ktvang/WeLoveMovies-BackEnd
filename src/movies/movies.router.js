const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Route for listing movies
router.route("/")
  .get(controller.list)
  .all(methodNotAllowed);

// Route for reading a specific movie by ID
router.route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

// Route for reading theaters by movie
router.route("/:movieId/theaters")
  .get(controller.readTheatersByMovie)
  .all(methodNotAllowed);

// Route for reading reviews by movie
router.route("/:movieId/reviews")
  .get(controller.readReviewsByMovie)
  .all(methodNotAllowed);

module.exports = router;