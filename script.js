if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

const user = JSON.parse(localStorage.getItem("userData"));

// USERNAME და სრული სახელი გვერდის ზედა ნაწილში
document.querySelector(".account-info a").innerText = user.username;
document.querySelector(".account-info p").innerText = user.fullName;

const followButtons = document.querySelectorAll(".suggest-follow");

followButtons.forEach((btn) => {
  const userKey = btn.dataset.user;
  //follow/unfollow ფუნქციონალობა
  const setFollow = () => {
    btn.textContent = "Follow";
    btn.style.color = "#0095f6";
    btn.style.cursor = "pointer";
    btn.dataset.followed = "false";
    localStorage.removeItem("followed_" + userKey);
  };
  //followed
  const setFollowed = () => {
    btn.textContent = "Followed";
    btn.style.color = "lightgrey";
    btn.style.cursor = "pointer";
    btn.dataset.followed = "true";
    localStorage.setItem("followed_" + userKey, "true");
  };

  //მონაცემების შენახვა და აღდგენა
  if (localStorage.getItem("followed_" + userKey)) {
    setFollowed();
  } else {
    setFollow();
  }
  // ღილაკის ფუნქციონალობა follow/unfollow
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

//კომენტარის ღილაკის ფუნქციონალობა

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
  //like toggle
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
//story ღილაკები
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

//პოსტის ფოტოს სლაიდერი
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

//პოსტის დამატება

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("userData")) || {
    username: "Hollywoo.Horseman",
    fullName: "Hollywoo",
  };

  const accountImg = document.querySelector(".account-info img");
  const accountName = document.querySelector(".account-info a");
  const accountFull = document.querySelector(".account-info p");

  accountName.innerText = user.username;
  accountFull.innerText = user.fullName;

  const feed = document.querySelector(".posts");

  let postsData = JSON.parse(localStorage.getItem("userPosts")) || [];

  function renderPost(post) {
    const profileImage = accountImg?.src || "images/default-avatar.png";

    const postEl = document.createElement("div");
    postEl.className = "post";

    postEl.innerHTML = `
      <div class="post-header">
        <div class="user-details">
          <div class="image-container">
            <img src="${profileImage}" class="prof-pic" />
          </div>
          <div class="user-info">
            <p>${post.username} <span class="dot">.</span>
              <span class="timestamp">${post.timestamp}</span>
            </p>
            <p>${post.location || ""}</p>
          </div>
        </div>
        <i class="fas fa-ellipsis-h"></i>
      </div>

      <div class="post-slider">
        <div class="post-images">
          ${post.images.map((img) => `<img src="${img}" />`).join("")}
        </div>
      </div>

      <div class="post-footer" data-postid="${post.id}">
        <div class="post-actions">
          <div class="left-actions">
            <i class="far fa-heart like-btn ${post.liked ? "fas liked" : ""}"></i>
            <i class="far fa-comment toggle-comment"></i>
            <i class="far fa-paper-plane"></i>
          </div>
          <i class="fas fa-bookmark"></i>
        </div>

        <p class="likes">${post.likes || 0} likes</p>
        <p class="post-text">${post.caption}</p>
        <p class="comments">View all ${post.comments?.length || 0} comments</p>

        <div class="comment-container" style="display:none">
          <input type="text" placeholder="Add a comment..." />
          <div class="comment-button">
            <button>Post</button>
            <i class="far fa-smile"></i>
          </div>
        </div>
      </div>
    `;

    feed.prepend(postEl);
  }

  postsData.forEach(renderPost);

  document.addEventListener("click", (e) => {
    const footer = e.target.closest(".post-footer");
    if (!footer) return;
    const postId = footer.dataset.postid;
    const post = postsData.find((p) => p.id == postId);
    if (!post) return;

    if (e.target.classList.contains("like-btn")) {
      post.liked = !post.liked;
      post.likes = post.likes || 0;
      post.likes += post.liked ? 1 : -1;

      e.target.classList.toggle("liked", post.liked);
      e.target.classList.toggle("fas", post.liked);
      e.target.classList.toggle("far", !post.liked);

      footer.querySelector(".likes").innerText = post.likes + " likes";
      localStorage.setItem("userPosts", JSON.stringify(postsData));
    }

    if (e.target.classList.contains("toggle-comment")) {
      const box = footer.querySelector(".comment-container");
      box.style.display = box.style.display === "flex" ? "none" : "flex";
    }

    if (
      e.target.tagName === "BUTTON" &&
      e.target.parentElement.classList.contains("comment-button")
    ) {
      const input = e.target.parentElement.previousElementSibling;
      const text = input.value.trim();
      if (!text) return;
      post.comments = post.comments || [];
      post.comments.push({ user: user.username, text });
      footer.querySelector(".comments").innerText =
        `View all ${post.comments.length} comments`;
      input.value = "";
      localStorage.setItem("userPosts", JSON.stringify(postsData));
    }
  });

  const createBtn = document.getElementById("createPostBtn");
  const modal = document.getElementById("createModal");
  const closeModal = document.getElementById("closeModal");
  const shareBtn = document.getElementById("sharePost");

  createBtn?.addEventListener("click", () => (modal.style.display = "flex"));
  closeModal?.addEventListener("click", () => (modal.style.display = "none"));

  shareBtn?.addEventListener("click", () => {
    const files = document.getElementById("postImages").files;
    const caption = document.getElementById("postCaption").value.trim();
    const location = document.getElementById("postLocation").value.trim();

    if (!files.length) return alert("Upload at least one image");

    const images = [];
    let loaded = 0;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        images.push(e.target.result);
        loaded++;
        if (loaded === files.length) {
          const post = {
            id: Date.now().toString(),
            username: user.username,
            caption,
            location,
            images,
            timestamp: "1m",
            likes: 0,
            liked: false,
            comments: [],
          };
          postsData.unshift(post);
          localStorage.setItem("userPosts", JSON.stringify(postsData));
          renderPost(post);
          resetModal();
        }
      };
      reader.readAsDataURL(file);
    });
  });

  function resetModal() {
    document.getElementById("postImages").value = "";
    document.getElementById("postCaption").value = "";
    document.getElementById("postLocation").value = "";
    modal.style.display = "none";
  }
});
