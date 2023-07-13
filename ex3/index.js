var regform = document.getElementsByName("RegForm")[0];
var name = document.getElementsByName("Name")[0];
var address = document.getElementsByName("Address")[0];
var email = document.getElementsByName("EMail")[0];
var phoneno = document.getElementsByName("PhoneNo")[0];
var passwd = document.getElementsByName("Password")[0];
var error = document.getElementById("error");

phoneno.addEventListener("input", (e) => {
  var value = e.target.value;
  var lastCharacter = value.at(-1);

  if (!/\d/.test(lastCharacter)) {
    phoneno.value = value.slice(0, value.length - 1);
  }
});

regform.addEventListener("submit", (e) => {
  e.preventDefault();

  errorElement.innerText = "";
  var error = validateForm();

  if (error) {
    errorElement.innerText = error;
    return;
  }

  console.log("Form Submitter!");
});

function validateForm() {
  let error = "";

  if (!address.value || address.value.length < 5) {
    address.focus();
    error = "invalid address";
    return error;
  }

  if (!email.value || isValidEmail(email.value)) {
    email.focus();
    error = "Invalid Email";
    return error;
  }

  if (!passwd.value || passwd.value.length < 8) {
    passwd.focus();
    error = "Invalid Password";
    return error;
  }

  if (!phoneno.value || phoneno.value.lenght < 10) {
    phoneno.focus();
    error = "Invalid PhoneNo";
    return error;
  }
  return error;
}

function isValidEmail(email) {
  var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g);
  return emailRegex.test(email);
}
