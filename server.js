var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var port = 3000;
var session = require("express-session");
const SECRET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";

app.use(
  session({
    secret: SECRET, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if you're using HTTPS
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

var indexRoutes = require("./routes/index-route");
var voterRoutes = require("./routes/voters-route");
var partiesRoutes = require("./routes/parties-route");
var electionsRoutes = require("./routes/elections-routes");
var candidatesRoutes = require("./routes/candidates-routes");
var votesRoutes = require("./routes/votes-routes");
var usersRoutes = require("./routes/users-routes");
var db = require("./utils/db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS auth (id INTEGER  PRIMARY KEY AUTOINCREMENT, username VARCHAR(50) NOT NUll UNIQUE, password VARCHAR(50) NOT NULL, user_id INTEGER)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS roles (id INTEGER  PRIMARY KEY AUTOINCREMENT, role VARCHAR(50) NOT NUll)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER  PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(50) NOT NUll, middle_name VARCHAR(50) NULL, last_name VARCHAR(50) NOT NULL, DOB DATE NOT NULL, photo BLOB NULL, role_id INT NOT NULL)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS parties (id INTEGER  PRIMARY KEY AUTOINCREMENT, party VARCHAR(50) NOT NUll, logo BLOB NULL)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS positions (id INTEGER  PRIMARY KEY AUTOINCREMENT, position VARCHAR(50) NOT NUll)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS candidates (id INTEGER  PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(50) NOT NUll, middle_name VARCHAR(50) NULL, last_name VARCHAR(50), position_id INTEGER NOT NULL, party_id INTEGER NOT NULL, photo BLOB NOT NULL)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS votes (id INTEGER  PRIMARY KEY AUTOINCREMENT, candidate_id INTEGER NOT NULL, vote INT NOT NULL)"
  );
});

// ROUTES HANDLERS
app.use("/", indexRoutes);
app.use("/voters", voterRoutes);
app.use("/parties", partiesRoutes);
app.use("/elections", electionsRoutes);
app.use("/candidates", candidatesRoutes);
app.use("/votes", votesRoutes);
app.use("/users", usersRoutes);

app.listen(port, () => {
  console.log(`App is listening to port http://localhost:${port}`);
});
