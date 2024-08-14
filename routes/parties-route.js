const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const upload = require("../public/js/multer");

router.get("/", (req, res) => {
  let data = {};
  // Query the database to find a matching
  db.all("SELECT * FROM parties", function (err, parties) {
    data.parties = parties;
    if (err) console.error(err);
    res.render("parties.ejs", { data });
  });
});

router.get("/registration", (req, res) => {
  res.render("party-registration.ejs");
});

// Handle POST requests to "/party-registration"
router.post("/registration", upload.single("logo"), (req, res) => {
  let logo = req.file.filename
  // Destructure party and logo from the request body
  const { party } = req.body;

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
