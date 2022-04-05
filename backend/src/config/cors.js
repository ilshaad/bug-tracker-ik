exports.corsOptionsDelegate = (req, callback) => {
  // list of urls for cors
  let allowlist;
  // setting production & develoment environments variables & etc
  if (process.env.NODE_ENV === "production") {
    allowlist = [process.env.FRONTEND_HEROKU_SITE_URL];
  } else {
    allowlist = [process.env.LOCAL_DEV_URL, process.env.LOCAL_PROD_URL];
  }

  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
