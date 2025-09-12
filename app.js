const videoGrid = document.getElementById("videoGrid");
const reviewVideo = document.getElementById("reviewVideo");
let reviewIndex = 0;

function toggleReviewPlay() {
  if (reviewVideo.paused) reviewVideo.play();
  else reviewVideo.pause();
}

// Put first video from short category as preview
function playNextReview() {
  const currentList = videosShort.concat(videosLong, videosPopular);
  if (currentList.length === 0) return;
  reviewVideo.src = currentList[reviewIndex].url;
  reviewVideo.play();
  reviewIndex = (reviewIndex + 1) % currentList.length;
  setTimeout(playNextReview, 2000); // ganti tiap 2 detik
}

// Render video cards
function renderVideos(list) {
  videoGrid.innerHTML = "";
  list.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <video src="${video.url}" muted preload="metadata" playsinline></video>
      <div class="play-btn">&#9658;</div>
    `;
    card.addEventListener("click", () => openModal(video.url));
    videoGrid.appendChild(card);
  });
}

// Modal popup
const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = `<span class="close">&times;</span><video controls autoplay playsinline></video>`;
document.body.appendChild(modal);

const modalVideo = modal.querySelector("video");
const modalClose = modal.querySelector(".close");

function openModal(url) {
  modal.style.display = "flex";
  modalVideo.src = url;
  modalVideo.play();
}

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
  modalVideo.pause();
  modalVideo.src = "";
});

// Navigation buttons
function loadVideos(category) {
  document.querySelectorAll(".nav-buttons button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.btn-${category}`).classList.add("active");

  if (category === "short") renderVideos(videosShort);
  if (category === "long") renderVideos(videosLong);
  if (category === "popular") renderVideos(videosPopular);
}

// Start
loadVideos("short");
playNextReview();
