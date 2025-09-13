function getVideoArray(type) {
  if (type === 'short') return window.videosShort || [];
  if (type === 'long') return window.videosLong || [];
  if (type === 'popular') return window.videosPopular || [];
  return [];
}
const navButtons = document.querySelectorAll('.nav-right button');
let currentType = "short";
navButtons.forEach(btn => {
  btn.onclick = function() {
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentType = btn.getAttribute('data-type');
    renderGrid();
  }
});
const searchInput = document.getElementById('searchInput');
searchInput.oninput = function() { renderGrid(); };

function renderGrid() {
  const grid = document.getElementById('videoGrid');
  let arr = getVideoArray(currentType);
  const q = searchInput.value.trim().toLowerCase();
  if (q) arr = arr.filter(v => v.title.toLowerCase().includes(q));
  grid.innerHTML = '';
  if (!arr.length) {
    grid.innerHTML = '<div style="color:#ccc;text-align:center;font-size:1.3rem;margin:40px auto;">No videos found.</div>';
    return;
  }
  // Random thumbnail for first card
  let randomThumbIdx = Math.floor(Math.random() * arr.length);
  let thumbUrl = arr[randomThumbIdx].url;
  arr = arr.map((v,idx) => ({...v, isThumb: idx === randomThumbIdx}));
  arr.forEach((vid,i) => {
    const thumb = vid.isThumb ? thumbUrl : vid.url;
    grid.appendChild(createVideoCard(vid, thumb, i));
  });
}

function createVideoCard(vid, thumbUrl, idx) {
  const card = document.createElement('div');
  card.className = 'video-card';
  card.tabIndex = 0;
  // THUMBNAIL + preview 1 second on tap (mobile) or click (desktop)
  const thumbCont = document.createElement('div');
  thumbCont.className = 'thumbnail-container';
  const thumbVid = document.createElement('video');
  thumbVid.src = thumbUrl;
  thumbVid.muted = true;
  thumbVid.playsInline = true;
  thumbVid.preload = "metadata";
  thumbVid.poster = ""; // add image thumbnail if available
  thumbVid.setAttribute("loading", "lazy");
  thumbCont.appendChild(thumbVid);

  // Overlay play button
  const overlay = document.createElement('div');
  overlay.className = 'thumbnail-overlay';
  const playBtn = document.createElement('button');
  playBtn.className = 'play-overlay-btn';
  playBtn.innerHTML = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="#e50914"/>
    <polygon points="15,12 27,18 15,24" fill="#fff"/>
  </svg>`;
  overlay.appendChild(playBtn);

  // Preview 1 second on tap/click
  let previewing = false;
  function previewPlay() {
    if (previewing) return;
    previewing = true;
    thumbVid.currentTime = 0;
    thumbVid.play();
    setTimeout(() => { thumbVid.pause(); thumbVid.currentTime = 0; previewing = false; }, 1000);
  }
  thumbCont.onclick = previewPlay;
  playBtn.onclick = (e) => {
    e.stopPropagation();
    showModal(vid.url);
  };
  thumbCont.appendChild(overlay);

  // Title
  const title = document.createElement('div');
  title.className = 'video-title';
  title.textContent = vid.title;

  card.appendChild(thumbCont);
  card.appendChild(title);
  return card;
}

// --- MODAL PLAYER ---
const videoModal = document.getElementById('videoModal');
const closeModal = document.getElementById('closeModal');
const fullVideo = document.getElementById('fullVideo');
function showModal(url) {
  fullVideo.querySelector('source').src = url;
  fullVideo.load();
  fullVideo.play();
  videoModal.style.display = 'flex';
  closeModal.focus();
}
closeModal.onclick = function() {
  videoModal.style.display = 'none';
  fullVideo.pause();
};
closeModal.onkeydown = function(e) {
  if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
    videoModal.style.display = 'none';
    fullVideo.pause();
  }
};
window.onclick = function(event) {
  if (event.target == videoModal) {
    videoModal.style.display = 'none';
    fullVideo.pause();
  }
};

window.onload = function() { renderGrid(); };
