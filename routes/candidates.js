var router = require("express").Router();
var db = require("../db");
let data = {};

router.get("/", (req, res, next) => {
    data.user = req.session.user
    res.render("candidates.ejs", {path: "candidates", title: "Candidates", data})
});


module.exports = router;
