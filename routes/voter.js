var router = require("express").Router();
var db = require("../db");
var bcrypt = require("bcrypt");
const upload = require("../public/js/upload");

router.get("/registration", (req, res, next) => {
  let data = {};
  let errors;
  db.all("SELECT * FROM roles", function query(err, roles) {
    data.roles = roles;
    if (err) errors = err;
  });
  db.all("SELECT * FROM parties", function query(err, parties) {
    data.parties = parties;
    if (err) errors = err;
  });

  db.all("SELECT * FROM positions", function query(err, positions) {
    data.positions = positions;
    res.render("voter-registration.ejs", { title: "Voter Registration", data });
    if (err) errors = err;
    if (errors) console.error(errors);
  });
});

router.post("/registration", upload.single("photo"), (req, res) => {
  //get uploaded photo name
  let filename = req.file.filename;
  let { first_name, middle_name, last_name, DOB, username, password, role } =
    req.body;
  //hash password
  let hashed = bcrypt.hashSync(password, 10);
  if (Number(role) === 2) {
    let { position, party } = req.body;
    db.run(
      "INSERT INTO candidates VALUES (?,?,?,?,?,?,?)",
      [null, first_name, middle_name, last_name, position, party, filename],
      function query(err) {
        if (err) console.error(err);
        insertAuth(db,res, username, hashed, this.lastID);
      }
    );
  } else {
    db.run(
      "INSERT INTO users VALUES (?,?,?,?,?,?,?)",
      [null, first_name, middle_name, last_name, DOB, filename, role],
      function query(err) {
        if (err) console.error(err);
        insertAuth(db,res, username, hashed, this.lastID);
      }
    );
  }
});

function insertAuth(db,res, username, password, user_id) {
  db.run(
    "INSERT INTO auth VALUES (?,?,?,?)",
    [null, username, password, user_id],
    function cb(err) {
      if (err) console.error(err);
      res.redirect("/login");
    }
  );
}

// db.run(
//   "INSERT INTO auth VALUES (?,?,?,?)",
//   [null, username, hashed, this.lastID],
//   function cb(err) {
//     if (err) console.error(err);
//     res.redirect("/login");
//   }
// );
module.exports = router;
