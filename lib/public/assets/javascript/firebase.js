var config = {
    apiKey: "AIzaSyCElE1dM3EpZqMtruXeUm-AaKAVpcwDfrI",
    authDomain: "delayed-da2a0.firebaseapp.com",
    databaseURL: "https://delayed-da2a0.firebaseio.com",
    storageBucket: "delayed-da2a0.appspot.com",
    messagingSenderId: "922822256464"
};

firebase.initializeApp(config);

var db = firebase.database();

var uiConfig = {
    //TODO: https://gt-delayed.herokuapp.com/
    signInSuccessUrl: 'http://localhost:1337',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: 'https://gt-delayed.herokuapp.com/'
};

function checkFlight(user) {
    db.ref('/users').once('value', function(snapshot) {
        if (snapshot.val().inProgress === true) {
            //Load data from firebase into DOM if there is a flight in progress i.e. current time is less than expected departure
        } else {
            //If no current flight info bring up form to input flight details
            getFlight();
        }
    })
}

function getFlight() {
    //Pull in fliight and user info from form and push to firebase
}

function setFlight(user, name) {
    db.ref('/users').child(user).set({
        name: name,
        UID: user,
        flightNum: 1894,
        delayTime: 25,
        inProgress: false
    })
}

// Initialize the FirebaseUI Widget using Firebase.
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var userID = firebase.auth().currentUser.uid;
        var displayName = firebase.auth().currentUser.displayName;
        //TODO: Check old flight info
        checkFlight(userID);
        //TODO: Push flight details to firebase
        setFlight(userID, displayName);
    } else {
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
    }
});

//Listen for flight details to be updated and insert them into DOM
db.ref('/users/' + userID).on('value', function(snapshot) {

})
