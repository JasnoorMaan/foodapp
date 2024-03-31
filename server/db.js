const Pool = require("pg").Pool;
require("dotenv").config({ path: ".env" });
console.log(process.env.UNAME);

const pool = new Pool({
  user: process.env.UNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: "fooddbs",
});

module.exports = pool;
