let currentCategory = "short";
let allVideos = [];

function switchCategory(category) {
  currentCategory = category;
  document.querySelectorAll(".btn").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.btn:nth-child(${category === "short" ? 1 : category === "long" ? 2 : 3})`).classList.add("active");
  loadVideos();
}

function loadVideos() {
  if (currentCategory === "short") {
    allVideos = videos_short;
  } else if (currentCategory === "long") {
    allVideos = videos_long;
  } else {
    allVideos = videos_populer;
  }
  renderVideos(allVideos);
}

function renderVideos(videoList) {
  const grid = document.getElementById("video-grid");
  grid.innerHTML = "";

  videoList.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";

    card.innerHTML = `
      <video muted preload="metadata">
        <source src="${video.url}#t=0,1" type="video/mp4">
      </video>
      <div class="video-title">${video.title}</div>
    `;

    // Preview Play on Hover
    const vidEl = card.querySelector("video");
    card.addEventListener("mouseenter", () => vidEl.play());
    card.addEventListener("mouseleave", () => { vidEl.pause(); vidEl.currentTime = 0; });

    // Play Modal on Click
    card.addEventListener("click", () => openModal(video.url));

    grid.appendChild(card);
  });
}

function filterVideos() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = allVideos.filter(v => v.title.toLowerCase().includes(query));
  renderVideos(filtered);
}

function openModal(url) {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  modalVideo.src = url;
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  modalVideo.pause();
  modal.style.display = "none";
}

// Load default category
window.onload = () => loadVideos();
