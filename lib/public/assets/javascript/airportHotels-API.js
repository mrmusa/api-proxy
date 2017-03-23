var airportName = $("#see-DOM-for-ID"), checkInDate = new Date(), checkOutDate = new Date();
var amadeusAuth = "TppXrVyzrRIqOWzvMyPsAO253AZe9mhK"; /*, amadeusLink = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey="+amadeusAuth
+"&location="+faa.IATA+"&check_in="+searchableDate+"&check_out="+unknown+"&amenity=RESTAURANT&amenity=INTERNET_SERVICES&number_of_results=5";*/

//call firebase property to insert into the check in/out query in the link below
var amadeusLink = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey="+amadeusAuth
+"&location=sfo&check_in=2017-03-21&check_out=2017-03-22&amenity=RESTAURANT&amenity=INTERNET_PUBLIC_AREAS&number_of_results=5";


$.ajax({
	url: amadeusLink,
	method: "GET"
}).done(function(amadeusData){

	var hotels = amadeusData.results;

	//firebase variable.ref().on("child_added", function(childSnapshot){

	console.log("This is the link used in ajax's url: "+amadeusLink);
	for (var i = 0; i < hotels.length; i++){

		if(hotels[i].awards[0])
			{
				console.log("hotel rating: "+hotels[i].awards[0].rating);
		}
		if(hotels[i].rooms[0].room_type_info.bed_type)
			{
			console.log("bed type: "+hotels[i].rooms[0].room_type_info.bed_type);
		}
		

		$("#hotelAddress")
		.append(hotels[i].property_name+"<br>"+hotels[i].address.line1+"<br>"+hotels[i].address.city+", "+hotels[i].address.region+
			", "+hotels[i].address.postal_code+"<br>"+hotels[i].address.country+"<br>"+
		"<span><strong>The price of stay: $"+hotels[i].total_price.amount+"</strong></span><br><span>Restaurant and/or internet access at this hotel: "+
		hotels[i].amenities[1].description+".</span><br><span>Summary of room info: "+hotels[i].rooms[0].descriptions+"</span><br><span>Phone number: "+
		hotels[i].contacts[0].detail+"</span><hr>");//figure out how to write hotel ratings and room type if true to DOM
		
		//console.log("link to hotel: "+amadeusData.results[0].images[0]);
	}//});
	
	
});

