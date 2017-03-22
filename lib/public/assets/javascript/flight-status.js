//SETUP VARIABLES
var currentTime = moment().format('h:mm A on ddd, MMM Do');
var layoverFlightDep = "8:00"; 

//FUNCTIONS
function loadCurrentFlight() {
  // Constructing a URL to search Yelp for nearby restaurants
  var appID = "8cdcbe40";
  var appKey = "a1f5e6b741ee63d48fe800c2c45b0dad";

  //Note: These are dummy variables for testing; the variables below will be inputed by the user and stored in Firebase
  var carrier="AA";
  var flight = "2011";
  var depAirport = "ATL";

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
      var h2 = $("<h2>").text("Your upcoming flight: " + carrier + flight);
      // Storing the result item's arrival airport
      var arrAirport = results[i].arrivalAirportFsCode;
      // Creating a header tag with the carrier and flight number
      var h3 = $("<h3>").text("Departure airport: " + depAirport + " | Arrival airport: " + arrAirport);
      // Storing the flight status
      var status = results[i].status;
      // Storing the flight's original departure
      var oDepTime = results[i].operationalTimes.flightPlanPlannedDeparture.dateLocal;
      // Storing the flight's original arrival 
      var oArrTime = results[i].operationalTimes.flightPlanPlannedArrival.dateLocal;
      // Storing the flight's updated departure
      var uDepTime = results[i].operationalTimes.estimatedGateDeparture.dateLocal;
      // Storing the flight's updated arrival 
      var uArrTime = results[i].operationalTimes.estimatedGateArrival.dateLocal;
      // **Will calculate current est. delays; if they are greater than the time to next flight from now, will have warning **Do we want to add another API with flights leaving??
     
      // Creating a paragraph tag with the result item's rating & updated departure/arrival
      var p1 = $("<p>").text("Flight status: " + status);
      var p2 = $("<p>").text("Updated departure time: " + moment(uDepTime).format("h:mm A on ddd, MMM Do") + " | Original departure time: " + moment(oDepTime).format("h:mm A on ddd, MMM Do"));
      var p3 = $("<p>").text("Updated arrival time: " + moment(uArrTime).format("h:mm A on ddd, MMM Do") + " | Original arrival time: " + moment(oArrTime).format("h:mm A on ddd, MMM Do"));  

      // Appending the flight info to the flightDiv
      flightDiv.append(h2,h3,p1,p2,p3);
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
    console.log(currentTime);
});