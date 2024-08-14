const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./elections.db");

router.get("/", (req, res) => {
  let data = {};
  // Query the database to find a matching
  db.all("SELECT * FROM users WHERE role_id=?", [3], function (err, users) {
    data.voters = users;
    if (users.length !== 0) {
      res.render("voters.ejs", { data });
    } else {
      console.error(err);
    }
  });
});

router.get("/registration", (req, res) => {
  let data = {};
  let errors;
  db.all("SELECT * FROM roles", function query(err, roles) {
    data.roles = roles;
    if (err) errors = err;
  });
  db.all("SELECT * FROM parties", function query(err, parties) {
    data.parties = parties;
    if (err) errors = err;
  });
  db.all("SELECT * FROM positions", function query(err, positions) {
    data.positions = positions;
    res.render("voter-registration.ejs", { data });
    if (err) errors = err;
    if (errors) console.error(errors);
  });
});


module.exports = router;
