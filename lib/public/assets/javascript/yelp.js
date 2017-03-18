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
    url: "/api/yelp/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972",
    method: "GET",
      headers: {
        Authorization: "Bearer " + yelpAccessToken
      }
    }).done(function(response) {
      $("#yelp").html(JSON.stringify(response, null, 2));
    });
  }).fail(function (err) {
    console.error(err);
  });
});