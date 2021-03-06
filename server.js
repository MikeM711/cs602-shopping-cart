const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");

const app = express();

// setup handlebars view engine
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// static resources
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// for signed cookies
const credentials = require('./credentials.js');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
 
// cookie-parser first
app.use(cookieParser());
app.use(expressSession(
   {secret: credentials.cookieSecret, resave: false, saveUninitialized: false}));

// Routing
var routes = require("./routes");
app.use("/", routes);

app.use((req, res) => {
  res.status(404);
  res.render("404");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
