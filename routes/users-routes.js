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

router.get("/:userID", (req, res) => {
  let { userID } = req.params;

  // Query the database to find a matching
  db.all(
    "SELECT * FROM users WHERE id=?",
    [Number(userID)],
    function (err, user) {
      data.user = user[0];
      if (err) console.error(err);
      res.render("users-profile.ejs", { path: "profile", data });
    }
  );
});

module.exports = router;
