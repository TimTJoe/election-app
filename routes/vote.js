var router = require("express").Router();
var db = require("../db");
let data = {};

router.get("/", (req, res, next) => {
  data.user = req.session.user

  db.all(
    "SELECT *,candidates.id, (SELECT SUM(votes.vote) FROM votes WHERE candidates.id=votes.candidate_id) votes FROM candidates LEFT OUTER JOIN parties ON parties.id=candidates.party_id LEFT OUTER JOIN positions ON positions.id = candidates.position_id",
    function (err, rows) {
      //TODO: add each candidate to it position property on data ie: data.president, data.vp
      if (err) console.error(err);
      data.candidates = rows;
      req.session.candidates = rows
      res.render("vote.ejs", { title: "Cast Your Vote", data });
    }
  );
});

router.post("/", (req, res, next) => {
  let { candidate, voter } = req.body;
  data.candidates = req.session.candidates
  data.user = req.session.user
  db.all(
    "SELECT user_id FROM votes WHERE user_id=?",
    [voter],
    function (err, rows) {
      if (rows.length === 0) {
        db.run(
          "INSERT INTO votes VALUES (?,?,?,?)",
          [null, candidate, true, voter],
          function (err) {
            if (err) console.error(err);
          }
        );
        db.run(
          "UPDATE users SET voted=? WHERE id=?",
          [true, voter],
          function (err) {
            err ? console.error(err) : res.redirect("/dashboard");
          }
        );
      } else {
      data.voted = true
      res.render("vote.ejs", { title: "Cast Your Vote", data });
      console.error("You already voted");
      }
    }
  );
});

module.exports = router;
