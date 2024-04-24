const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// Mapping critic properties for readability
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

// Function to list all movies
const list = () => {
  return knex("movies").select("*");
};

// Function to list movies currently showing
const listMoviesCurrentlyShowing = () => {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .distinct("m.*")
    .where({ "mt.is_showing": true });
};

// Function to read a specific movie by ID
const read = movie_id => {
  return knex("movies")
    .select("*")
    .where({ movie_id })
    .first();
};

// Function to read theaters by movie
const readTheatersByMovie = movie_id => {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.movie_id", "mt.is_showing")
    .where({ "mt.movie_id": movie_id });
};

// Function to read reviews by movie
const readReviewsByMovie = movie_id => {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movie_id })
    .then(reviews => reviews.map(review => addCritic(review)));
};

module.exports = {
  list,
  listMoviesCurrentlyShowing,
  read,
  readTheatersByMovie,
  readReviewsByMovie,
};