const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const upload = require("../utils/upload");

router.get("/", (req, res) => {
  let data = {};
  db.all("SELECT * FROM parties", function (err, parties) {
    data.parties = parties;
    if (err) console.error(err);
    res.render("parties.ejs", { data });
  });
});

router.get("/registration", (req, res) => {
  res.render("party-registration.ejs");
});

// Handle POST requests to "/party-registration"
router.post("/registration", upload.single("logo"), (req, res) => {
  let logo = req.file.filename;
  let { party } = req.body;

  db.run(
    "INSERT INTO parties VALUES (?,?,?)",
    [null, party, logo],
    function query(err) {
      if (!err) {
        res.redirect("/parties");
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = router;
