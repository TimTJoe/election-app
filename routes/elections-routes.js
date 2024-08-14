const express = require("express");
const router = express.Router();

router.get("/", function handler(req, res) {
  res.render("elections.ejs");
});
router.get("/create", function handler(req, res) {
  res.send("create elections");
});

module.exports = router;
