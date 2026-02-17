const form = document.getElementById("inputs_form");

const loginInput = document.getElementById("loginInput");
const passwordInput = document.getElementById("passwordInput");
const usernameInput = document.getElementById("usernameInput");
const fullNameInput = document.getElementById("fullNameInput");

let isSignup = false;

/* signup ინფუთების დამალვა */
document.querySelectorAll(".signup-only").forEach((el) => {
  el.style.display = "none";
});

/* inline error helpers */
function showError(input, message) {
  clearError(input);

  const error = document.createElement("div");
  error.className = "input-error";
  error.textContent = message;

  input.after(error);
}

function clearError(input) {
  if (input.nextElementSibling?.classList.contains("input-error")) {
    input.nextElementSibling.remove();
  }
}

function clearAllErrors() {
  document.querySelectorAll(".input-error").forEach((el) => el.remove());
}

/* Full name  */
fullNameInput.addEventListener("input", () => {
  fullNameInput.value = fullNameInput.value.replace(/[^\p{L}\s]/gu, "");
});

/* Password validation */
function isValidPassword(password) {
  return (
    password.length >= 6 && /[A-Za-z]/.test(password) && /\d/.test(password)
  );
}

/* ტექსტის გადართვა (Sign up ↔ Log in) */
const switchText = document.getElementById("sign-up");

switchText.addEventListener("click", (e) => {
  e.preventDefault();
  clearAllErrors();

  isSignup = !isSignup;

  document.querySelectorAll(".signup-only").forEach((el) => {
    el.style.display = isSignup ? "block" : "none";
  });

  document.getElementById("loginBtn").textContent = isSignup
    ? "Sign up"
    : "Log in";
});

/* submit */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearAllErrors();

  const loginValue = loginInput.value.trim();
  const password = passwordInput.value.trim();

  let hasError = false;

  if (!loginValue) {
    showError(loginInput, "This field is required");
    hasError = true;
  }

  if (!password) {
    showError(passwordInput, "Password is required");
    hasError = true;
  }

  if (isSignup) {
    if (!usernameInput.value.trim()) {
      showError(usernameInput, "Username is required");
      hasError = true;
    }

    if (!fullNameInput.value.trim()) {
      showError(fullNameInput, "Full name is required");
      hasError = true;
    }

    if (password && !isValidPassword(password)) {
      showError(
        passwordInput,
        "Password must be at least 6 characters and contain one letter and one number",
      );
      hasError = true;
    }

    if (hasError) return;

    const userData = {
      login: loginValue,
      password,
      username: usernameInput.value.trim(),
      fullName: fullNameInput.value.trim(),
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    switchText.click();
    return;
  }

  const user = JSON.parse(localStorage.getItem("userData"));

  if (!user) {
    showError(loginInput, "No account found. Please sign up.");
    return;
  }

  if (loginValue === user.login && password === user.password) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "home.html";
  } else {
    showError(loginInput, "Incorrect login or password");
  }
});
