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
      res.render("voters.ejs", { data });
    } else {
      console.error(err);
    }
  });
});

router.get("/registration", (req, res) => {
  // Query the database to find a matching
  db.all("SELECT * FROM roles", function (err, row) {
    if (row) {
      res.render("voter-registration.ejs", { row });
    } else {
      console.error(err);
    }
  });
});

// Handle POST request to /voter-registration endpoint
router.post("/registration", upload.single("photo"), (req, res) => {
  console.log(req.body);
  // const { first_name, middle_name, last_name, DOB, username, password,photo, role } =
  //   req.body;
  // db.run(
  //   "INSERT INTO users VALUES(?,?,?,?,?,?,?)",
  //   [null, first_name, middle_name, last_name, DOB, photo, role],
  //   function (err) {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       db.run("INSERT INTO auth VALUES(?,?,?,?)", [
  //         null,
  //         username,
  //         password,
  //         this.lastID,
  //       ]);
  //       res.redirect("/login");
  //     }
  //   }
  // );
});

module.exports = router;
