let currentVideos = videosShort;

function renderVideos(videos) {
  const grid = document.getElementById('videoGrid');
  grid.innerHTML = '';
  videos.forEach(video => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <video src="${video.url}" muted preload="metadata"></video>
      <div class="video-title">${video.title}</div>`;
    card.addEventListener('mouseenter', () => {
      try {
        const vid = card.querySelector('video');
        vid.currentTime = 0;
        vid.play();
        setTimeout(() => vid.pause(), 1000);
      } catch(e) {}
    });
    card.addEventListener('mouseleave', () => card.querySelector('video').pause());
    card.addEventListener('click', () => window.open(video.url, '_blank'));
    grid.appendChild(card);
  });
}

function switchToShort() {
  currentVideos = videosShort;
  setActiveButton('shortBtn');
  renderVideos(currentVideos);
}

function switchToLong() {
  currentVideos = videosLong;
  setActiveButton('longBtn');
  renderVideos(currentVideos);
}

function switchToPopular() {
  currentVideos = videosPopular;
  setActiveButton('popularBtn');
  renderVideos(currentVideos);
}

function setActiveButton(activeId) {
  ['shortBtn','longBtn','popularBtn'].forEach(id => {
    document.getElementById(id).classList.toggle('active', id === activeId);
  });
}

document.getElementById('searchInput').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = currentVideos.filter(v => v.title.toLowerCase().includes(query));
  renderVideos(filtered);
});

document.getElementById('shortBtn').addEventListener('click', switchToShort);
document.getElementById('longBtn').addEventListener('click', switchToLong);
document.getElementById('popularBtn').addEventListener('click', switchToPopular);

function enterSite() {
  localStorage.setItem('ageVerified', 'true');
  document.getElementById('ageGate').style.display = 'none';
}

window.onload = () => {
  if (localStorage.getItem('ageVerified')) {
    document.getElementById('ageGate').style.display = 'none';
  }
  renderVideos(currentVideos);
};
