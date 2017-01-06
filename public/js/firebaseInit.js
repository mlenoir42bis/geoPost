var config = {
  apiKey: "AIzaSyDXwHfSto_TLpLgcnnkyVdQ0ZJlyikChSE",
  authDomain: "geoneed-ffb28.firebaseapp.com",
  databaseURL: "https://geoneed-ffb28.firebaseio.com",
  storageBucket: "geoneed-ffb28.appspot.com",
  messagingSenderId: "528700744057"
};

firebase.initializeApp(config);

var provider = new firebase.auth.FacebookAuthProvider();

function facebookSignin() {
  console.log('signIn');
   firebase.auth().signInWithPopup(provider)
   .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(token)
      console.log(user)

   }).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
   });
}

var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
  console.log('signIn');
   firebase.auth().signInWithPopup(provider)
   .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(token)
      console.log(user)
   }).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
   });
}

function signout() {
  console.log('signOut');
   firebase.auth().signOut()
   .then(function() {
      console.log('Signout successful!')
   }, function(error) {
      console.log('Signout failed')
   });
}

var database = firebase.database();
