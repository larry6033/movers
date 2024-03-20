
const names = document.querySelector(".name");
console.log(names);
const email = document.querySelector(".email");
console.log(email);
const phoneNumber = document.querySelector(".phone");
console.log(phoneNumber);
const vehicles = document.querySelector(".vehicle");
console.log(vehicles);
let inputPress = document.querySelector(".btn");
console.log(inputPress);



let color = ["red", "blue", "green"];
let directions = [];
let shortest = [];
let fastest = [];
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
  });

  let endInput = document.getElementById("end");
  let startValue, endValue;
  let startInput = document.getElementById("start");

  let startAutocomplete = new google.maps.places.Autocomplete(startInput);
  let endAutocomplete = new google.maps.places.Autocomplete(endInput);

  startAutocomplete.addListener("place_changed", function () {
    startValue = startAutocomplete.getPlace().formatted_address;
  });

  endAutocomplete.addListener("place_changed", function () {
    endValue = endAutocomplete.getPlace().formatted_address;
  });

  let markers = [];
  let directionsService = new google.maps.DirectionsService();
  let directionsRenderer = new google.maps.DirectionsRenderer();

  document
    .getElementById("calculateDistance")
    .addEventListener("click", function () {
      for (let i = 0; i < directions.length; i++) {
        directions[i].setMap(null);
      }
      directions = [];
      shortest = [];
      fastest = [];
      for (let i = 0; i < color.length; i++) {
        //   document.getElementById(color[i]).value = "";
      }
      showAlternativeRoutes(
        directionsService,
        directionsRenderer,
        startValue,
        endValue
      );
    });
}

function showAlternativeRoutes(
  directionsService,
  directionsRenderer,
  startValue,
  endValue
) {
  console.log(startValue);
  directionsService.route(
    {
      origin: startValue,
      destination: endValue,
      travelMode: "DRIVING",
      provideRouteAlternatives: true,
    },
    function (response, status) {
      // console.log(response)
      if (status === "OK") {
        for (let i = 0; i < response.routes.length; i++) {
          console.log(response.routes[i].legs[0].distance);
          shortest.push(response.routes[i].legs[0].distance.value);
          fastest.push(response.routes[i].legs[0].duration.value);
        }
        shortest.sort(function (a, b) {
          return a - b;
        });
        fastest.sort(function (a, b) {
          return a - b;
        });
        console.log(shortest);

        for (let i = 0; i < response.routes.length; i++) {
          let dr = new google.maps.DirectionsRenderer();
          directions.push(dr);
          dr.setOptions({
            map: map,
            directions: response,
            routeIndex: i,
            polylineOptions: {
              strokeColor: color[i],
              strokeOpacity: 0.5,
            },
          });

          if (
            shortest[0] == response.routes[i].legs[0].distance.value &&
            fastest[0] == response.routes[i].legs[0].duration.value
          ) {
            document.getElementById(color[i]).value =
              response.routes[i].legs[0].distance.text +
              " - " +
              response.routes[i].legs[0].duration.text +
              "(fastest and shortest)";
          } else if (fastest[0] == response.routes[i].legs[0].duration.value) {
            document.getElementById(color[i]).value =
              response.routes[i].legs[0].distance.text +
              " - " +
              response.routes[i].legs[0].duration.text +
              "(fastest)";
          } else if (shortest[0] == response.routes[i].legs[0].distance.value) {
            document.getElementById(color[i]).value =
              response.routes[i].legs[0].distance.text +
              " - " +
              response.routes[i].legs[0].duration.text +
              "(shortest)";
          } else {
            document.getElementById(color[i]).value =
              response.routes[i].legs[0].distance.text +
              " - " +
              response.routes[i].legs[0].duration.text;
          }
        }
        map.setZoom(11);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}



inputPress.addEventListener("click", ()=>{
   // console.log(shortest);
   // alert("hey");

   if( phoneNumber === 10 ){
      return true;
      // phoneNumber.value ="input numbers";
      parseInt(phoneNumber.value);
   }else{
      return false;
   phoneNumber.value ="input numbers";
   }

  if( vehicles.value === "pickup" || vehicles.value === "lorry"  ){
      return true;
      // phoneNumber.value ="input numbers";
      vehicles.value;
   }else{
      return false;
   vehicles.value =" not part of our vehicles ";
   }

   if( email.classList.contains("@gmail.com")  ){
      return true;
   }else if( email.classList.contains("number") ){
      return false;
   email.value =" replace number  ";
   }   
})

