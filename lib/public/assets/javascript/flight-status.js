//SETUP VARIABLES
// Creating a timestamp variable
var currentTime = moment().format("h:mm A on ddd, MMM Do"); 

// Note: These are dummy variables for testing; the variables below will be inputed by the user and stored in Firebase
var carrier="WN";
var flight = "1491";
var depAirport = "ATL";
var depDate = "03/23/2017";

// Creating variables to be called later
var splitDepDate = [];
var year = "";
var month = "";
var day = "";

// Creating arrays of the flight status codes and descriptions
var statusCodeArray = ["A", "C", "D", "DN", "L", "NO", "R", "S", "U"];

var statusDescArray = ["Active", "Canceled", "Diverted", "Data source needed", "Landed", "Not operational", "Redirected", "Scheduled", "UnknownTest"];

// Constructing a URL to pull flight info from Flight Status
var appID = "8cdcbe40";
var appKey = "a1f5e6b741ee63d48fe800c2c45b0dad";


//FUNCTIONS
function splitDate() {
  splitDepDate = depDate.split("/");

  year = splitDepDate[2];
  month = splitDepDate[0];
  day = splitDepDate[1];

  console.log("Departure date array: " + splitDepDate);
};

function loadCurrentFlight() {
  splitDate();
  // AJAX GET request
  $.ajax({
    url: "/api/flightstats/flight/status/" + carrier + "/" + flight + "/dep/" + year + "/" + month + "/" + day + "?appId=" + appID + "&appKey=" + appKey + "&utc=false&airport=" + depAirport,
      method: "GET"
  })
  .done(function (response) {
    console.log(response);
    // Deleting the flight info prior to adding new info
    $("#flight-container").empty();
    // Storing an array of results in the results variable
    var results = response.flightStatuses;
    
    for (var i = 0; i < results.length; i++) {
      // Creating a div for the flight(s)
      var flightDiv = $("<div class='flight'>");
      // Creating a header tag with the carrier and flight number
      var h2 = $("<h2>").text("Your upcoming flight: " + carrier + " " + flight);
      // Storing the result item's arrival airport
      var arrAirport = results[i].arrivalAirportFsCode;
      // Creating a header tag with the carrier and flight number
      var airportP = $("<p>").text("Departure airport: " + depAirport + " | Arrival airport: " + arrAirport);
      // Storing the flight status and converting to a defined description
      var statusCode = results[i].status;

      var statusDesc = statusDescArray[statusCodeArray.indexOf(statusCode)];

      // Storing the flight's original departure
      var oDepTime = results[i].operationalTimes.publishedDeparture.dateLocal;
      // Storing the flight's original arrival 
      var oArrTime = results[i].operationalTimes.publishedArrival.dateLocal;
      // Storing the flight's updated departure
      var uDepTime = results[i].operationalTimes.estimatedGateDeparture.dateLocal;
      // Storing the flight's updated arrival 
      var uArrTime = results[i].operationalTimes.estimatedGateArrival.dateLocal;
      
      // Calculating estimated delayed/early arrival **Do we want to store user's next departure time, add warning if first flight will arrive to late, and add another API with flights leaving??
      var arrDelay = moment(uArrTime).diff(moment(oArrTime), "minutes");

      if (arrDelay < 0) {
        var arrEarly = 0 - arrDelay;
        var delayH = $("<h3>").text("Your flight is estimated to arrive " + arrEarly + " minutes early");
      } 
      else {
        var delayH = $("<h3>").text("Your flight is estimated to arrive " + arrDelay + " minutes late");
      };

      console.log("Converted: " + arrDelay);

      // Creating paragraph tags with the flight's status & updated departure/arrival
      var statusH = $("<h3>").text("Flight status: " + statusDesc);
      var depTimeP = $("<p>").text("Updated departure time: " + moment(uDepTime).format("h:mm A on ddd, MMM Do") + " | Original departure time: " + moment(oDepTime).format("h:mm A on ddd, MMM Do"));
      var arrTimeP = $("<p>").text("Updated arrival time: " + moment(uArrTime).format("h:mm A on ddd, MMM Do") + " | Original arrival time: " + moment(oArrTime).format("h:mm A on ddd, MMM Do"));  

      // Appending the flight info to the flightDiv
      flightDiv.append(h2,statusH,delayH,airportP,depTimeP,arrTimeP);

      // Appending the flightDiv to the "#flight-container" div in the HTML
      $("#flight-container").append(flightDiv);
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