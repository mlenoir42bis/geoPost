function initialize() {
  // initialize map
  var paris = { lat: 48.862725, lng: 2.287592 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: paris
  });

  // initialize all marker
  firebase.database().ref('token').on('value', function(snapshot) {
    var token = snapshot.val();
    for (var prop in token) {
      obj = token[prop];
      setMarkers(map, obj);
    }
  });

  // Event listener when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    var user = firebase.auth().currentUser;
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();

    if (user) {
      var title = document.getElementById('title').value;
      var objet = document.getElementById('objet').value;

      if (!title || !objet){
        alert("Title and subject are mandatory");
      }
      else{
        var data = {
          name : user.displayName,
          email : user.email,
          photoUrl : user.photoURL,
          title : title,
          objet : objet,
          lng : lng,
          lat : lat,
          mydate : Date.now()
        }

        firebase.database().ref("token").push(data);
        setMarkers(map, data);
      }
    }
    else {
      alert("You must be logged in to place an item !");
    }
  });
}

function setMarkers(map, data){
  latlngset = new google.maps.LatLng(data.lat, data.lng);
  var marker = new google.maps.Marker({
    map: map, position: latlngset
  });

  var content = "<table><tr><td><img src='" + data.photoUrl +
  "'>Par : " + data.name + "</td></tr>" + "<tr><td><h3 class='text-center'>" +
  data.title + "</h3>" + data.objet + "</td></tr></table>";

  var infowindow = new google.maps.InfoWindow()
  google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ return function() {
      infowindow.setContent(content);
      infowindow.open(map,marker);
    };
  })(marker,content,infowindow));
}

google.maps.event.addDomListener(window, 'load', initialize);
