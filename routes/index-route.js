const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./elections.db");

router.get("/", function get(req, res) {
  let data = {};
  db.all(
    "SELECT COUNT(*) AS votersCount FROM users WHERE role_id=?",
    [3],
    function query(error, votersCount) {
      if (error) console.error(error);
      data.votersCount = votersCount[0].votersCount;
    }
  );

  db.all(
    "SELECT COUNT(*) AS partiesCount FROM parties",
    function query(error, partiesCount) {
      if (error) console.error(error);
      data.partiesCount = partiesCount[0].partiesCount;
      if (data.length !== 0) {
        res.render("dashboard.ejs", { path: "/", data });
      }
    }
  );
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
        data.error = "Incorrect username or password.";
        res.render("login.ejs", { data });
      } else {
        data.user = user;
        res.render("dashboard.ejs", { data });
      }
    }
  );
});

router.get("/login", (req, res) => {
  let data = {};
  res.render("login.ejs", { data });
});

module.exports = router;
