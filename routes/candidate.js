var router = require("express").Router();
var db = require("../db");

router.get("/", (req, res, next) => {
  let data = {};
  //TODO: use join clause
  db.all("SELECT * FROM candidates WHERE position_id=?",[1], function (err, rows) {
    if (err) console.error(err);
    data.candidates = rows;
    res.render("candidate.ejs", { title: "All Candidates", data });
  });
});

module.exports = router;
