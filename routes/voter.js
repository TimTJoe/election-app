var router = require("express").Router();
var db = require("../db");

router.get("/registration", (req, res, next) => {
  db.all("SELECT * FROM roles", (err, rows) => {
    if (!err) {
      console.log(rows);
    }
  });
  res.render("voter-registration.ejs", { title: "Voter Registration" });
});

module.exports = router;
