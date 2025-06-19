require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  // * to connect to your server (Supabase) database
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },

  // * to connect to your local psql database for testing purposes (but ensure you already set up your local psql database)
  // database: process.env.PGDATABASE,
  // host: process.env.PGHOST,
  // user: process.env.PGUSER,
  // password: process.env.PGPASSWORD,
  // port: process.env.PGPORT,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
