var router = require("express").Router();
var db = require("../db");
var bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  res.render("login.ejs", {page: "login", title: "Log in" });
});
router.post("/", (req, res, next) => {
  let { username, password } = req.body;
  db.all(
    "SELECT * FROM auth WHERE username=?",
    [username],
    function (err, rows) {
      if (err) console.error(err);
      if (rows.length === 0) {
        console.error("User doesn't exist");
      } else {
        if (bcrypt.compareSync(password, rows[0].password)) {
          db.all(
            "SELECT *, users.id FROM users LEFT OUTER JOIN roles ON roles.id=users.role_id WHERE users.id=?",
            [rows[0].user_id],
            function (err, rows) {
              if (err) console.error(err);
              req.session.user = rows[0];
              res.redirect("/dashboard");
            }
          );
        } else {
          console.error("Incorrect password");
        }
      }
    }
  );
});

module.exports = router;
