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
  db.all("SELECT COUNT(*) AS total FROM candidates", function query(error, total) {
    error ? console.error(error) : (data.total.candidates = total[0].total);
  });
  db.all(
    //TODO: add all the
    "SELECT *,candidates.id, (SELECT SUM(votes.vote) FROM votes WHERE candidates.id=votes.candidate_id) votes FROM candidates LEFT OUTER JOIN parties ON parties.id=candidates.party_id LEFT OUTER JOIN positions ON positions.id = candidates.position_id",
    function (err, rows) {
      console.log(rows)
      err ? console.error(err) : (data.candidates = rows);
      req.session.candidates = rows
    res.render("dashboard.ejs", { title: "Dashboard", data });

    }
  );
  // db.all("SELECT * FROM users WHERE role_id=?", [3], function (error, rows) {
  //   error ? console.error(error) : (data.voters = rows);
  //   res.render("dashboard.ejs", { title: "Dashboard", data });
  // });
});

module.exports = router;
