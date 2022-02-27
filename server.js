const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const router = require("./router");
const dotenv = require('dotenv');
const predefinedHeaders = require("./controllers/predefinedHeaders");

// Express Server Instance
const app = express();

// Automatic logging for routing
app.use(logger("dev"));

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Allow Origin


// CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// URL use for Routing start with /api/
app.use("/", router);

// If wrong route or Home page without endpoint
app.use((req, res) => {
  res.status(404);
  res.json({
    header: predefinedHeaders.pageNotFound,
    body: {
      errorMessage: "Please check your URL!",
      path: req.originalUrl,
    },
  });
});

dotenv.config();
// set port
const serverPort = process.env.PORT || 5000;

// start server
app.listen(serverPort, () => {
  console.log(`Express Server Started on port ${serverPort}`);
});

module.exports = app;
