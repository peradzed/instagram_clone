// const form = document.getElementById("inputs_form");
// const loginInput = document.getElementById("loginInput");
// const passwordInput = document.getElementById("passwordInput");

// const correctEmail = "test@gmail.com";
// const correctPassword = "123456";

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const email = loginInput.value.trim();
//   const password = passwordInput.value.trim();

//   if (email === correctEmail && password === correctPassword) {
//     localStorage.setItem("isLoggedIn", "true");
//     localStorage.setItem("userEmail", email);

//     window.location.href = "home.html";
//   } else {
//     alert("Incorrect email or password");
//   }
// });
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

const user = JSON.parse(localStorage.getItem("userData"));

// USERNAME (Hollywoo.Horseman)
document.querySelector(".account-info a").innerText = user.username;

// FULL NAME (Bojack Horseman)
document.querySelector(".account-info p").innerText = user.fullName;

const followButtons = document.querySelectorAll(".suggest-follow");

followButtons.forEach((btn) => {
  const userKey = btn.dataset.user;

  const setFollow = () => {
    btn.textContent = "Follow";
    btn.style.color = "#0095f6";
    btn.style.cursor = "pointer";
    btn.dataset.followed = "false";
    localStorage.removeItem("followed_" + userKey);
  };

  const setFollowed = () => {
    btn.textContent = "Followed";
    btn.style.color = "lightgrey";
    btn.style.cursor = "pointer";
    btn.dataset.followed = "true";
    localStorage.setItem("followed_" + userKey, "true");
  };

  // restore
  if (localStorage.getItem("followed_" + userKey)) {
    setFollowed();
  } else {
    setFollow();
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    if (btn.dataset.followed === "true") {
      setFollow();
    } else {
      setFollowed();
    }
  });

  btn.addEventListener("mouseenter", () => {
    btn.style.color = btn.dataset.followed === "true" ? "lightgrey" : "#0095f6";
  });
});
