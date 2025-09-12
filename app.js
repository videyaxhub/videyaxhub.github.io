const videoGrid = document.getElementById("videoGrid");
const popularGrid = document.getElementById("popularGrid");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const closeBtn = document.querySelector(".close");

let currentVideos = videosShort;

function renderGrid(container, videos) {
  container.innerHTML = "";
  videos.forEach(video => {
    const card = document.createElement("div");
    card.classList.add("video-card");
    card.innerHTML = `
      <video src="${video.url}" muted preload="metadata"></video>
      <div class="play-btn">▶</div>
      <div class="video-title">${video.title}</div>
    `;
    card.addEventListener("click", () => openModal(video.url));
    container.appendChild(card);
  });
}

function openModal(url) {
  modal.style.display = "flex";
  modalVideo.src = url;
  modalVideo.play();
}

closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", e => { if (e.target === modal) closeModal(); });

function closeModal() {
  modal.style.display = "none";
  modalVideo.pause();
  modalVideo.src = "";
}

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = currentVideos.filter(v => v.title.toLowerCase().includes(searchTerm));
  renderGrid(videoGrid, filtered);
});

document.getElementById("shortBtn").addEventListener("click", () => {
  currentVideos = videosShort;
  renderGrid(videoGrid, currentVideos);
  setActiveBtn("shortBtn");
});

document.getElementById("longBtn").addEventListener("click", () => {
  currentVideos = videosLong;
  renderGrid(videoGrid, currentVideos);
  setActiveBtn("longBtn");
});

function setActiveBtn(activeId) {
  document.getElementById("shortBtn").classList.remove("active");
  document.getElementById("longBtn").classList.remove("active");
  document.getElementById(activeId).classList.add("active");
}

// Render awal
renderGrid(popularGrid, videosPopular);
renderGrid(videoGrid, currentVideos);
