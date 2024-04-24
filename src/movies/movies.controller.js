const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware to check if movie exists
const movieExists = async (req, res, next) => {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
};

// Controller function to read movie details
const read = async (req, res, next) => {
  const { movie_id } = res.locals.movie;
  res.json({ data: await moviesService.read(movie_id) });
};

// Controller function to read theaters by movie
const readTheatersByMovie = async (req, res, next) => {
  const { movie_id } = res.locals.movie;
  res.json({ data: await moviesService.readTheatersByMovie(movie_id) });
};

// Controller function to read reviews by movie
const readReviewsByMovie = async (req, res, next) => {
  const { movie_id } = res.locals.movie;
  res.json({ data: await moviesService.readReviewsByMovie(movie_id) });
};

// Controller function to list movies
const list = async (req, res, next) => {
  if (req.query.is_showing === "true") {
    return res.json({ data: await moviesService.listMoviesCurrentlyShowing() });
  }
  res.json({ data: await moviesService.list() });
};

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  readTheatersByMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheatersByMovie),
  ],
  readReviewsByMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readReviewsByMovie),
  ],
};