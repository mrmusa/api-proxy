//SETUP VARIABLES
// Creating a variable to store the acess token
var yelpAccessToken = "";

// Note: This is a dummy variable for testing; this will be pulled from Firebase
var depAirport = "ATL";

//FUNCTIONS


//MAIN PROCESSES
$(document).ready(function() {
  // Getting the access token
  $.ajax({
    url: "/api/yelp/oauth2/token",
    method: "POST",
    data: {
      grant_type: "client_credentials",
      client_id: "0ft64AoxvDZLKxt-wb0hbg",
      client_secret: "SsLT6tzxsz9slV8GIeeZrkYVifpYj7QMkAjQh8cK2QnRXlpGcr7chx0J3gYWdNOT"
    }
  })
  .done(function(response) {
    console.log(response);
 
    // update global variable for your accessToken
    yelpAccessToken = response.access_token;

    // AJAX GET request for Yelp restaurants
    $.ajax({
    url: "/api/yelp/v3/businesses/search?categories=restaurants&location=" + depAirport + "&radius=805&limit=5&sort_by=rating&open_now=true",
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
         //Creating an img tag with the restaurant images
        var restaurantImg = $("<img>");
          restaurantImg.attr("src", results[i].image_url);
          restaurantImg.attr("class", "img-responsive");
          restaurantImg.attr("alt", "Responsive image");
        
        // Storing the result item's rating
        var name = results[i].name;
        // Creating a header tag with the result item's name
        var h2 = $("<h2>").text(name);
        
        // Storing the restaurant's rating & creating an img tag with the Yelp branded star ratings 
        var rating = results[i].rating;
        var starsImg = $("<img>");
        
        starsImg.attr("src", "assets/images/yelp_stars/small_" + rating + ".png");
        starsImg.attr("class", "img-responsive");
        starsImg.attr("alt", "Responsive image");
        
        // Storing the result item's review count
        var reviewCount = results[i].review_count;
        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Based on " + reviewCount + " Reviews");

        // Storing the restaurant's URL in the Yelp logo img
        var url = results[i].url;
        
        // Creating a link to the restaurant's review on Yelp
        var link = $("<a>").text("For more information, click here")
        link.attr("href", url);

        // Storing the restaurants location in the airport
        var airportLoc1 = results[i].location.address1;
        var airportLoc2 = results[i].location.address2;
        var p2 = $("<p>").text("Airport location: " + airportLoc1 + ", " + airportLoc2);
        
        // Appending the restuarant info to the restaurantDiv
        restaurantDiv.append(restaurantImg,h2,starsImg,p,link, p2);
          
        // Prepending the restaurantDiv to the "#yelp-container" div in the HTML
        $("#yelp-container").prepend(restaurantDiv);
      };
    });
  }).fail(function (err) {
    console.error(err);
  });
});