function enterSite() {
  document.getElementById("age-gate").style.display = "none";
}

let currentCategory = "short";
const videoGrid = document.getElementById("video-grid");
const modal = document.getElementById("video-modal");
const modalVideo = document.getElementById("modal-video");
let thumbnailsLoaded = false;

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
        <video src="${video.url}" muted preload="metadata" playsinline></video>
        <div class="play-btn">▶</div>
      </div>
      <div class="video-title">${video.title}</div>
    `;

    const videoEl = card.querySelector("video");
    const spinner = card.querySelector(".loading-spinner");

    // capture thumbnail hanya sekali saat user pertama klik
    if (thumbnailsLoaded) captureThumbnail(videoEl, spinner);

    card.querySelector(".play-btn").addEventListener("click", () => {
      if (!thumbnailsLoaded) {
        // baru capture semua setelah klik pertama
        document.querySelectorAll("video").forEach(v => {
          const spin = v.closest(".video-preview").querySelector(".loading-spinner");
          captureThumbnail(v, spin);
        });
        thumbnailsLoaded = true;
      }
      openModal(video.url);
    });

    videoGrid.appendChild(card);
  });
}

function captureThumbnail(videoEl, spinner) {
  videoEl.addEventListener("loadedmetadata", () => {
    if (videoEl.duration > 1) videoEl.currentTime = 1;
    else videoEl.currentTime = 0;
  });

  videoEl.addEventListener("seeked", () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = videoEl.videoWidth;
      canvas.height = videoEl.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
      videoEl.setAttribute("poster", canvas.toDataURL("image/jpeg"));
    } catch (err) {
      console.warn("Thumbnail capture failed, using fallback");
      videoEl.setAttribute("poster", "fallback.jpg"); // fallback
    }
    spinner.style.display = "none";
    videoEl.pause();
  }, { once: true });
}

function openModal(url) {
  modal.style.display = "flex";
  modalVideo.src = url;
  modalVideo.load();
  modalVideo.play().catch(() => {
    console.warn("Autoplay blocked, user must press play");
  });
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
