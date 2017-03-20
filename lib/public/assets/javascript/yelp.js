//SETUP VARIABLES
var yelpAccessToken = "";

//FUNCTIONS


//MAIN PROCESSES
$(document).ready(function() {
  // Getting the access token
  $.ajax({
    url: '/api/yelp/oauth2/token',
    method: 'POST',
    data: {
      grant_type: "client_credentials",
      client_id: "0ft64AoxvDZLKxt-wb0hbg",
      client_secret: "SsLT6tzxsz9slV8GIeeZrkYVifpYj7QMkAjQh8cK2QnRXlpGcr7chx0J3gYWdNOT"
    }
  }).done(function(response) {
    console.log(response);
 
    // update global variable for your accessToken
    yelpAccessToken = response.access_token;

    // AJAX GET request for Yelp restaurants
    $.ajax({
    url: "/api/yelp/v3/businesses/search?term=restaurant&location=ATL&radius=805&limit=5&sort_by=rating&open_now=true",
    method: "GET",
      headers: {
        Authorization: "Bearer " + yelpAccessToken
      }
    }).done(function(response) {
      console.log(response);
      // Deleting the restaurants prior to adding new ones
      $("#yelp-container").empty();
      // Storing an array of results in the results variable
      var results = response.businesses;

      for (var i = 0; i < results.length; i++) {
        // Creating a div for the Yelp suggestions
        var restaurantDiv = $("<div class='restaurant'>");
        // Storing the result item's rating
        var name = results[i].name;
        // Creating a header tag with the result item's name
        var h2 = $("<h2>").text(name);
        // Storing the result item's rating
        var rating = results[i].rating;
        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + rating);
        // Appending the restuarant info to the restaurantDiv
        restaurantDiv.append(h2);
        restaurantDiv.append(p);
        // Prepending the restaurantDiv to the "#yelp-container" div in the HTML
        $("#yelp-container").prepend(restaurantDiv);
      };
    });
  }).fail(function (err) {
    console.error(err);
  });
});