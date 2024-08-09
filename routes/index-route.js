const express = require("express")
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./elections.db')

router.get("/welcome", function get(req,res){
    res.render("welcome.ejs");
})

router.get("/", function get(req,res){
    db.all("SELECT * FROM users WHERE role_id=?", [3], function (err, row) {
        if (row) {
          console.log(row);
          res.render("dashboard.ejs", {row});
        //   res.render("voter-registration.ejs", { row });
        } else {
          console.error(err);
        }
      });
})

// Handle POST request to /login endpoint
router.post("/login", (req, res) => {
    // Extract username and password from request body
    const { username, password } = req.body;
    
    // Query the database to find a matching username and password
    db.all('SELECT * from auth WHERE username=? AND password=?', [username, password], function(err, row) {
        if (row) {
            // Redirect to the dashboard page upon successful login
            res.redirect("/dashboard"); 
        } else {
            // If no matching user is found, log the error
            console.error(err);
        }
    });

});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

module.exports = router