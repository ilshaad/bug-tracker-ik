const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// ! iK test psql local database for /dummyroute
// const psqlDb = require("./database/db.js");

require("dotenv").config();

/** routes import */
const ticketRoute = require("./routes/ticketRoute.js");
const userRoute = require("./routes/userRoute.js");
const commentRoute = require("./routes/commentRoute.js");

/**express config settings */
const app = express();
app.use(morgan("dev"));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**url cors settings */
const { corsOptionsDelegate } = require("./config/cors.js");
app.use(cors(corsOptionsDelegate));

/**server route paths */
app.get("/", (req, res) => {
  // console.log(process.env.NODE_ENV);

  res.json({ success: true, msg: "home route, but nothing to gain here" });
});

// ticket_table psql route
app.use("/api/ticket", ticketRoute);

// users_table psql route
app.use("/api/user", userRoute);

// comments_table psql route
app.use("/api/comment", commentRoute);

// ! Test route for iK localhost psql db
// app.get("/dummyroute", (req, res) => {
//   const sqlQuery = "SELECT * FROM iktable;";

//   psqlDb.query(sqlQuery, null, (err, result) => {
//     if (err) {
//       res.status(400).json({
//         success: false,
//         msg: "error when fetching ticket list from database",
//         err,
//       });
//       return;
//     }
//     res.json({ success: true, data: result.rows });
//   });
//   // res.json({ success: true, msg: "ik dummy route is working" });
// });

// error page route
// app.all("*", (req, res) => {
app.use((req, res) => {
  console.log("ik server 404 error route");
  res.status(404).json({ success: false, msg: "path does not exist" });
});

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`iK server connection on http://localhost:${port}/`)
);
