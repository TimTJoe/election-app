var router = require("express").Router();
var db = require("../db");
let data = {};
const upload = require("../middlewares/upload");


router.get("/", (req, res, next) => {
    data.user = req.session.user
    res.render("parties.ejs", {path: "parties", title: "Parties", data})
});

// Handle POST requests to "/party-registration"
router.post("/registration",upload.single("logo"), (req, res, next) => {
    let logo = req.file.filename;
    let { party } = req.body;
  
    db.run(
      "INSERT INTO parties VALUES (?,?,?)",
      [null, party, logo],
      function query(err) {
        if (!err) {
          res.redirect("/parties");
        }
      }
    );
  });

module.exports = router;
