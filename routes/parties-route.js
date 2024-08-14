const express = require("express");
const db = require("../utils/db");
const upload = require("../utils/uploader");
const router = express.Router();

router.get("/", (req, res) => {
  let data = {};
  // Query the database to find a matching
  db.all("SELECT * FROM parties", function (err, parties) {
    data.parties = parties;
    if (err) console.error(err);
    res.render("parties.ejs", {data});
  });
});

router.get("/registration", (req, res) => {
  res.render("party-registration.ejs");
});

// Handle POST requests to "/party-registration"
router.post("/registration", upload.single("logo"), (req, res) => {
  // Destructure party and logo from the request body
  const { party, logo } = req.body;

  // Insert party details into the database
  db.run(
    "INSERT INTO parties VALUES (?,?,?)",
    [null, party, logo],
    function query(err) {
      if (!err) {
        // Redirect to the dashboard if insertion is successful
        res.redirect("/parties");
      } else {
        // console log if insertion fails
        console.error(err);
      }
    }
  );
});

module.exports = router;
