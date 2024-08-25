var router = require("express").Router();

router.get("/", (req, res) => {
  req.session.destroy(function (err) {
    console.error(err)
  })
  res.redirect("/login")
});

module.exports = router;
