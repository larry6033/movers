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
let radioButton = document.querySelectorAll("#radiobuttons");
console.log(radioButton);
let radioButtonsLabel = document.querySelectorAll("#radiobuttonlabel");
console.log(ra)

let kilometres;

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
      console.log(response);
      if (status === "OK") {
        for (let i = 0; i < response.routes.length; i++) {
          console.log(response.routes[i].legs[0].distance);
          shortest.push(response.routes[i].legs[0].distance.value);
          fastest.push(response.routes[i].legs[0].duration.value);

          kilometres = response.routes[i].legs[0].distance.value;
          console.log(kilometres);

          const fuelEfficiencyLorry = 4;
          const fuelEfficiencyPickup = 13;

          const costLorry = 20000;
          const costPickup = 10000;
          // }
          const fuelCostPerLiter = 2;

          if (status === "OK") {
            // let radioButtons =
            let totalCostLorry = 5000;
            let totalCostPickup = 2500;

            for (let i = 0; i < response.routes.length; i++) {
              const distance = response.routes[i].legs[0].distance;
              console.log(distance);
              const fuelCostLorry =
                Number(distance.value / 1000 / fuelEfficiencyLorry) *
                fuelCostPerLiter;
              const fuelCostPickup =
                Number(distance.value / 1000 / fuelEfficiencyPickup) *
                fuelCostPerLiter;

              totalCostLorry += costLorry + fuelCostLorry;
              totalCostPickup += costPickup + fuelCostPickup;

              console.log("Total cost for lorry:", totalCostLorry);
              console.log("Total cost for pickup:", totalCostPickup);
              let cash = document.querySelector("#totalCost");
              console.log(cash);
              for (let i = 0; i < radioButton.length; i++) {
                let vehicleType = radioButton[i];
                console.log(vehicleType);
                vehicleType.addEventListener("change", function () {
                  if (vehicleType === totalCostLorry) {
                    cash.innerHTML = `Ksh. ${Math.floor(
                      totalCostLorry
                    ).toLocaleString()}`;
                  } else {
                    cash.innerHTML = `Ksh. ${Math.floor(
                      totalCostPickup
                    ).toLocaleString()}`;
                  }
                });
              }

              // document.addEventListener('DOMContentLoaded', function() {
              //   let radioButtons = document.querySelectorAll('input[type=radio][name=vehicle]');

              //   radioButtons.forEach(function(radioButton) {
              //     radioButton.addEventListener('change', function() {
              //       let amount = 0;
              //       let vehicleType = this.value;

              //       if (vehicleType === totalCostLorry) {
              //   cash.innerHTML =`Ksh. ${Math.floor(totalCostLorry).toLocaleString()}`;

              //       } else if (vehicleType === totalCostPickup) {
              //           cash.innerHTML =`Ksh. ${Math.floor(totalCostPickup).toLocaleString()}`;

              //       }

              //     });
              //   });
              // });
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
              } else if (
                fastest[0] == response.routes[i].legs[0].duration.value
              ) {
                document.getElementById(color[i]).value =
                  response.routes[i].legs[0].distance.text +
                  " - " +
                  response.routes[i].legs[0].duration.text +
                  "(fastest)";
              } else if (
                shortest[0] == response.routes[i].legs[0].distance.value
              ) {
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
      }
    }
  );
}

function priceCalculation() {}

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

document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to inputs for validation
  let nameInput = document.getElementById("contact-name");
  let emailInput = document.querySelector(".email");
  let phoneInput = document.querySelector(".phone");
  let vehicleInput = document.querySelector(".vehicle");
  let spans = document.querySelector(".error");
  nameInput.addEventListener("keydown", validateName);
  emailInput.addEventListener("keydown", validateEmail);
  phoneInput.addEventListener("keydown", validatePhone);
  vehicleInput.addEventListener("keydown", displayPrice);
});

function validateName() {
  let nameInput = document.getElementById("contact-name");
  let name = nameInput.value.trim();
  let nameError = document.getElementById("name-error");

  if (!/^[A-Za-z\s]+$/.test(name)) {
    nameError.textContent = "Please enter a valid name.";
    spans.textContent.style.color = "red";
    nameInput.focus();
  } else {
    nameError.textContent = "";
  }
}

function validateEmail() {
  let emailInput = document.querySelector(".email");
  let email = emailInput.value.trim();
  let emailError = document.getElementById("email-error");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    spans.textContent.style.color = "red";

    emailInput.focus();
  } else {
    emailError.textContent = "";
  }
}

function validatePhone() {
  let phoneInput = document.querySelector(".phone");
  let phone = phoneInput.value.trim();
  let phoneError = document.getElementById("phone-error");

  if (!/^\d{9}$/.test(phone)) {
    phoneError.textContent = "Please enter a phone number with 10 digits.";
    spans.textContent.style.color = "red";

    phoneInput.focus();
  } else {
    phoneError.textContent = "";
  }
}

function displayPrice() {
  let vehicleInput = document.querySelector(".vehicle");
  let priceSpan = document.querySelector("#vehicle-error");
  let vehicle = vehicleInput.value.trim().toLowerCase();

  if (vehicle === "lorry") {
    priceSpan.textContent = "lorry is Ksh 20000";
    priceSpan.textContent.style.color = "green";
    spans.textContent.style.color = "green";
    //  vehicleInput.focus();
  } else if (vehicle === "pickup") {
    priceSpan.textContent = " pickup is Ksh 10000";
    spans.textContent.style.color = "green";
    spans.textContent.style.color = "green";
    // vehicleInput.focus();
  } else {
    priceSpan.textContent = "invalid vehicle ";
    spans.textContent.style.color = "red";
    //  vehicleInput.focus();
  }
}
