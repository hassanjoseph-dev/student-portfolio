// Paste your Formspree address between the quotation marks
const FORM_URL = "https://formspree.io/f/xnpnrkvr";

// Get the form and button
const form = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");
const successMessage = document.getElementById("successMessage");

// Show an error message under a field
function showError(fieldId, message) {
  document.getElementById(fieldId + "Error").textContent = message;
}

// Clear all error messages
function clearErrors() {
  const fields = ["name", "email", "phone", "message"];
  for (let i = 0; i < fields.length; i++) {
    showError(fields[i], "");
  }
  successMessage.textContent = "";
}

// Check email format: text @ text . text
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// Check phone has digits only
function isDigitsOnly(phone) {
  const pattern = /^[0-9]+$/;
  return pattern.test(phone);
}

// Send the form data to Formspree
function sendMessage(name) {
  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";

  fetch(FORM_URL, {
    method: "POST",
    body: new FormData(form),
    headers: { "Accept": "application/json" }
  })
    .then(function (response) {
      if (response.ok) {
        successMessage.style.color = "#2a9d8f";
        successMessage.textContent =
          "Thank you, " + name + "! Your message has been sent successfully.";
        form.reset();
      } else {
        successMessage.style.color = "#c1121f";
        successMessage.textContent =
          "Sorry, something went wrong. Please try again.";
      }
    })
    .catch(function () {
      successMessage.style.color = "#c1121f";
      successMessage.textContent =
        "Network error. Please check your internet and try again.";
    })
    .finally(function () {
      sendBtn.disabled = false;
      sendBtn.textContent = "Send Message";
    });
}

// Runs when the user clicks "Send Message"
form.addEventListener("submit", function (event) {
  event.preventDefault();   // stop the page from reloading
  clearErrors();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  let isValid = true;

  // 1. No field should be empty
  if (name === "") {
    showError("name", "Please enter your name.");
    isValid = false;
  }

  if (email === "") {
    showError("email", "Please enter your email address.");
    isValid = false;
  } else if (!isValidEmail(email)) {
    // 2. Email format must be valid
    showError("email", "Please enter a valid email, e.g. name@example.com.");
    isValid = false;
  }

  if (phone === "") {
    showError("phone", "Please enter your phone number.");
    isValid = false;
  } else if (!isDigitsOnly(phone)) {
    // 3. Phone must contain only digits
    showError("phone", "Phone number must contain digits only (0-9).");
    isValid = false;
  }

  if (message === "") {
    showError("message", "Please type your message.");
    isValid = false;
  }

  // Only send if everything is correct
  if (isValid) {
    sendMessage(name);
  }
});