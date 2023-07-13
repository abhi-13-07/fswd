function validateForm() {
  var firstName = document.forms["registrationForm"]["firstName"].value;
  var lastName = document.forms["registrationForm"]["lastName"].value;
  var address = document.forms["registrationForm"]["address"].value;
  var email = document.forms["registrationForm"]["email"].value;
  var mobile = document.forms["registrationForm"]["mobile"].value;
  var password = document.forms["registrationForm"]["password"].value;

  // Validate first name
  var firstNameRegex = /^[a-zA-Z]{6,}$/;
  if (!firstNameRegex.test(firstName)) {
    alert(
      "First name must contain alphabets and be at least 6 characters long."
    );
    return false;
  }

  // Validate last name
  if (lastName == "") {
    alert("Last name must be filled out.");
    return false;
  }

  // Validate address
  if (address == "") {
    alert("Address must be filled out.");
    return false;
  }

  // Validate email
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email address.");
    return false;
  }

  // Validate mobile number
  var mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(mobile)) {
    alert("Mobile number must contain 10 digits.");
    return false;
  }

  // Validate password
  var passwordRegex = /^[a-zA-Z0-9]{6,}$/;
  if (!passwordRegex.test(password)) {
    alert(
      "Password must be at least 6 characters long and contain only alphanumeric characters."
    );
    return false;
  }

  // If all fields are valid, submit the form
  return true;
}
