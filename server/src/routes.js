var express = require("express");
var router = express.Router();

var db = require("./queries");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Entretenibit" });
});

router.get("/test", db.test);
router.get("/devs", db.devs);

module.exports = router;
