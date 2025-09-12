const videoGrid = document.getElementById("videoGrid");
const reviewVideo = document.getElementById("reviewVideo");

function toggleReviewPlay() {
  if (reviewVideo.paused) {
    reviewVideo.play();
    setTimeout(() => reviewVideo.pause(), 2000); // Stop after 2 seconds
  } else {
    reviewVideo.pause();
  }
}

// Render video cards with 2-sec preview
function renderVideos(list) {
  videoGrid.innerHTML = "";
  list.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <video muted preload="metadata" loading="lazy">
        <source src="${video.preview}" type="video/mp4">
      </video>
      <div class="play-btn">&#9658;</div>
    `;
    card.addEventListener("mouseenter", () => {
      const v = card.querySelector("video");
      v.currentTime = 0;
      v.play();
      setTimeout(() => v.pause(), 2000);
    });
    card.addEventListener("mouseleave", () => {
      card.querySelector("video").pause();
    });
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
  if (category === "popular") renderVideos(videosPopular);
}

// Default load
loadVideos("short");
