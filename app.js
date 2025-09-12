const videoGrid = document.getElementById("videoGrid");
const reviewVideo = document.getElementById("reviewVideo");

// === REVIEW VIDEO AUTOPLAY 2 DETIK ===
reviewVideo.play();
setTimeout(() => {
  reviewVideo.pause();
}, 2000);

function toggleReviewPlay() {
  if (reviewVideo.paused) {
    reviewVideo.play();
  } else {
    reviewVideo.pause();
  }
}

// === RENDER VIDEO CARDS ===
function renderVideos(list) {
  videoGrid.innerHTML = "";
  list.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <video muted preload="metadata" playsinline loading="lazy">
        <source src="${video.preview}" type="video/mp4">
      </video>
      <div class="play-btn">&#9658;</div>
    `;
    card.addEventListener("mouseenter", () => {
      card.querySelector("video").play().catch(() => {});
    });
    card.addEventListener("mouseleave", () => {
      card.querySelector("video").pause();
      card.querySelector("video").currentTime = 0;
    });
    card.addEventListener("click", () => openModal(video.url));
    videoGrid.appendChild(card);
  });
}

// === MODAL POPUP ===
const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = `
  <span class="close">&times;</span>
  <video controls autoplay playsinline></video>
`;
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

// === NAVIGATION BUTTONS ===
function loadVideos(category) {
  document.querySelectorAll(".nav-buttons button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.btn-${category}`).classList.add("active");

  if (category === "short") renderVideos(videosShort);
  if (category === "long") renderVideos(videosLong);
  if (category === "populer") renderVideos(videosPopular);
}

// === DEFAULT LOAD ===
loadVideos("short");

// === SEARCH FILTER ===
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const activeCategory = document.querySelector(".nav-buttons button.active").classList[0].replace("btn-", "");

  let data = [];
  if (activeCategory === "short") data = videosShort;
  if (activeCategory === "long") data = videosLong;
  if (activeCategory === "populer") data = videosPopular;

  const filtered = data.filter(video => video.title.toLowerCase().includes(query));
  renderVideos(filtered);
});
