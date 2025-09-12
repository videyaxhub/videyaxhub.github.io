function enterSite() {
  document.getElementById("age-gate").style.display = "none";
}

let currentCategory = "short";
const videoGrid = document.getElementById("video-grid");
const modal = document.getElementById("video-modal");
const modalVideo = document.getElementById("modal-video");

function showCategory(category) {
  currentCategory = category;
  document.querySelectorAll(".controls button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.controls button[onclick="showCategory('${category}')"]`).classList.add("active");
  renderVideos();
}

function renderVideos() {
  videoGrid.innerHTML = "";
  let data = currentCategory === "short" ? videosShort : currentCategory === "long" ? videosLong : videosPopular;

  data.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";

    card.innerHTML = `
      <div class="video-preview">
        <div class="loading-spinner"></div>
        <video src="${video.url}" muted preload="metadata"></video>
        <div class="play-btn">▶</div>
      </div>
      <div class="video-title">${video.title}</div>
    `;

    const videoEl = card.querySelector("video");
    const spinner = card.querySelector(".loading-spinner");

    videoEl.addEventListener("loadedmetadata", () => {
      videoEl.currentTime = videoEl.duration > 1 ? 1 : 0;
    });

    videoEl.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoEl.videoWidth;
      canvas.height = videoEl.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
      const thumbnail = canvas.toDataURL("image/jpeg");
      videoEl.setAttribute("poster", thumbnail);
      spinner.style.display = "none";
      videoEl.pause();
      videoEl.src = ""; // hentikan load video
    }, { once: true });

    card.querySelector(".play-btn").addEventListener("click", () => openModal(video.url));
    videoGrid.appendChild(card);
  });
}

function openModal(url) {
  modal.style.display = "flex";
  modalVideo.src = url;
  modalVideo.play();
}

function closeModal() {
  modal.style.display = "none";
  modalVideo.pause();
  modalVideo.src = "";
}

function searchVideos() {
  const query = document.getElementById("search-input").value.toLowerCase();
  document.querySelectorAll(".video-card").forEach(card => {
    const title = card.querySelector(".video-title").textContent.toLowerCase();
    card.style.display = title.includes(query) ? "block" : "none";
  });
}

renderVideos();
