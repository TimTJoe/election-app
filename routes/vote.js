var router = require("express").Router();
var db = require("../db");

router.get("/", (req, res, next) => {
  let data = {};
  //TODO: use join clause
  // SELECT * FROM candidates INNER JOIN parties ON parties.id=candidates.party_id
  // SELECT * FROM candidates JOIN parties ON parties.id=candidates.party_id
  db.all(
    "SELECT *, candidates.id FROM candidates LEFT OUTER JOIN parties ON parties.id=candidates.party_id LEFT OUTER JOIN positions ON positions.id = candidates.position_id",
    function (err, rows) {
      //TODO: add each candidate to it position property on data ie: data.president, data.vp
      if (err) console.error(err);
      data.candidates = rows;
      res.render("vote.ejs", { title: "Cast Your Vote", data });
    }
  );
});

router.post("/", (req, res, next) => {
  let { candidate, voter } = req.body;
  //TODO: update user table
  db.run(
    "INSERT INTO votes VALUES (?,?,?,?)",
    [null, candidate, true, voter],
    function (err) {
      if (err) {
        console.error(err);
      } else {
        db.run(
          "UPDATE users SET voted=? WHERE id=?",
          [true, voter],
          function (err) {
            if (err) {
              console.error(err);
            } else {
              res.redirect("/dashboard");
            }
          }
        );
      }
    }
  );
});

module.exports = router;
