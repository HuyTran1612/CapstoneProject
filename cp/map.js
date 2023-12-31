function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: 10.850788, lng: 106.772574 },
  });
  const geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();

  document.getElementById("submit").addEventListener("click", () => {
    geocodeLatLng(geocoder, map, infowindow);
  });
}

function geocodeLatLng(geocoder, map, infowindow) {
  const input = document.getElementById("latlng").value;
  const latlngStr = input.split(",", 2);
  const latlng = {
    lat: parseFloat(latlngStr[0]),
    lng: parseFloat(latlngStr[1]),
  };

  geocoder
    .geocode({ location: latlng })
    .then((response) => {
      if (response.results[0]) {
        map.setZoom(11);

        const marker = new google.maps.Marker({
          position: latlng,
          map: map,
        });

        infowindow.setContent(response.results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
}

window.initMap = initMap;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_4lSx3bj__-Es1hJHQNI81y6-HKTd0ZU",
  authDomain: "capstone-project-2023a.firebaseapp.com",
  databaseURL: "https://capstone-project-2023a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "capstone-project-2023a",
  storageBucket: "capstone-project-2023a.appspot.com",
  messagingSenderId: "850401488569",
  appId: "1:850401488569:web:68c9ff5c76f1683c133568",
  measurementId: "G-D78Z0M4MV8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Reference to the "geographyText" node in Firebase
var geographyTextRef = database.ref('capstone/toa_do_may_1');

// Listen for changes in the database and update the text box accordingly
geographyTextRef.on('value', (snapshot) => {
  const geographyText = snapshot.val();
  // Add the retrieved text to the text box with id "geographyTextBox"
  document.getElementById("latlng").value = geographyText;
});

//Den 01
var btnOn = document.getElementById("btnOnId_01");
var btnOff = document.getElementById("btnOffId_01");

// Auto load new Led
firebase.database().ref("capstone/SOS").on("value",function(snapshot){
  var ss = snapshot.val();  
 if (ss=='a'){
  document.getElementById("denId_01").src = "./img/light_on.png"
  alert("SOS");}
 else
 document.getElementById("denId_01").src = "./img/light_off.png"
});