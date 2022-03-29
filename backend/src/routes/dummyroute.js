const dummyroute = require("express").Router();

// dummy controllers
const { dummyController } = require("../controllers/dummyController.js");

dummyroute.get("/", dummyController);

module.exports = dummyroute;
