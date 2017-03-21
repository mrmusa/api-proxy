var airportName = $("#see-DOM-for-ID");
var checkInDate = new Date();
//var searchableDate = moment(checkInDate).format("YYYY-Do-MM"); //is this the correct syntax
//var faaAuth, faaLink;
//var yelpAuth, yelpLink;
//var flightStatusAuth , flightStatusLink
var amadeusAuth = "TppXrVyzrRIqOWzvMyPsAO253AZe9mhK"; /*, amadeusLink = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey="+amadeusAuth
+"&location="+faa.IATA+"&check_in="+searchableDate+"&check_out="+unknown+"&amenity=RESTAURANT&amenity=INTERNET_SERVICES&number_of_results=5";*/
var amadeusLink = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey="+amadeusAuth
+"&location=bos&check_in=2017-03-18&check_out=2017-03-19&amenity=RESTAURANT&amenity=INTERNET_SERVICES&number_of_results=5";

alert("we in here");

$.ajax({
	url: amadeusLink,
	method: "GET"
}).done(function(amadeusData){

	console.log("This is the link used in ajax's url: "+amadeusLink);
	console.log("property name: "+amadeusData.results[0].property_name);
	console.log("price: "+amadeusData.results[0].total_price.amount);
	console.log("daily rate: "+amadeusData.results[0].min_daily_rate);
	console.log("location: "+amadeusData.results[0].location);
	console.log("description: "+amadeusData.results[0].description);
	console.log("link to hotel: "+amadeusData.results[0].images[0].url);
	console.log("room rates: "+amadeusData.rates[0].price);
	console.log("bed type: "+amadeusData.descriptions[0].room_type_info.bed_type);
	console.log("number of beds: "+amadeusData.descriptions[0].room_type_info.number_of_beds);
});

