var airportName = $("#see-DOM-for-ID"), checkInDate = new Date();
//var searchableDate = moment(checkInDate).format("YYYY-Do-MM"); //is this the correct syntax
//var faaAuth, faaLink;
//var yelpAuth, yelpLink;
//var flightStatusAuth , flightStatusLink
var amadeusAuth = "TppXrVyzrRIqOWzvMyPsAO253AZe9mhK"; /*, amadeusLink = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey="+amadeusAuth
+"&location="+faa.IATA+"&check_in="+searchableDate+"&check_out="+unknown+"&amenity=RESTAURANT&amenity=INTERNET_SERVICES&number_of_results=5";*/
var amadeusLink = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey="+amadeusAuth
+"&location=bos&check_in=2017-03-20&check_out=2017-03-21&amenity=RESTAURANT&amenity=INTERNET_SERVICES&number_of_results=5";

alert("we in here");
//This call must execute on click/after user confirms input.
$.ajax({
	url: amadeusLink,
	method: "GET"
}).done(function(amadeusData){

	console.log("This is the link used in ajax's url: "+amadeusLink);
	console.log("property name: "+amadeusData.results[0].property_name);
	console.log("street address: "+amadeusData.results[0].address.line1);
	console.log("city: "+amadeusData.results[0].address.city);
	console.log("state: "+amadeusData.results[0].address.region);
	console.log("zip code: "+amadeusData.results[0].address.postal_code);
	console.log("country: "+amadeusData.results[0].address.country);
	console.log("price: "+amadeusData.results[0].total_price.amount);
	console.log("currency type: "+amadeusData.results[0].total_price.currency);
	console.log("phone number: "+amadeusData.results[0].contacts[0].detail);
	console.log("check-in: "+amadeusData.results[0].rooms[0].rates[0].start_date);
	console.log("check-out: "+amadeusData.results[0].rooms[0].rates[0].end_date);
	console.log("links for more rooms at this hotel: "+amadeusData.results[0]._links.more_rooms_at_this_hotel.href);
	console.log("hotel rating: "+amadeusData.results[0].awards[0].rating);
	console.log("amenity: "+amadeusData.results[0].amenities[1].description);
	console.log("bed type: "+amadeusData.results[0].rooms[0].room_type_info.bed_type);
	console.log("description: "+amadeusData.results[0].rooms[0].descriptions);
	
	//console.log("link to hotel: "+amadeusData.results[0].images[0]);
	
	
});

