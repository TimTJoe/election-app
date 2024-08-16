const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.get("/", function handler(req, res) {
  let data = {};
  db.all("SELECT * FROM votes", function query(error, votes) {
    if (error) console.error(error);
    data.votes = votes;
    if (data.length !== 0) {
      res.render("votes.ejs", { path: "votes", data });
    }
  });
});

module.exports = router;
