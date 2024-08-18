const express = require("express");
const upload = require("../public/js/multer");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./elections.db");

router.get("/", (req, res) => {
  let data = {};
  // Query the database to find a matching
  db.all("SELECT * FROM users WHERE role_id=?", [3], function (err, users) {
    data.voters = users;
    if (users.length !== 0) {
      res.render("voters.ejs", { path: "voters", data });
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

router.post("/registration", upload.single("photo"), function post(req, res) {
  let {
    first_name,
    middle_name,
    last_name,
    DOB,
    username,
    password,
    photo,
    role,
    party,
  } = req.body;

  if (Number(role) === 2) {
    console.log("candidate");
    db.run(
      "INSERT INTO candidates VALUES (?,?,?,?,?,?,?)",
      [null, first_name, middle_name, last_name, DOB, , logo],
      function query(err) {
        if (!err) {
          res.redirect("/parties");
        } else {
          console.error(err);
        }
      }
    );
  } else {
    console.log("voter or admin");
  }

  // db.run(
  //   "INSERT INTO parties VALUES (?,?,?)",
  //   [null, party, logo],
  //   function query(err) {
  //     if (!err) {
  //       res.redirect("/parties");
  //     } else {
  //       console.error(err);
  //     }
  //   }
  // );
});

module.exports = router;
