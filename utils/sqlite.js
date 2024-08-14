const sqlite3 = require("sqlite3").verbose();
const sqlite = new sqlite3.Database("./elections.db");

module.exports = sqlite