


// let infowindow;

// function initMap() {
//   let map = new google.maps.Map(document.getElementById('map'), {
//     mapTypeControl: false,
//     center: {
//       lat: -25.7234,
//       lng: 28.4222
//     },
//     zoom: 14
//   });
//   infowindow = new google.maps.InfoWindow();
//   new AutocompleteDirectionsHandler(map);
// }

// function AutocompleteDirectionsHandler(map) {
//   this.map = map;
//   this.originPlaceId = null;
//   this.destinationPlaceId = null;
//   this.travelMode = 'DRIVING';
//   let originInput = document.getElementById('origin-input');
//   let destinationInput = document.getElementById('destination-input');
//   let modeSelector = document.getElementById('mode-selector');
//   this.directionsService = new google.maps.DirectionsService();
//   this.directionsDisplay = new google.maps.DirectionsRenderer();
//   this.directionsDisplay.setMap(map);

//   let originAutocomplete = new google.maps.places.Autocomplete(
//     originInput, {
//       placeIdOnly: true
//     });
//   let destinationAutocomplete = new google.maps.places.Autocomplete(
//     destinationInput, {
//       placeIdOnly: true
//     });

// //   this.setupClickListener('changemode-walking', 'WALKING');
//   this.setupClickListener('changemode-transit', 'TRANSIT');
//   this.setupClickListener('changemode-driving', 'DRIVING');

//   this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
//   this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
// }

// // Sets a listener on a radio button to change the filter type on Places
// // Autocomplete.
// AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
//   let radioButton = document.getElementById(id);
//   let me = this;
//   radioButton.addEventListener('click', function() {
//     me.travelMode = mode;
//     me.route();
//   });
// };

// AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
//   let me = this;
//   autocomplete.bindTo('bounds', this.map);
//   autocomplete.addListener('place_changed', function() {
//     let place = autocomplete.getPlace();
//     if (!place.place_id) {
//       window.alert("Please select an option from the dropdown list.");
//       return;
//     }
//     if (mode === 'ORIG') {
//       me.originPlaceId = place.place_id;
//     } else {
//       me.destinationPlaceId = place.place_id;
//     }
//     me.route();
//   });

// };

// AutocompleteDirectionsHandler.prototype.route = function() {
//   if (!this.originPlaceId || !this.destinationPlaceId) {
//     return;
//   }
//   let me = this;

//   this.directionsService.route({
//     origin: {
//       'placeId': this.originPlaceId
//     },
//     destination: {
//       'placeId': this.destinationPlaceId
//     },
//     travelMode: this.travelMode
//   }, function(response, status) {
//     if (status === 'OK') {
//       me.directionsDisplay.setDirections(response);
//       var center = response.routes[0].overview_path[Math.floor(response.routes[0].overview_path.length / 2)];
//       infowindow.setPosition(center);
//       infowindow.setContent(response.routes[0].legs[0].duration.text + "<br>" + response.routes[0].legs[0].distance.text);
//       infowindow.open(me.map);
//     } else {
//       window.alert('Directions request failed due to ' + status);
//     }
//   });
// };
// google.maps.event.addDomListener(window, "load", initMap);




// const APIKey = " 519b09bcd038461aa28d5cf702b9e0e9";







































































