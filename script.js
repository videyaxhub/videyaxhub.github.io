const grid = document.getElementById('video-grid');
const modal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const closeBtn = document.querySelector('.close-btn');
const searchInput = document.getElementById('search-input');

let currentCategory = 'short';

function renderVideos(videos) {
  grid.innerHTML = '';
  videos.forEach(video => {
    const card = document.createElement('div');
    card.classList.add('video-card');
    card.innerHTML = `
      <video muted preload="metadata" src="${video.url}"></video>
      <div class="video-title">${video.title}</div>
    `;
    card.addEventListener('mouseenter', () => {
      const vid = card.querySelector('video');
      vid.currentTime = 0;
      vid.play();
      setTimeout(() => vid.pause(), 1000);
    });
    card.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalVideo.src = video.url;
      modalVideo.play();
    });
    grid.appendChild(card);
  });
}

function loadCategory(category) {
  currentCategory = category;
  if (category === 'short') renderVideos(videosShort);
  if (category === 'long') renderVideos(videosLong);
  if (category === 'popular') renderVideos(videosPopular);
}

document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    loadCategory(btn.dataset.category);
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modalVideo.pause();
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modalVideo.pause();
  }
});

searchInput.addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const videos = currentCategory === 'short' ? videosShort :
                 currentCategory === 'long' ? videosLong : videosPopular;
  const filtered = videos.filter(v => v.title.toLowerCase().includes(query));
  renderVideos(filtered);
});

// Age Gate
document.getElementById('yes-btn').addEventListener('click', () => {
  document.getElementById('age-gate').style.display = 'none';
  document.getElementById('main-content').style.display = 'block';
  loadCategory('short');
});

document.getElementById('no-btn').addEventListener('click', () => {
  window.location.href = "https://google.com";
});
