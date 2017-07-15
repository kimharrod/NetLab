// Helper function to fetch slides from MongoDB
var helpers = {

	getSlides: () => {

		return $.ajax({
			url: '/api/slides/',
			type: 'get'
			})
			.done(function(data) {


			var slides = [];

				Object.keys(data).map(function(s){
					slides.push({
		                number: data[s].number,
		                category: data[s].category,
		                system: data[s].system,
		                structure: data[s].structure,
		                id: data[s]._id

	              	});
	            });

			// return the slide array back to the calling function
			return slides;

			}); // end .done (ajax callback)
			
	}, // end getSlides

}; // end helpers

// Export the helpers object
module.exports = helpers;