var router = require("express").Router();
var db = require("../db");
let data = {};

router.get("/", (req, res, next) => {
    if(req.session.user) {
        res.redirect("/dashboard")
    } else {
        res.render("index.ejs", {path: "home", title: "Home"})
    }
});


module.exports = router;
