const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const enforce = require('express-sslify');
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')
const compression =require("compression")
const connectDB =require ('./config/db.js')
const admin = require("firebase-admin");
const serviceAccount = require("./firebase/serviceAccountKey/serviceAccountKey.json");

if (process.env.NODE_ENV !== "production") require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
connectDB()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});
if (process.env.NODE_ENV === "production") {
  app.use(compression());
  // app.use(enforce.HTTPS({ trustProtoHeader: true}))
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
app.use(session({
  secret:process.env.SECRET_KEY,
  resave:false,
  saveUninitialized:true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server is running 🚀 " + port);
});

app.use('/api', require('./routes/rootRoutes'));
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname,'..','build','service-worker.js'));
})
