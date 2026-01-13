// Form Validation
const form = document.getElementById('signupForm');
const fullName = document.getElementById('signupName');
const email = document.getElementById('signupEmail'); 
const password = document.getElementById('signupPassword');
const passwordConfirm = document.getElementById('signupConfirmPassword');

form.addEventListener('submit', e => {
  e.preventDefault(); // Prevents submission/reload during validation

  validateInputs();
});

const setError = (input, message) => {
  const inputControl = input.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = message;  // ← THIS WAS MISSING! Now shows the error
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = '';  // Clear any previous error
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

const isValidEmail = (emailVal) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(emailVal).toLowerCase());
};

const validateInputs = () => {
  const fullNameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const passwordConfirmValue = passwordConfirm.value.trim();

  if (fullNameValue === '') {
    setError(fullName, 'Full Name is required');
  } else {
    setSuccess(fullName);
  }

  if (emailValue === '') {
    setError(email, 'Email is required');
  } else if (!isValidEmail(emailValue)) {
    setError(email, 'Provide a valid email address');
  } else {
    setSuccess(email);
  }

  if (passwordValue === '') {
    setError(password, 'Password is required');
  } else if (passwordValue.length < 8) {
    setError(password, 'Password must be at least 8 characters.');
  } else {
    setSuccess(password);
  }

  if (passwordConfirmValue === '') {
    setError(passwordConfirm, 'Please confirm your password');
  } else if (passwordConfirmValue !== passwordValue) {
    setError(passwordConfirm, "Passwords don't match");
  } else {
    setSuccess(passwordConfirm);
  }

  // Optional: If all valid and you want to submit later, check here
  // e.g., if (no errors) { form.submit(); } or send via fetch/AJAX
};



 