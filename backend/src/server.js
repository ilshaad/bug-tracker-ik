const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

//whtielist
const corsOptions = {
  origin: "http://localhost:9000",
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

//routes
app.get("/", (req, res) => {
  res.send("iK home page1");
});

app.get("/api/signup", (req, res) => {
  res.send("iK signup page");
});

app.post("/api/signup", (req, res) => {
  res.send(req.body);
});

app.get("/api/login", (req, res) => {
  res.send("iK login page");
});

app.post("/api/login", (req, res) => {
  res.send(req.body);
});

app.post("/api/logout", (req, res) => {
  res.send(req.body);
});

app.get("/api/authpage", (req, res) => {
  res.send("iK auth page");
});

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`iK server connection on http://localhost:${port}/`)
);
