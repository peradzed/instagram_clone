const form = document.getElementById("inputs_form");
const loginInput = document.getElementById("loginInput");
const passwordInput = document.getElementById("passwordInput");

const correctEmail = "test@gmail.com";
const correctPassword = "123456";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginInput.value.trim();
  const password = passwordInput.value.trim();

  if (email === correctEmail && password === correctPassword) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    window.location.href = "home.html";
  } else {
    alert("Incorrect email or password");
  }
});
