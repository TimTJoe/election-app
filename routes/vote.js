var router = require("express").Router();
var db = require("../db");

router.get("/", (req, res, next) => {
  let data = {};
  //TODO: use join clause
  db.all(
    "SELECT * FROM candidates INNER JOIN parties ON parties.id=candidates.party_id",
    [1],
    function (err, rows) {
      console.log(rows);
      if (err) console.error(err);
      data.candidates = rows;
      // res.render("vote.ejs", { title: "Cast Your Vote", data });
    }
  );
});

router.post("/", (req, res, next) => {
  let { president, voter } = req.body;
  //TODO: update user table
  db.run(
    "INSERT INTO votes VALUES (?,?,?,?)",
    [null, president, 1, voter],
    function (err) {
      if (err) console.error(err);
      res.redirect("/");
    }
  );
  db.run("UPDATE users SET voted=? WHERE id=?", [true, voter], function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log(`Row(s) updated: ${this.changes}`);
    }
  });
});

module.exports = router;
