var router = require("express").Router();
var db = require("../db");
const restrict = require("../public/js/restrict");

router.get("/", restrict, (req, res, next) => {
  let data = {};
  data.user = req.session.user;
  db.all("SELECT * FROM users WHERE role_id=?", [3], function (err, rows) {
    if (err) console.error(err);
    data.voters = rows;
    res.render("dashboard.ejs", { title: "Dashboard", data });
  });
});

module.exports = router;
