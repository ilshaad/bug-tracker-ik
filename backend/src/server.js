const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// ! this is temporary as i want to test psql pg, but you will need to change this when you start creating express routes & etc
const psqlDb = require("./database/db");

require("dotenv").config();

// routes import
const dummyroute = require("./routes/dummyroute.js");
const ticketRoute = require("./routes/ticketRoute.js");

// express config settings
const app = express();
app.use(morgan("dev"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// url cors settings
const { corsOptionsDelegate } = require("./config/cors.js");
app.use(cors(corsOptionsDelegate));

//server route paths
app.get("/", (req, res) => {
  console.log(process.env.NODE_ENV);

  res.json({ success: true, msg: "home route, but nothing to gain here" });
});

// ! delete when finish
// app.get("/dummyroute", dummyroute);
app.use("/dummyroute", dummyroute);

// ticket_table psql route
app.use("/api/ticket", ticketRoute);

const psQuery = "SELECT * FROM users_table;";

// ! this is a testing psql fetch just to see if psql is working & it is, but remove afterwards when you do not need it
app.get("/db", (req, res) => {
  psqlDb.query(psQuery, null, (err, result) => {
    if (err) {
      console.log(err);
      return err;
    }
    res.send(result);
  });
});

// error page route
app.all("*", (req, res) => {
  res.status(404).json({ success: false, msg: "path does not exist" });
});

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`iK server connection on http://localhost:${port}/`)
);
