const names = document.querySelector(".name");
console.log(names);
const email = document.querySelector(".email");
console.log(email);
const phoneNumber = document.querySelector(".phone");
console.log(phoneNumber);
const vehicles = document.querySelector(".vehicle");
console.log(vehicles);
let inputPress = document.querySelector(".input");
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

// inputPress.addEventListener("click", ()=>{
//    // console.log(shortest);
//    // alert("hey");

//    if( phoneNumber === 10 ){
//       return true;
//       // phoneNumber.value ="input numbers";
//       parseInt(phoneNumber.value);
//    }else{
//       return false;
//    phoneNumber.value ="input numbers";
//    }

//   if( vehicles.value === "pickup" || vehicles.value === "lorry"  ){
//       return true;
//       vehicles.value;
//    }else{
//       return false;
//    vehicles.value =" not part of our vehicles ";
//    }

//    if( email.classList.contains("@gmail.com")  ){
//       return true;
//    }else if( email.classList.contains("number") ){
//       return false;
//    email.value =" replace number  ";
//    }
// })

// inputPress.addEventListener("keydown", ()=>{
// // alert('larry');
// const validateInputs = ()=>{
//    const userName = names.value.trim();
//    const userEmail = email.value.trim();
//    const userVehicle = vehicles.value.trim();
//    const userNumber = phoneNumber.value.trim();

// if(userName === ""){
//    setError(userName , 'username is required');
// }else{
//    setSuccess(userName);
// }

// if(userEmail === ""){
//    setError(email , 'email is required');

// }else if(email.toLowerCase){
//    setError(email , 'email should be in lowercase');

// }
// else{
//    setSuccess(userEmail);
// }

// if(userVehicle === ""){
//    setError(vehicles , 'vehicle is required');

// }else if(vehicles= 'lorry'){
//    setSuccess('available')
// }
// else if(vehicles= 'pickup'){
//    setSuccess('available')
// }

// if(userEmail === ""){
//    setError(phoneNumber , 'phone number is required');

// }else{
//    setSuccess(userNumber);
// }
// }
// });

document.addEventListener('DOMContentLoaded', function() {
   // Add event listeners to inputs for validation
   let nameInput = document.getElementById('contact-name');
   let emailInput = document.querySelector('.email');
   let phoneInput = document.querySelector('.phone');
   let vehicleInput = document.querySelector('.vehicle');

   nameInput.addEventListener('blur', validateName);
   emailInput.addEventListener('blur', validateEmail);
   phoneInput.addEventListener('blur', validatePhone);
   vehicleInput.addEventListener('blur', displayPrice);
});

function validateName() {
   let nameInput = document.getElementById('contact-name');
   let name = nameInput.value.trim();
   let nameError = document.getElementById('name-error');

   if (!/^[A-Za-z\s]+$/.test(name)) {
       nameError.textContent = 'Please enter a valid name.';
       nameError.textContent.style.color ="red";
       nameInput.focus();
   } else {
       nameError.textContent = '';
   }
}

function validateEmail() {
   let emailInput = document.querySelector('.email');
   let email = emailInput.value.trim();
   let emailError = document.getElementById('email-error');

   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
       emailError.textContent = 'Please enter a valid email address.';
       emailError.textContent.style.color ="red";

       emailInput.focus();
   } else {
       emailError.textContent = '';
   }
}

function validatePhone() {
   let phoneInput = document.querySelector('.phone');
   let phone = phoneInput.value.trim();
   let phoneError = document.getElementById('phone-error');

   if (!/^\d{10}$/.test(phone)) {
       phoneError.textContent = 'Please enter a valid phone number with 10 digits.';
       phoneError.textContent.style.color ="red";

       phoneInput.focus();
   } else {
       phoneError.textContent = '';
   }
}

function displayPrice() {
   let vehicleInput = document.querySelector('.vehicle');
   let priceSpan = document.getElementById('#price');
   let vehicle = vehicleInput.value.trim().toLowerCase();

   if (vehicle === 'lorry') {
       priceSpan.textContent = 'Ksh 20000';
   } else if (vehicle === 'pickup') {
       priceSpan.textContent = 'Ksh 10000';
   } else {
       priceSpan.textContent = 'fill the space ';
   }
}

