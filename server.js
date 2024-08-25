var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("node:path");
var session = require("express-session");
var db = require("./db");
var port = process.env.PORT || 4500;
var SQLiteStore = require("connect-sqlite3")(session)

// app-wide middlewares

app.use(
  session({
    store: new SQLiteStore,
    secret: "RSTUVWXYZabcdefghijklmyz0123456789!@#$%^&*()_+[]{}|;:,.<>?",
    resave: true,
    saveUninitialized: false,
    cookie: { 
      secure: false, 
      // maxAge: 7*24*60*60*1000, //1 week
      maxAge: 60*60*1000, //1 min
    },
  })
);
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
var dashboardRouter = require("./routes/dashboard");
var voteRouter = require("./routes/vote");
var loginRouter = require("./routes/login");
var logoutRouter = require("./routes/logout");
var electionsRouter = require("./routes/elections");
var partiesRouter = require("./routes/parties");
var candidatesRouter = require("./routes/candidates");

// require middlewares
var restrict = require("./middlewares/restrict");

// route handler middlewares
app.use("/dashboard", restrict, dashboardRouter);
app.use("/parties", restrict, partyRouter);
app.use("/logout", restrict, logoutRouter);
app.use("/votes", restrict, voteRouter);
app.use("/voters", voterRouter);
app.use("/login", loginRouter);
app.use("/elections", electionsRouter);
app.use("/parties", partiesRouter);
app.use("/candidates", candidatesRouter);

// start server
app.listen(port, function lister() {
  console.log(`App is listening at http//localhost:${port}`);
});
