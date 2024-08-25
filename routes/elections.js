var router = require("express").Router();
var db = require("../db");
let data = {};

router.get("/", (req, res, next) => {
    data.user = req.session.user
    res.render("elections.ejs", {path: "elections", title: "Elections", data})
});


module.exports = router;
