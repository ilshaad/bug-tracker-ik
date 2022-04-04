const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

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
  console.log(process.env.NODE_ENV);

  res.json({ success: true, msg: "home route, but nothing to gain here" });
});

// ticket_table psql route
app.use("/api/ticket", ticketRoute);

// users_table psql route
app.use("/api/user", userRoute);

// comments_table psql route
app.use("/api/comment", commentRoute);

// error page route
app.all("*", (req, res) => {
  res.status(404).json({ success: false, msg: "path does not exist" });
});

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`iK server connection on http://localhost:${port}/`)
);
