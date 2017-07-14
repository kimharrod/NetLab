// Require mongoose
var mongoose = require("mongoose");

// Create Schema class
var Schema = mongoose.Schema;

// Create slide schema
var SlideSchema = new Schema({

	number: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	structure: {
		type: String,
		required: true
	},
	system: {
		type: String,
		required: true
	},
	stain: {
		type: String
	},
	medium: {
		type: String
	},
	scantype: {
		type: String
	},
	submitter: {
		type: String
	},
	date: {
		type: Date
	}
});

// Create the Slide model with the SlideSchema
var Slide = mongoose.model("Slide", SlideSchema);

// Export the model
module.exports = Slide;