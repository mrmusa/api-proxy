//SETUP VARIABLES


//FUNCTIONS
function loadPlaces() {
    // Constructing a URL to search Google for nearby restaurants
    var appKey = "AIzaSyCW3kkw5OegClxMpWC98xmEULMbJx0LGPo";

    var placesQueryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?&rankby=prominence" + "&type=restaurant&key=" + appKey;

    // AJAX GET request
    $.ajax({
            url: placesQueryURL,
            method: "GET"
        })
        .done(function(response) {
            var currentPlaces = response.data;
            console.log(response);
            

        })
}

//MAIN PROCESSES
$(document).ready(function() {

    loadPlaces();
});