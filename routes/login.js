var router = require("express").Router();
var db = require("../db");
var bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  res.render("login.ejs", { title: "Log in" });
});
router.post("/", (req, res, next) => {
  let { username, password } = req.body;
  db.all(
    "SELECT * FROM auth WHERE username=?",
    [username],
    function (err, rows) {
      if (err) console.log(err);
      if (rows.length === 0) {
        console.log("User doesn't exist");
      } else {
        //TODO: set req.session.isAuth to true and add user data to session
        bcrypt.compareSync(password, rows[0].password)
          ? res.redirect("/")
          : console.log("Incorrect password");
      }
    }
  );
});

module.exports = router;
