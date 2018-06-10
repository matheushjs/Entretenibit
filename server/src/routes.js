var express = require("express");
var router = express.Router();

var db = require("./queries");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Entretenibit" });
});

router.get("/devs", db.devs);
router.get("/eventsAll", db.getAllEvents);
router.get("/eventsType", db.getEventsByType);

module.exports = router;
