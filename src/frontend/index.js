const path = require("path");
const express = require("express");
const app = express();
const request = require("request");

/*
app.get("/pythontest", (req, res) => {
  console.log("ehhhh");
  request("http://172.18.0.21:5000", function (Nerror, Nresponse, body) {
    res.send("Hello World!<br><br>" + body);
  });
});
*/

app.use(express.static(path.resolve("./main-page/build/")));

// Begin serving
app.listen(8081);
