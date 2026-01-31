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

// i want to add follow button functionality, after click follow a- tag text content must be changet to followed and grey color, and it must be storaged in localstorage

// document.querySelectorAll(".suggest-follow").forEach((button) => {
//   button.addEventListener("click", (e) => {
//     e.preventDefault();
//     const user = button.getAttribute("data-user");
//     button.textContent = "Followed";
//     button.style.color = "grey";
//     localStorage.setItem(`followed_${user}`, "true");
//   });
// });
// window.addEventListener("load", () => {
//   document.querySelectorAll(".suggest-follow").forEach((button) => {
//     const user = button.getAttribute("data-user");
//     if (localStorage.getItem(`followed_${user}`) === "true") {
//       button.textContent = "Followed";
//       button.style.color = "grey";
//     }
//   });
// });

// loop over all follow buttons
const followButtons = document.querySelectorAll("#suggest-follow");

followButtons.forEach((btn) => {
  const userKey = btn.dataset.user;

  // check localStorage on load
  if (localStorage.getItem("followed_" + userKey) === "true") {
    btn.textContent = "Followed";
    btn.style.color = "grey";
    btn.style.pointerEvents = "none";
    btn.style.cursor = "default";
  }

  // click listener
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // optional for <p>/<h4>
    btn.textContent = "Followed";
    btn.style.color = "grey";
    btn.style.pointerEvents = "none";
    btn.style.cursor = "default";
    localStorage.setItem("followed_" + userKey, "true");
  });
});
