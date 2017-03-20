//SETUP VARIABLES


//FUNCTIONS
function loadWeather() {
  // Constructing a URL to search Yelp for nearby restaurants
  var appID = "8cdcbe40";
  var appKey = "a1f5e6b741ee63d48fe800c2c45b0dad";

  var carrier="AA";
  var flight = "2011";
  var depAirport = "ATL";
  var arrAirport = "DTW";
  var airport = [depAirport, arrAirport];
  var currentHr = "11";
  var arrHr = "13";
  var date;

  var year = "2017";
  var month = "03";
  var day = "20";

  // AJAX GET request **Not currently working
  $.ajax({
    // '/api/flightstats/' + everything in the examples after '/v2/json/' i.e.
    url: '/api/weather/metar/' + depAirport + '?appId=' + appID + '&appKey=' + appKey,
      method: 'GET'
  }).done(function (response) {
    console.log(response);
    // Deleting the weather info prior to adding new ones
    $("#weather-container").empty();
    // Storing an array of results in the results variable
    var results = response.metar;
    
    for (var i = 0; i < results.length; i++) {
      // Creating a div for the flight(s)
      var weatherDiv = $("<div class='flight'>");
      // Creating a header tag with the carrier and flight number
      var h2 = $("<h2>").text(depAirport + "Weather");
      // Storing the result item's temp **will convert to F
      var temp = results[i].temperatureCelsius;
      // Creating a paragraph tag with the result item's temp
      var p = $("<p>").text("Temperature: " + temp);
      // Appending the restuarant info to the restaurantDiv
      weatherDiv.append(h2);
      weatherDiv.append(p);
      // Prepending the weatherDiv to the "#weather-container" div in the HTML
      $("#weather-container").prepend(weatherDiv);
    };
  }).fail(function (err) {
    console.error(err);
  });
}

//MAIN PROCESSES
$(document).ready(function() {
    loadWeather();
});