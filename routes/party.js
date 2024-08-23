var router = require("express").Router();
var db = require("../db");
var bcrypt = require("bcrypt");
const upload = require("../public/js/upload");

router.get("/registration", (req, res, next) => {
  res.render("party-registration.ejs", { title: "Party Registration" });
});

router.post("/registration", upload.single("logo"), (req, res) => {
  let logo = req.file.filename;
  let { party } = req.body;

  db.run(
    "INSERT INTO parties VALUES (?,?,?)",
    [null, party, logo],
    function (err) {
      if (!err) {
        res.redirect("/dashboard.ejs");
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = router;
