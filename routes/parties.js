var router = require("express").Router();
var db = require("../db");
let data = {};

router.get("/", (req, res, next) => {
    data.user = req.session.user
    res.render("parties.ejs", {path: "parties", title: "Parties", data})
});


module.exports = router;
