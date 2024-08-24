var router = require("express").Router();
var db = require("../db");

router.get("/", (req, res, next) => {
  let data = {};
  data.total = {};
  data.user = req.session.user;
  db.all(
    "SELECT COUNT(*) AS total FROM users WHERE role_id=?",
    [3],
    function query(error, total) {
      error ? console.error(error) : (data.total.voters = total[0].total);
    }
  );
  db.all("SELECT COUNT(*) AS total FROM votes", function query(error, total) {
    error ? console.error(error) : (data.total.votes = total[0].total);
  });
  db.all("SELECT * FROM users WHERE role_id=?", [3], function (error, rows) {
    error ? console.error(error) : (data.voters = rows);
    res.render("dashboard.ejs", { title: "Dashboard", data });
  });
});

module.exports = router;
