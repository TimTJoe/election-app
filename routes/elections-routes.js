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

module.exports = router;
