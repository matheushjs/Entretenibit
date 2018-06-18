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


  // NOTE:
  // This function title is kinda misleading, because now
  // it works with every parameter, but I'll not touch
  // it until I'am sure that this will not break anything.

  // Ok. For now and so on, I'll try keep this inner
  // documentation heavy and almost redundant, as
  // the strategy adopted for query construction
  // is kinda powerful in terms of scalability
  // (easily supporting new SELECT constraints)
  // but is very confusing in terms of readability.
  // So, i'll try to explain this code step-by-step.

  // First, we create a variable for the query base.
  // Here comes all innver join needed to fill up
  // the event cards on the front end, alongside
  // all columns in the SELECT statement. 

  // Observation: the LEFT OUTER JOIN IS A MUST, as
  // it will keep the search engine working even
  // if a event don't have a explicity TYPE registered
  // on the "type" table.

  // Another observation: please note that there is 
  // a very strange "true" after "WHERE" keyword. 
  // It is used to keep the SELECT syntax working even 
  // if there is no select constraint specified from
  // the outter front-end, for any reason that is 
  // not this module concern.
  var query = 
    " SELECT e.*, t.type "+
    " FROM event e "+
    " LEFT OUTER JOIN type t "+
    "   ON t.event = e.id "+
    " LEFT OUTER JOIN occurence o" +
    "   ON e.link = o.event "+
    " WHERE true ";

  // Here I check if there is a "title" specified.
  // Note that this is a pretty nasty direct comparison,
  // and should be improved on a future update.
  query += title !== "null" && title !== "" ? 
    " AND UPPER(e.title) LIKE UPPER(\'" + `${title}` + "\') " : "";

  // Here comes the "type" paramaters. The "TEATRO", 
  // "MUSICA" and "ACADEMICO" are all pretty straighforward to
  // check with a direct comparison. I've just used a 
  // SQL "LIKE" keyword alongside the user desired types.
  // If the user don't specify any type, for the sake of
  // simplicity, it is replaced by the "INV" type in the 
  // "LIKE" group, which is arbitrarily selected between 
  // any invalid type value.

  // All SQL type-related will be kept inside
  // a parenthesis in the query to work together:
  let types = " AND (";
  types += " UPPER(t.type) IN (";
  types += theater === "true" ? "\'TEATRO\'," : "\'INV\',";
  types += music === "true" ? "\'MUSICA\'," : "\'INV\'," ;
  types += academic === "true" ? "\'ACADEMICO\'" : "\'INV\'";
  types += ") ";

  // The "Others" event type are special: it means "anything
  // other than the supported types existent", so a NOT IN
  // works wonders right here.
  if (others === "true") {
          types += " OR t.type IS NULL OR UPPER(t.type) NOT IN "+
          " (\'TEATRO\', \'MUSICA\', \'ACADEMICO\') ";
  }

  // Closing the "SQL type-related code" parenthesis, opened
  // when the "types" variable was declared.
  types += " ) ";

  // Concatenate the type section with the
  // search query
  query += types;

  // Now the date parameter. I'm checking if all event dates,
  // on the "occurence" table, now aliased as "o", is between
  // min and max dates.  Again, for simplicity, if a date is 
  // null, then just replace that date comparison with a "true".
  let dateCode = " AND ( ";

  // First, check the dateMin
  dateCode += dateMin !== "null" && dateMin !== "" ? 
    " o.date >= \'" + `${dateMin}` + "\'::date" 
    : " true ";

  // AND to dateMin work together, if needed, with dateMax
  dateCode += " AND ";

  // Now check dateMax
  dateCode += dateMax !== "null" && dateMax !== "" ? 
    " o.date <= \'" + `${dateMax}` + "\'::date" 
    : " true ";

  // End date-related parenthesis
  dateCode += " ) ";
  
  // Concatenate date stuff to the query, ending date-related
  // SQL code.
  query += dateCode;

  // Finally, pricing conditions.
  // Will not implement that now because I'm really not sure
  // how exactly this will be stored in database.
  
  // End query
  query += ";";

  // Finally, send the mounted query to the database.
  db.any(query)

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

module.exports = {
  devs,
  getAllEvents,
  getEventsByType,
  insertUser
};
