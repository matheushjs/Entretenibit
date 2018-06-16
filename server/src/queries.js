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
  db.any("SELECT * FROM developers")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      return next(err);
    });
}

function getAllEvents(req, res, next) {
  db.any(
    `SELECT e.*, t.type 
    FROM event e 
    LEFT JOIN type t 
    ON t.event = e.id`
  )
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      return next(err);
    });
}

function getEventsByType(req, res, next) {
  const title = req.query.title;
  const academic = req.query.academic;
  const music = req.query.music;
  const theater = req.query.theater;
  const others = req.query.others;
  const dateMin = req.query.dateMin;
  const dateMax = req.query.dateMax;
  const priceMin = req.query.priceMin;
  const priceMax = req.query.priceMax;

  if (type) {
    db.any(
      `SELECT e.*, t.type 
    FROM event e 
    INNER JOIN type t 
      ON t.event = e.id
    WHERE UPPER(t.type) = UPPER($1)`,
      [type]
    )
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => next(err));
  }
}

module.exports = {
  devs,
  getAllEvents,
  getEventsByType
};
