var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("node:path");
var db = require("./db");
var port = process.env.PORT || 4500;

// app-wide middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//create database tables
db.serialize(function create() {
  db.run(
    "CREATE TABLE IF NOT EXISTS roles (id INTEGER  PRIMARY KEY AUTOINCREMENT, role VARCHAR(50) NOT NUll)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS auth (id INTEGER  PRIMARY KEY AUTOINCREMENT, username VARCHAR(50) NOT NUll UNIQUE, password VARCHAR(50) NOT NULL, user_id INTEGER)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER  PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(50) NOT NUll, middle_name VARCHAR(50) NULL, last_name VARCHAR(50) NOT NULL, DOB DATE NOT NULL, photo TEXT NULL, role_id INT NOT NULL)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS parties (id INTEGER  PRIMARY KEY AUTOINCREMENT, party VARCHAR(50) NOT NUll, logo TEXT NULL)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS positions (id INTEGER  PRIMARY KEY AUTOINCREMENT, position VARCHAR(50) NOT NUll)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS candidates (id INTEGER  PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(50) NOT NUll, middle_name VARCHAR(50) NULL, last_name VARCHAR(50), position_id INTEGER NOT NULL, party_id INTEGER NOT NULL, photo TEXT NOT NULL)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS votes (id INTEGER  PRIMARY KEY AUTOINCREMENT, candidate_id INTEGER NOT NULL, vote INT NOT NULL)"
  );
});

// require route handlers
var voterRouter = require("./routes/voter");
var partyRouter = require("./routes/party");

// route handler middlewares
app.use("/voters", voterRouter);
app.use("/parties", partyRouter);

// start server
app.listen(port, function lister() {
  console.log(`App is listening at www.localhost:${port}`);
});

