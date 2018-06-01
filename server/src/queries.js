const promise = require("bluebird");
const moment = require("moment");
const pgp = require("pg-promise");
const monitor = require("pg-monitor");

require("dotenv").config();

const initOptions = {
  promiseLib: promise
};

// For debugging
const env = process.env.NODE_ENV || "development";
if (env === "development") {
  monitor.attach(initOptions);
}

const connection = {
  user: process.env.USERNAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  ssl: true
};

const db = pgp(initOptions)(connection);

function devs(req, res, next) {
  db
    .any("SELECT * FROM developers")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      return next(err);
    });
}

function test(req, res, next) {
  return res.status(200).json({
    message: "Hello World"
  });
}

module.exports = {
  test,
  devs
};
