const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware to check if the review exists
const reviewExists = async (req, res, next) => {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
};

// Update review
const update = async (req, res, next) => {
  const { review_id } = res.locals.review; // Destructuring for clarity
  const updatedReview = {
    ...req.body.data,
    review_id,
  };
  await reviewsService.update(updatedReview);
  const updatedData = await reviewsService.read(review_id);
  res.json({ data: updatedData });
};

// Delete review
const destroy = async (req, res, next) => {
  const { review_id } = res.locals.review; // Destructuring for clarity
  await reviewsService.delete(review_id);
  res.sendStatus(204);
};

// Exporting middleware with asyncErrorBoundary
module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};