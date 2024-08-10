const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./elections.db");

router.get("/welcome", function get(req, res) {
  res.render("welcome.ejs");
});

router.get("/", function get(req, res) {
  let data = {}
  db.all("SELECT * FROM users WHERE role_id=?", [3], function query(error, user) {
    data.voter = user
    if (user.length !== 0) {
      res.render("dashboard.ejs", { data });
      //   res.render("voter-registration.ejs", { row });
    } else {
      console.error(err);
    }
  });
});

// Handle POST request to /login endpoint
router.post("/login", (req, res) => {
  let data = {};
    // Extract username and password from request body
    const { username, password } = req.body;

    // Query the database to find a matching username and password
    db.all(
      "SELECT * from auth WHERE username=? AND password=?",
      [username, password],
      function query(error, user) {
        if (user?.length == 0) {
          data.error = "Incorrect username or password."
          res.render("login.ejs", { data });
        } else {
          data.user = user;
          res.render("dashboard.ejs", { data });
        }
      }
    );
});

router.get("/login", (req, res) => {
  let data = {}
  res.render("login.ejs", {data});
});

module.exports = router;
