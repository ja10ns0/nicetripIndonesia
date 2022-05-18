// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCwUY8CdCAJaYfILe8CQz4bC-zGYgIz9NQ&callback=initMap';
script.defer = true;
    
// Attach your callback function to the `window` object
window.initMap = function() {
  selectedDay = 0;
  // Initilize map centered at Jakarta
  map = new google.maps.Map(document.getElementById("map"), {
    center: arrDay[0]['locations'][0],
    zoom: 2,
    disableDefaultUI: true
  });

  // Set markers for day 1
  setMarkers(arrDay[selectedDay]);
};
    
// Append the 'script' element to 'head'
document.head.appendChild(script);

import data from "./data.json" assert { type: "json" };

var arrDay = JSON.parse(JSON.stringify(data));

var map;

var markers = [];

var selectedDay;

function setMarkers(day) {
  var bounds = new google.maps.LatLngBounds;

  day['locations'].forEach((location, i) => {
    let marker = new google.maps.Marker({
      position: location,
      map: map,
      title: location.name,
      label: '' + (i + 1)
    });
    marker.addListener("click", () => {
      console.log('dsd');
      // Get the modal
      var modal = document.getElementById("modal-location");
      modal.classList.toggle('visible');
      let backBtn = modal.querySelector('span.btn-back');
      backBtn.addEventListener('click',() => {
        console.log('click location modal');
        modal.classList.remove('visible');
      });
      modal.querySelector('img').src = location['img'];
      modal.querySelector('.title').innerHTML = location['label'];
      modal.querySelector('.description').innerHTML = location['description'];
    });
    bounds.extend(new google.maps.LatLng(location));    
    markers.push(marker);
  });

  map.fitBounds(bounds);

  updateInfo(day, configLocationModal);

}

// Modal location
function configLocationModal() {
  // Get the modal
  var modal = document.getElementById("modal-location");
  // Get the button that opens the modal
  var stages = document.querySelectorAll('.stage');
  stages.forEach((stage, day) => {
    var orderLocation = stage.getAttribute('data-order-location');
    stage.addEventListener('click', function(event) {
      modal.classList.toggle('visible');
      let backBtn = modal.querySelector('span.btn-back');
      backBtn.addEventListener('click',() => {
        console.log('click location modal');
        modal.classList.remove('visible');
      });
      var location = arrDay[selectedDay]['locations'][orderLocation - 1];
      modal.querySelector('img').src = location['img'];
      modal.querySelector('.title').innerHTML = location['label'];
      modal.querySelector('.description').innerHTML = location['description'];
    })
  });

}

function updateInfo(day, callback) {
  // Update info (day)
  var infoDay = document.querySelector('#day');
  var infoDate = document.querySelector('#date');
  var infoIsland = document.querySelector('#island');
  infoDay.innerHTML = "Día " + day['order'];
  infoDate.innerHTML = day['date'];
  infoIsland.innerHTML = day['island'];
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
                                .replace(/{{type}}/g, location["type"])
                                .replace(/{{label}}/g, location["label"]);
  });
  // Replace the HTML of #list with final HTML
  document.getElementById("info__planning").innerHTML = infoPlanning;

  if (callback && typeof callback === 'function') {
    callback();
  }
}

function moveDay(param) {
  // Loop through markers and set map to null for each
  for (var i=0; i<markers.length; i++) {
      markers[i].setMap(null);
  }
  // Reset the markers array
  markers = [];
  selectedDay = selectedDay + param;
  // Call set markers to re-add markers
  setMarkers(arrDay[selectedDay]);

}

// Bind event listener on button to reload markers
document.getElementById('next').addEventListener('click', function(){
  moveDay(1);
});
document.getElementById('prev').addEventListener('click', function(){
  moveDay(-1);
});

// Modal info
let infoBtn = document.getElementById('info');
infoBtn.addEventListener('click',() => {
  const modalInfo = document.getElementById('modal-info');
  configInfoModal(modalInfo, (selectedDay + 1));
})

function configInfoModal(modal, day) {
  console.log('f', (selectedDay + 1 ));
  var templateId = 'template-info-day-' + (selectedDay + 1); 
  var template = document.getElementById(templateId);
  var templateHtml = template.innerHTML;
  modal.innerHTML = templateHtml;
  modal.classList.toggle('visible');
  let backBtn = modal.querySelector('span.btn-back');
  backBtn.addEventListener('click',() => {
    modal.classList.remove('visible');
  });
}