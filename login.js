const form = document.getElementById("inputs_form");

const loginInput = document.getElementById("loginInput");
const passwordInput = document.getElementById("passwordInput");

const usernameInput = document.getElementById("usernameInput");
const fullNameInput = document.getElementById("fullNameInput");

let isSignup = false;

// თავიდან signup ინფუთები დამალულია
document.querySelectorAll(".signup-only").forEach(el => {
  el.style.display = "none";
});

// ტექსტის გადართვა (Sign up ↔ Log in)
const switchText = document.getElementById("sign-up");

switchText.addEventListener("click", (e) => {
  e.preventDefault();

  isSignup = !isSignup;

  document.querySelectorAll(".signup-only").forEach(el => {
    el.style.display = isSignup ? "block" : "none";
  });

  document.getElementById("loginBtn").textContent =
    isSignup ? "Sign up" : "Log in";
});

// submit ლოგიკა
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginInput.value.trim();
  const password = passwordInput.value.trim();

  if (isSignup) {
    const userData = {
      email,
      password,
      username: usernameInput.value.trim(),
      fullName: fullNameInput.value.trim()
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Account created! Now log in.");

    switchText.click(); // უკან login-ზე
    return;
  }

  const user = JSON.parse(localStorage.getItem("userData"));

  if (!user) {
    alert("No account found. Please sign up.");
    return;
  }

  if (email === user.email && password === user.password) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "home.html";
  } else {
    alert("Incorrect email or password");
  }
});
