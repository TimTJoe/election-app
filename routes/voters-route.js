const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./elections.db");

router.get("/", (req, res) => {
  let data = {}
  // Query the database to find a matching
  db.all("SELECT * FROM users WHERE role_id=?",[3], function (err, users) {
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
router.post("/registration", (req, res) => {
        // Destructure required fields from request body
        const {first_name, middle_name, last_name, DOB, username, password, photo, role} = req.body;
        // Insert user information into 'users' table in the database
        db.run("INSERT INTO users VALUES(?,?,?,?,?,?,?)", [null, first_name, middle_name, last_name, DOB,photo,role], function(err) { 
            if(err) { 
                // If there's an error, throw it
                console.error(err)
            } else { 
                // Insert auth information into 'auth' table using last inserted ID
                db.run("INSERT INTO auth VALUES(?,?,?,?)", [null, username, password, this.lastID]);
                // Redirect to login page after successful registration
                res.redirect("/login");
            }
        });
});

module.exports = router;
