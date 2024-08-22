// initial database manager
var sqlite = require("sqlite3").verbose();
var db = new sqlite.Database("./election.db");

module.exports = db