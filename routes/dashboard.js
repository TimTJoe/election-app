var router = require("express").Router();
var db = require("../db");

router.get("/", (req, res, next) => {
  let data = {};
  db.all("SELECT * FROM users WHERE role_id=?", [3], function (err, rows) {
    if (err) console.error(err);
    data.voters = rows;
    res.render("dashboard.ejs", { title: "Dashboard", data });
  });
});

module.exports = router;
