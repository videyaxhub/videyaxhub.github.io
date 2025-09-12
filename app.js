const popularGrid = document.getElementById("popularGrid");
const grid = document.getElementById("videoGrid");
const btnShort = document.getElementById("btnShort");
const btnLong = document.getElementById("btnLong");

function createCard(video) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <video src="${video.url}" muted></video>
    <div class="play-button">▶</div>
    <div class="card-title">${video.title}</div>
  `;
  card.addEventListener("click", () => {
    const player = document.createElement("video");
    player.src = video.url;
    player.controls = true;
    player.autoplay = true;
    player.style.width = "100%";
    player.style.height = "auto";
    card.innerHTML = "";
    card.appendChild(player);
  });
  return card;
}

function renderVideos(list) {
  grid.innerHTML = "";
  list.forEach(v => grid.appendChild(createCard(v)));
}

// Render popular videos
videosPopular.forEach(v => popularGrid.appendChild(createCard(v)));

// Default: tampilkan short videos
renderVideos(videosShort);

btnShort.addEventListener("click", () => {
  btnShort.classList.add("active");
  btnLong.classList.remove("active");
  renderVideos(videosShort);
});

btnLong.addEventListener("click", () => {
  btnLong.classList.add("active");
  btnShort.classList.remove("active");
  renderVideos(videosLong);
});
