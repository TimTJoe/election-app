var router = require("express").Router();

router.get("/", (req, res) => {
  res.send("logging out...");
});

module.exports = router;
