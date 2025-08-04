const auth = firebase.auth();

function signUp() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!validateEmail(email) || !validatePassword(password)) return;

  auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      alert("Sign up successful!");
      window.location.href = "index.html";
    })
    .catch(error => alert(error.message));
}

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      alert("Login successful!");
      window.location.href = "index.html";
    })
    .catch(error => alert("Login failed: " + error.message));
}
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    alert("Invalid email format");
    return false;
  }
  return true;
}

function validatePassword(password) {
  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return false;
  }
  if (!/\d/.test(password)) {
    alert("Password must contain at least one number");
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    alert("Password must contain at least one uppercase letter");
    return false;
  }
  return true;
}

