
import data from "./data.json" assert { type: "json" };

var arrDay = JSON.parse(JSON.stringify(data));

var map;

var markers = [];

var selectedDay = 0;

function setMarkers(day) {
  
  var bounds = new google.maps.LatLngBounds;

  day['locations'].forEach(location => {
    let marker = new google.maps.Marker({
      position: location,
      map: map,
      title: location.name
    });
    bounds.extend(new google.maps.LatLng(location));    
    markers.push(marker);
  });

  map.fitBounds(bounds);

  // Update info (day)
  var infoDate = document.querySelector('#date');
  infoDate.innerHTML = "Día " + day['order'] + " - " + day['date'];
  // Update info (planning)
  // Cache of the template
  var template = document.getElementById("template-info-planning");
  // Get the contents of the template
  var templateHtml = template.innerHTML;
  // Final HTML variable as empty string
  var infoPlanning = "";
  // Loop through dataObject
  day['locations'].forEach(function (location, index) {
    infoPlanning += templateHtml.replace(/{{order}}/g, index + 1)
                                .replace(/{{label}}/g, location["label"]);
  });
  // Replace the HTML of #list with final HTML
  document.getElementById("info__planning").innerHTML = infoPlanning;
}

function moveDay(param) {

  console.log('markers', markers);
  // Loop through markers and set map to null for each
  for (var i=0; i<markers.length; i++) {
      markers[i].setMap(null);
  }
  
  // Reset the markers array
  markers = [];
  console.log('selected day', selectedDay);
  selectedDay = selectedDay + param;
  console.log('selected day mow', selectedDay);
  
  // Call set markers to re-add markers
  setMarkers(arrDay[selectedDay]);
  
}

function initMap() {

  // Initilize map centered at Jakarta
  map = new google.maps.Map(document.getElementById("map"), {
    center: arrDay[0]['locations'][0],
    zoom: 6,
  });

  // Set markers for day 1
  setMarkers(arrDay[selectedDay]);

}

// Bind event listener on button to reload markers
document.getElementById('next').addEventListener('click', function(){
  moveDay(1);
});
document.getElementById('prev').addEventListener('click', function(){
  moveDay(-1);
});

window.initMap = initMap;