var router = require("express").Router();
var db = require("../db");

router.get("/registration", (req, res, next) => {
  let data = {};
  db.all("SELECT * FROM roles", (err, rows) => {
    if (!err) {
      data.roles = rows;
      res.render("voter-registration.ejs", {
        title: "Voter Registration",
        data,
      });
    } else {
      console.error(err);
    }
  });
});

router.post("/registration", (req,res)=>{
    console.log(req.body)
})

module.exports = router;
