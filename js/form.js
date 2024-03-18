const emailError = document.querySelector(".email__error");
const nameError = document.querySelector(".name__error");
console.log(emailError);
const phoneError = document.querySelector(".phone__error");
const addressError = document.querySelector(".address__error");
const locationError = document.querySelector(".location__error");
const destinationError = document.querySelector(".destination__error");
const vehicleError = document.querySelector(".vehicle__error");
const messageError = document.querySelector(".message__error");
console.log(messageError);
console.log(vehicleError);

nameError.addEventListener("keyup", function(){
    // alert('bitch');
});

function valiDateName (){
 let name = document.querySelector("#contact-name").value;

 if(name.length == 0){
    nameError.innerHTML = "name is required";
    return false;
 }
 if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
    nameError.innerHTML = 'write full name';
    return false;
 }
 nameError.innerHTML = 'valid';
 return true;
}valiDateName ();




















