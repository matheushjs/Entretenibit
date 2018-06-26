const promise = require("bluebird");
const moment = require("moment");
const pgp = require("pg-promise");
const monitor = require("pg-monitor");
const crypto = require("crypto");

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

  // NOTE:
  // This function title is kinda misleading, because now
  // it works with every parameter, but I'll not touch
  // it until I'am sure that this will not break anything.

  // Build a subquery for "type" paramaters. The "TEATRO", 
  // "MUSICA" and "ACADEMICO" are all pretty straighforward to
  // check with a direct comparison. I've just used a 
  // SQL "LIKE" keyword alongside the user desired types.
  // If the user don't specify any type, for the sake of
  // simplicity, it is replaced by the "INV" type in the 
  // "LIKE" group, which is arbitrarily selected between 
  // any invalid type value.

  // All SQL type-related will be kept inside
  // a parenthesis in the query to work together:
  const queryTypes = " UPPER(t.type) IN ("
    + (theater === "true" ? "'TEATRO'" : "'INV'") + ","
    + (music === "true" ? "'MUSICA'" : "'INV'") + ","
    + (academic === "true" ? "'ACADEMICO'" : "'INV'") + ")"
    + (others === "true" ? 
          " OR t.type IS NULL OR UPPER(t.type) NOT IN " +
          " ('TEATRO', 'MUSICA', 'ACADEMICO') " : "");

  // Finally, pricing conditions.
  // Will not implement that now because I'm really not sure
  // how exactly this will be stored in database.
  
  // Finally, send the mounted query to the database.
  db.any(`
      SELECT e.*, t.type
      FROM event e 
      LEFT OUTER JOIN type t
        ON t.event = e.id 
      LEFT OUTER JOIN occurence o
        ON e.link = o.event 
      WHERE 
        UPPER(e.title) LIKE UPPER($1)
      AND ($2:raw)
      AND (
        $3 OR
        o.date BETWEEN 
        to_date($4, 'YYYY-MM-DD') AND 
        to_date($5, 'YYYY-MM-DD')
      );`, 
    [
      title !== null && 
      title !== "null" && 
      title.length > 0 ? 
      title : "%",

      queryTypes,

      (dateMin === null ||
      dateMin === "null" ||
      dateMin.length === 0) &&
      (dateMax === null ||
      dateMax === "null" ||
      dateMax.length === 0) ?
      "TRUE" : "FALSE",

      dateMin !== null && 
      dateMin !== "null" && 
      dateMin.length > 0 ? 
      dateMin : "0000-00-00",

      dateMax !== null && 
      dateMax !== "null" && 
      dateMax.length > 0 ? 
      dateMax : "9999-12-31",
    ])

    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => next(err));
}

function insertUser(req, res, next) {
  const email = req.query.email;
  const name = req.query.name;
  const searchStr = req.query.searchStr;
  const academic = req.query.academic;
  const music = req.query.music;
  const theater = req.query.theater;
  const others = req.query.others;
  const pmin = req.query.pmin;
  const pmax = req.query.pmax;
  const dateMin = req.query.dateMin;
  const dateMax = req.query.dateMax;

  db.none(
    "INSERT INTO" +
    "  users (email, name, searchString, type_academic, type_music, type_theater," +
    "         type_others, price_min, price_max, date_min, date_max)" +
    "  VALUES (${email}, ${name}, ${searchStr}, ${academic}, ${music}, " +
    "          ${theater}, ${others}, ${pmin}, ${pmax}, " +
    "          to_date(${dateMin}, 'yyyy-mm-dd'), " +
    "          to_date(${dateMax}, 'yyyy-mm-dd'));", {
    email,
    name: name == null ? "DEFAULT" : name,
    searchStr,
    academic: academic == null ? false : academic,
    music: music == null ? false : music,
    theater: theater == null ? false : theater,
    others: others == null ? false : others,
    pmin: pmin == null ? 0 : Number(pmin),
    pmax: pmax == null ? 100000 : Number(pmax),
    dateMin,
    dateMax
  })
  .then( () => {
    res.status(200).send("Success");
  })
  .catch(err => next(err));
}

/* Unsubscribes a user from receiving e-mails.
 * We hash the e-mail and check if it is equal 'hash'. It has to be equal.
 */
function unsubscribeUser(req, res, next){
  const email = req.query.email;
  const hash = req.query.hash;
  
  const salt = "sardinha e limao"
  const reHash = crypto.createHash("sha256").update(email + salt).digest("hex");

  console.log(email, hash, reHash)

  if(hash === reHash){
    // Unsubscribe user
    db.none("DELETE FROM users WHERE email = ${email}", { email })
    .then( () => {
      res.status(200).send("Success");
    })
    .catch(err => next(err));
  } else {
    res.status(500).send("Hash is not valid.");
  }
}

module.exports = {
  devs,
  getAllEvents,
  getEventsByType,
  insertUser,
  unsubscribeUser
};
