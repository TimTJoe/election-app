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
  let data = {};
  let errors;
  // Query the database to find a matching
  db.all("SELECT * FROM roles", function query(err, roles) {
    data.roles = roles;
    if (err) errors = err;
  });
  db.all("SELECT * FROM positions", function query(err, positions) {
    data.positions = positions;
    console.log(data);
    res.render("voter-registration.ejs", { data });
    if (err) errors = err;
    if (errors) {
      console.error(errors);
    }
  });
});

// Handle POST request to /voter-registration endpoint
<<<<<<< HEAD
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
=======
router.post("/registration", (req, res) => {
  // Destructure required fields from request body
  const {
    first_name,
    middle_name,
    last_name,
    DOB,
    username,
    password,
    photo,
    role,
  } = req.body;
  // Insert user information into 'users' table in the database
  db.run(
    "INSERT INTO users VALUES(?,?,?,?,?,?,?)",
    [null, first_name, middle_name, last_name, DOB, photo, role],
    function (err) {
      if (err) {
        // If there's an error, throw it
        console.error(err);
      } else {
        // Insert auth information into 'auth' table using last inserted ID
        db.run("INSERT INTO auth VALUES(?,?,?,?)", [
          null,
          username,
          password,
          this.lastID,
        ]);
        // Redirect to login page after successful registration
        res.redirect("/login");
      }
    }
  );
>>>>>>> 3242601624210791263f0ce39087d80fe31f8046
});

module.exports = router;
