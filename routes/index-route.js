const express = require("express")
const router = express.Router()

router.get("/welcome", function get(req,res){
    res.render("welcome.ejs");
})


router.get("/", function get(req,res){
    res.render("dashboard.ejs");
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