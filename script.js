let currentData = videosShort;
const grid = document.getElementById("videoGrid");
const btnShort = document.getElementById("btnShort");
const btnLong = document.getElementById("btnLong");
const searchInput = document.getElementById("search");

function renderVideos(data) {
  grid.innerHTML = "";
  data.forEach(video => {
    const card = document.createElement("div");
    card.className = "card";

    const thumb = document.createElement("div");
    thumb.className = "thumbnail";

    const videoEl = document.createElement("video");
    videoEl.src = video.url;
    videoEl.muted = true;
    videoEl.preload = "metadata";

    thumb.appendChild(videoEl);

    const playBtn = document.createElement("button");
    playBtn.className = "play-btn";
    playBtn.innerHTML = "▶";
    playBtn.onclick = () => window.open(video.url, "_blank");
    thumb.appendChild(playBtn);

    thumb.addEventListener("mouseenter", () => {
      videoEl.currentTime = 0;
      videoEl.play().catch(() => {});
      setTimeout(() => videoEl.pause(), 1000);
    });

    card.appendChild(thumb);

    const title = document.createElement("div");
    title.className = "card-title";
    title.innerText = video.title;
    card.appendChild(title);

    grid.appendChild(card);
  });
}

btnShort.addEventListener("click", () => {
  btnShort.classList.add("active");
  btnLong.classList.remove("active");
  currentData = videosShort;
  renderVideos(filterVideos());
});

btnLong.addEventListener("click", () => {
  btnLong.classList.add("active");
  btnShort.classList.remove("active");
  currentData = videosLong;
  renderVideos(filterVideos());
});

searchInput.addEventListener("input", () => {
  renderVideos(filterVideos());
});

function filterVideos() {
  const query = searchInput.value.toLowerCase();
  return currentData.filter(v => v.title.toLowerCase().includes(query));
}

renderVideos(currentData);
