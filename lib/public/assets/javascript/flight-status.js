//SETUP VARIABLES


//FUNCTIONS
function loadCurrentFlight() {
  // Constructing a URL to search Yelp for nearby restaurants
  var appID = "8cdcbe40";
  var appKey = "a1f5e6b741ee63d48fe800c2c45b0dad";

  var carrier="AA";
  var flight = "2011";
  var depAirport = "ATL";
  var date;

  var year = "2017";
  var month = "03";
  var day = "20";

  // AJAX GET request
  $.ajax({
    // '/api/flightstats/' + everything in the examples after '/v2/json/' i.e.
    url: '/api/flightstats/flight/status/' + carrier + '/' + flight + '/dep/' + year + '/' + month + '/' + day + '?appId=' + appID + '&appKey=' + appKey + '&utc=false&airport=' + depAirport,
      method: 'GET'
  }).done(function (response) {
    console.log(response);
    // Deleting the restaurants prior to adding new ones
    $("#flight-container").empty();
    // Storing an array of results in the results variable
    var results = response.flightStatuses;
    
    for (var i = 0; i < results.length; i++) {
      // Creating a div for the flight(s)
      var flightDiv = $("<div class='flight'>");
      // Creating a header tag with the carrier and flight number
      var h2 = $("<h2>").text(carrier + flight);
      // Storing the result item's arrival airport
      var arrAirport = results[i].arrivalAirportFsCode;
      // Creating a header tag with the carrier and flight number
      var h3 = $("<h3>").text("Departure airport: " + depAirport + " Arrival airport: " + arrAirport);
      // Storing the result item's flight status
      var status = results[i].status;
      // Storing the result item's flight departure **will convert times
      var depTime = results[i].operationalTimes.scheduledGateDeparture.dateLocal;
      // Storing the result item's flight arrival * will convert times
      var arrTime = results[i].operationalTimes.scheduledGateArrival.dateLocal;
      // Creating a paragraph tag with the result item's rating & updated departure/arrival
      var p1 = $("<p>").text("Flight status: " + status);
      var p2 = $("<p>").text("Current departure time: " + depTime + " Current arrival time: " + arrTime);
      // Appending the restuarant info to the restaurantDiv
      flightDiv.append(h2);
      flightDiv.append(h3);
      flightDiv.append(p1);
      flightDiv.append(p2);
      // Will add connections info for if flight is cancelled or delayed


      // Prepending the flightDiv to the "#flight-container" div in the HTML
      $("#flight-container").prepend(flightDiv);
    };
  }).fail(function (err) {
    console.error(err);
  });
}

//MAIN PROCESSES
$(document).ready(function() {
    loadCurrentFlight();
});