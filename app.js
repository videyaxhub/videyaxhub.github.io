const videoGrid = document.getElementById("videoGrid");
const reviewVideo = document.getElementById("reviewVideo");

function toggleReviewPlay() {
  if (reviewVideo.paused) {
    reviewVideo.play();
  } else {
    reviewVideo.pause();
  }
}

// Render video cards
function renderVideos(list) {
  videoGrid.innerHTML = "";
  list.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <img src="https://img.freepik.com/free-photo/video-thumbnail.jpg" loading="lazy" alt="${video.title}">
      <div class="play-btn">&#9658;</div>
    `;
    card.addEventListener("click", () => openModal(video.url));
    videoGrid.appendChild(card);
  });
}

// Modal popup
const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = `<span class="close">&times;</span><video controls autoplay></video>`;
document.body.appendChild(modal);

const modalVideo = modal.querySelector("video");
const modalClose = modal.querySelector(".close");

function openModal(url) {
  modal.style.display = "flex";
  modalVideo.src = url;
}
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
  modalVideo.pause();
});

// Navigation buttons
function loadVideos(category) {
  document.querySelectorAll(".nav-buttons button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.btn-${category}`).classList.add("active");
  if (category === "short") renderVideos(videosShort);
  if (category === "long") renderVideos(videosLong);
  if (category === "populer") renderVideos(videosPopuler);
}

// Load default
loadVideos("short");
