"use strict";

var express = require("express");

var cors = require("cors");

var bodyParser = require("body-parser");

var path = require("path");

var enforce = require('express-sslify');

var session = require("express-session");

var MongoStore = require('connect-mongo')(session);

var mongoose = require('mongoose');

var compression = require("compression");

var connectDB = require('./config/db.js');

var admin = require("firebase-admin");

var serviceAccount = require("./firebase/serviceAccountKey/serviceAccountKey.json");

if (process.env.NODE_ENV !== "production") require("dotenv").config();
var app = express();
var port = process.env.PORT || 5000;
connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

if (process.env.NODE_ENV === "production") {
  app.use(compression()); // app.use(enforce.HTTPS({ trustProtoHeader: true}))

  app.use(express["static"](path.join(__dirname, "client/build")));
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));
app.use('/api', require('./routes/rootRoutes'));
app.listen(port, function (error) {
  if (error) throw error;
  console.log("Server is running 🚀 " + port);
});
app.get('/service-worker.js', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});