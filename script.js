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

document.querySelectorAll(".post-footer").forEach((post) => {
  const commentIcon = post.querySelector(".toggle-comment");
  const commentBox = post.querySelector(".comment-container");

  commentIcon.addEventListener("click", () => {
    commentBox.style.display =
      commentBox.style.display === "flex" ? "none" : "flex";
  });
});
//like button functionality

let postData = JSON.parse(localStorage.getItem("posts")) || {};

document.querySelectorAll(".post-footer").forEach((post) => {
  const postId = post.dataset.postid;
  const likeBtn = post.querySelector(".like-btn");
  const likesText = post.querySelector(".likes");
  const commentIcon = post.querySelector(".toggle-comment");
  const commentContainer = post.querySelector(".comment-container");

  // Load previous state
  if (postData[postId]) {
    likesText.innerText = postData[postId].likes + " likes";

    if (postData[postId].liked) {
      likeBtn.classList.add("liked");
      likeBtn.classList.remove("far");
      likeBtn.classList.add("fas"); // solid heart
    } else {
      likeBtn.classList.remove("liked");
      likeBtn.classList.remove("fas");
      likeBtn.classList.add("far"); // empty heart
    }
  }

  //Like toggle
  likeBtn.addEventListener("click", () => {
    let likes = parseInt(likesText.innerText) || 0;

    if (likeBtn.classList.contains("liked")) {
      // Unlike
      likeBtn.classList.remove("liked");
      likeBtn.classList.remove("fas");
      likeBtn.classList.add("far");
      likes -= 1;
      postData[postId] = { liked: false, likes: likes };
    } else {
      // Like!
      likeBtn.classList.add("liked");
      likeBtn.classList.remove("far");
      likeBtn.classList.add("fas");
      likes += 1;
      postData[postId] = { liked: true, likes: likes };
    }

    likesText.innerText = likes + " likes";
    localStorage.setItem("posts", JSON.stringify(postData));
  });
});

const section = document.querySelector(".status-section");
const leftBtn = document.querySelector(".scroll-btn.left");
const rightBtn = document.querySelector(".scroll-btn.right");

function updateButtons() {
  leftBtn.style.display = section.scrollLeft > 0 ? "block" : "none";
  rightBtn.style.display =
    section.scrollLeft + section.clientWidth < section.scrollWidth
      ? "block"
      : "none";
}

leftBtn.addEventListener("click", () => {
  section.scrollBy({ left: -150, behavior: "smooth" });
  setTimeout(updateButtons, 100);
});

rightBtn.addEventListener("click", () => {
  section.scrollBy({ left: 150, behavior: "smooth" });
  setTimeout(updateButtons, 100);
});

section.addEventListener("scroll", updateButtons);

// პირველად განახლება
updateButtons();
