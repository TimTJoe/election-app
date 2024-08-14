const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.get("/", function handler(req, res) {
  let data = {};
  db.all("SELECT * FROM parties", function query(error, parties) {
    if (error) console.error(error);
    data.parties = parties;
    if (data.length !== 0) {
      res.render("elections.ejs", { data });
    }
  });
});
router.get("/create", function handler(req, res) {
  res.send("create elections");
});

router.get("/:electionID/parties", (req, res) => {
  let data = {};
  db.all("SELECT * FROM parties", function (err, parties) {
    data.parties = parties;
    if (err) console.error(err);
    res.render("elections/parties.ejs", { data });
  });
});

router.get("/:electionID/candidates", (req, res) => {
  let data = {};
  res.render("elections/candidates.ejs", { data });
});

router.get("/:electionID/voters", (req, res) => {
  let data = {};
  res.render("elections/voters.ejs", { data });
});

module.exports = router;
