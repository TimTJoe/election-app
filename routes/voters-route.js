const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // Query the database to find a matching username and password
  db.all("SELECT * FROM roles", function (err, row) {
    if (row) {
      console.log(row);
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
