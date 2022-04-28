// Initialize and add the map
function initMap() {
  // The location of Jakarta
  const arrLocations1 = [
    { 
      name: 'Jakarta',
      lat: -6.19138433712882, 
      lng: 106.8440013947889 
    },
    {
      name: 'Yogjakarta',
      lat: -7.7956781393307955,
      lng: 110.37015555608066
    },
    {
      name: 'Ratu Boko',
      lat: -7.744917827384563,
      lng: 110.48291270045232
    }
  ];
  const arrLocations2 = [
    { 
      name: 'Borneo',
      lat: -2.7309635230030707, 
      lng: 111.73217292223129
    }
  ];

  var markers = [];

  // The map, centered at Jakarta
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4
  });

  const bounds = new google.maps.LatLngBounds();

  arrLocations1.forEach(location => {
    let marker = new google.maps.Marker({
      position: location,
      map: map,
      title: location.name
    });
    markers.push(marker);
    bounds.extend(location);
  });

  map.fitBounds(bounds);
  map.panToBounds(bounds);

  // Bind event listener on button to reload markers
  document.getElementById('changeDay').addEventListener('click', reloadMarkers);

}

window.initMap = initMap;