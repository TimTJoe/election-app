const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.get("/", function handler(req, res) {
  let data = {};
  db.all("SELECT * FROM candidates", function query(error, candidates) {
    console.log(candidates);
    if (error) console.error(error);
    data.candidates = candidates;
    if (data.length !== 0) {
      res.render("candidates.ejs", { path: "candidates", data });
    }
  });
});

module.exports = router;
