// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Make use of native Promises that ES6 provides
mongoose.promise = Promise;

// Require the Slide model
var Slide = require("./models/slide.js");

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

// Route to retrieve list of slides from the MongoDB
dbapp.get("/api/slides/", function(req, res) {

	Slide.find({}, function(error, doc) {

		//Log any errors
		if (error) {
			console.log(error);
		}
		else {
			res.json(doc);
		}
	});
});

// Route to seed the slide db
dbapp.get("/api/seed", function(req, res) {

	// make an array of slide objects to seed the database
	var seedSlides = [
	
		{number: '66703', 
		 category: 'Histology', 
		 structure: 'Ear Bone (Chinchilla)', 
		 system: 'Auditory System'},

		{number: '66540', 
		 category: 'Histology', 
		 structure: 'Inner Ear (Chinchilla)', 
		 system: 'Auditory System'},

		{number: '66686', 
		 category: 'Histology', 
		 structure: 'Heart Ventricle', 
		 system: 'Cardiovascular System'},

		{number: '66471', 
		 category: 'Histology', 
		 structure: 'Purkinje Fibers', 
		 system: 'Cardiovascular System'},

		{number: '66419', 
		 category: 'Histology', 
		 structure: 'Semilunar Valve', 
		 system: 'Cardiovascular System'},	

		{number: '67603', 
		 category: 'Histology', 
		 structure: 'Vena Cava', 
		 system: 'Cardiovascular System'},			 		 		 

		{number: '66500', 
		 category: 'Histology', 
		 structure: 'Ilium (Dog)', 
		 system: 'Digestive System'},

		{number: '66578', 
		 category: 'Histology', 
		 structure: 'Jejunum (Dog)', 
		 system: 'Digestive System'},

		{number: '66532', 
		 category: 'Histology', 
		 structure: 'Liver (Dog)', 
		 system: 'Digestive System'},

		{number: '66570', 
		 category: 'Histology', 
		 structure: 'Pancreas (Dog)', 
		 system: 'Digestive System'},

		{number: '66418', 
		 category: 'Histology', 
		 structure: 'Adrenal Gland (Monkey)', 
		 system: 'Endocrine System'},

		{number: '66368', 
		 category: 'Histology', 
		 structure: 'Thyroid (Human)', 
		 system: 'Endocrine System'},

		{number: '66817', 
		 category: 'Histology', 
		 structure: 'Simple Columnar Epithelium', 
		 system: 'Epithelial Tissues'},

		{number: '66821', 
		 category: 'Histology', 
		 structure: 'Stratified Squamous Epithelium', 
		 system: 'Epithelial Tissues'},

		{number: '66398', 
		 category: 'Histology', 
		 structure: 'Lymph Node (Human)', 
		 system: 'Lymphoid Tissues and Organs'}];

	
		for (i=0; i < seedSlides.length; i++) {

        	var newSlide = new Slide(seedSlides[i]);

        	newSlide.save(function(error, doc) {

				// Log any errors
				if (error) {
					console.log(err);
				}
			});

		} //end for all seedSlides
				
}); // end seed route

// Root route
dbapp.get('/', (req,res) => {
	res.send(__dirname + '/public/index.html');
});

// Start the server to begin listening
dbapp.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});
