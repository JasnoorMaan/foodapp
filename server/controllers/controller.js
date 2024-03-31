const pool = require("../db");
const queries = require("../queries/queries");

const getAll = (req, res) => {
  pool.query(queries.getAll, (error, results) => {
    if (error) throw error;
    res.status(200).json(pricing.rows);
  });
};

module.exports = {
  getAll,
};
