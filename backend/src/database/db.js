const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },

  // * to connect to your local psql database for testing purposes
  // database: "postgres",
  // host: "localhost",
  // user: "postgres",
  // password: "",
  // port: 5432,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
