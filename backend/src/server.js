const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// ! this is temporary as i want to test psql pg, but you will need to change this when you start creating express routes & etc
const psqlDb = require("./database/db");

require("dotenv").config();

const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// list of urls for cors
let allowlist;
// setting production & develoment environments variables & etc
if (process.env.NODE_ENV === "production") {
  allowlist = ["https://bug-tracker-frontend-ik-202203.herokuapp.com"];
} else {
  allowlist = ["http://localhost:9000", "http://localhost:3000"];
}

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

//routes
app.get("/", (req, res) => {
  // const envi = process.env.NODE_ENV;
  // console.log(env);
  res.json({ youik: "working ikkkkk" });
  // res.send("iK success request");
});

const psQuery =
  "UPDATE users_table SET email = 'updatedemail@mail.com' WHERE name = 'deletename';";

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

app.post("/api/signup", (req, res) => {
  res.send(req.body);
});

app.get("/api/login", (req, res) => {
  res.send("iK login page");
});

app.post("/login", (req, res) => {
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
