const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Controller function to list theaters
const list = async (req, res, next) => {
  const data = await theatersService.list(); // Retrieve list of theaters
  res.json({ data }); // Send JSON response with theater data
};

module.exports = {
  list: asyncErrorBoundary(list), // Export list function with error handling
};