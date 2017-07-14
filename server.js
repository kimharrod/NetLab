// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Make use of native Promises that ES6 provides
mongoose.promise = Promise;

// Require the Slide model
var Slide = require(".models/slide.js");

// Initialize Express
var dbapp = express();
var PORT = process.env.PORT || 8028;

// Use morgan and body parser
dbapp.use(logger("dev"));
dbapp.use(bodyParser.urlencoded({
	extended: false
}));

// Make public a static directory
dbapp.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/histoslides");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
	console.log("Mongoose error: ", error);
});

// When successfully logged in to the db via mongoose, log message
db.once("open", function() {
	console.log("Mongoose connection successful.");
});

// Routes


// Start the server to begin listening
dbapp.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});
