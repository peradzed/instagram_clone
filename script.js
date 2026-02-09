if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

const user = JSON.parse(localStorage.getItem("userData"));

// USERNAME (Hollywoo.Horseman)
document.querySelector(".account-info a").innerText = user.username;
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

  // აღდგენა ადგილობრივი საცავიდან
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

  commentBox.style.display = "none";

  commentIcon.addEventListener("click", () => {
    commentBox.style.display =
      commentBox.style.display === "flex" ? "none" : "flex";
  });
});
//Like ღილაკის ფუნქციონალობა

let postData = JSON.parse(localStorage.getItem("posts")) || {};

document.querySelectorAll(".post-footer").forEach((post) => {
  const postId = post.dataset.postid;
  const likeBtn = post.querySelector(".like-btn");
  const likesText = post.querySelector(".likes");
  const commentIcon = post.querySelector(".toggle-comment");
  const commentContainer = post.querySelector(".comment-container");

  // ძველი მონაცემების აღდგენა
  if (postData[postId]) {
    likesText.innerText = postData[postId].likes + " likes";

    if (postData[postId].liked) {
      likeBtn.classList.add("liked");
      likeBtn.classList.remove("far");
      likeBtn.classList.add("fas"); //
    } else {
      likeBtn.classList.remove("liked");
      likeBtn.classList.remove("fas");
      likeBtn.classList.add("far");
    }
  }

  likeBtn.addEventListener("click", () => {
    let likes = parseInt(likesText.innerText) || 0;

    if (likeBtn.classList.contains("liked")) {
      likeBtn.classList.remove("liked");
      likeBtn.classList.remove("fas");
      likeBtn.classList.add("far");
      likes -= 1;
      postData[postId] = { liked: false, likes: likes };
    } else {
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

updateButtons();

//ფოტოს სლაიდერი
document.querySelectorAll(".post-slider").forEach((slider) => {
  const images = slider.querySelector(".post-images");
  const leftBtn = slider.querySelector(".post-left");
  const rightBtn = slider.querySelector(".post-right");
  const dots = slider.querySelectorAll(".post-dot");
  const imgCount = dots.length;

  function updatePostUI() {
    leftBtn.style.display = images.scrollLeft > 0 ? "block" : "none";
    rightBtn.style.display =
      images.scrollLeft + images.clientWidth < images.scrollWidth
        ? "block"
        : "none";

    const index = Math.round(images.scrollLeft / images.clientWidth);

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  leftBtn.addEventListener("click", () => {
    images.scrollBy({ left: -images.clientWidth, behavior: "smooth" });
    setTimeout(updatePostUI, 200);
  });

  rightBtn.addEventListener("click", () => {
    images.scrollBy({ left: images.clientWidth, behavior: "smooth" });
    setTimeout(updatePostUI, 200);
  });

  images.addEventListener("scroll", updatePostUI);

  dots[0].classList.add("active");
  updatePostUI();
});
