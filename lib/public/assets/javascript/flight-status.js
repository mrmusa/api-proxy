//SETUP VARIABLES


//FUNCTIONS
function loadCurrentFlight() {
    // Constructing a URL to search Yelp for nearby restaurants
    var appID = "8cdcbe40";
    var appKey = "a1f5e6b741ee63d48fe800c2c45b0dad";

    var carrier="AA";
    var flight = "2011";
    var date;

    var year = "2017";
    var month = "03";
    var day = "17";

    var flightQueryURL = "https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/" + carrier + "/" + flight + "/dep/" + year + "/" + month + "/" + day + "?appId=" + appID + "&appKey=" + appKey + "&utc=false&airport=ATL";

    // AJAX GET request
    $.ajax({
            url: flightQueryURL,
            method: "GET"
        })
        .done(function(response) {
            var currentFlightResults = response.data;
            console.log(response);
            $("#flight-div").html(currentFlightResults.operationalTimes.publishedArrival);
        })
}

//MAIN PROCESSES
$(document).ready(function() {
    console.log("Page loaded");
    loadCurrentFlight();
});