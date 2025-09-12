let currentCategory = 'short';

function enterSite() {
  document.getElementById("age-gate").style.display = "none";
  showVideos('short');
}

function showVideos(category) {
  currentCategory = category;
  let videos = [];
  if (category === 'short') videos = videosShort;
  if (category === 'long') videos = videosLong;
  if (category === 'popular') videos = videosPopular;

  const grid = document.getElementById("video-grid");
  grid.innerHTML = "";

  videos.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";

    const vid = document.createElement("video");
    vid.src = video.url;
    vid.muted = true;

    // Hover preview
    card.addEventListener("mouseenter", () => {
      vid.currentTime = 0;
      vid.play();
      setTimeout(() => vid.pause(), 1000);
    });

    const title = document.createElement("h3");
    title.textContent = video.title;

    const playBtn = document.createElement("button");
    playBtn.className = "play-btn";
    playBtn.innerHTML = "▶";
    playBtn.onclick = () => window.open(video.url, "_blank");

    card.appendChild(vid);
    card.appendChild(title);
    card.appendChild(playBtn);
    grid.appendChild(card);
  });
}

function filterVideos() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const allCards = document.querySelectorAll(".video-card");
  allCards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = title.includes(searchValue) ? "" : "none";
  });
}
