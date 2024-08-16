const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./elections.db");

router.get("/", (req, res) => {
  let data = {};
  // Query the database to find a matching
  db.all("SELECT * FROM users ", function (err, users) {
    data.voters = users;
    if (users.length !== 0) {
      res.render("users.ejs", { path: "users", data });
    } else {
      console.error(err);
    }
  });
});


module.exports = router;
