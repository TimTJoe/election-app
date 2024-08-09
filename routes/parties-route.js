const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("party-registration.ejs");
});

// Handle POST requests to "/party-registration"
router.post("/registration", (req, res) => {
        // Destructure party and logo from the request body
        const { party, logo } = req.body;

        // Insert party details into the database
        db.run("INSERT INTO parties VALUES (?,?,?)", [null, party, logo], function(err) {
            if (!err) {
                // Redirect to the dashboard if insertion is successful
                res.redirect("/dashboard");
            } else {
                // console log if insertion fails
                console.error(err)
            }
        });
});


module.exports = router