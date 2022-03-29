exports.corsOptionsDelegate = (req, callback) => {
  // list of urls for cors
  let allowlist;
  // setting production & develoment environments variables & etc
  if (process.env.NODE_ENV === "production") {
    allowlist = ["https://bug-tracker-frontend-ik-202203.herokuapp.com"];
  } else {
    allowlist = ["http://localhost:9000", "http://localhost:3000"];
  }

  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
