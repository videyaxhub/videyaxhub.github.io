const container = document.getElementById('video-container');
const searchInput = document.getElementById('search');
const modal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const closeModal = document.getElementById('close-modal');

let currentCategory = 'short';
let currentVideos = [];

function renderVideos(category) {
  currentCategory = category;
  container.innerHTML = '';
  if (category === 'short') currentVideos = videos_short;
  if (category === 'long') currentVideos = videosLong;
  if (category === 'popular') currentVideos = videosPopular;
  displayVideos(currentVideos);
}

function displayVideos(list) {
  container.innerHTML = '';
  list.forEach(video => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <video preload="metadata" muted playsinline loop poster="${video.poster || ''}">
        <source src="${video.url}" type="video/mp4">
      </video>
      <p>${video.title}</p>
    `;
    card.addEventListener('click', () => openModal(video.url));
    container.appendChild(card);
  });
}

function openModal(url) {
  modal.style.display = 'flex';
  modalVideo.src = url;
  modalVideo.play();
}

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  modalVideo.pause();
  modalVideo.src = '';
});

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderVideos(btn.dataset.category);
  });
});

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = currentVideos.filter(v => v.title.toLowerCase().includes(keyword));
  displayVideos(filtered);
});

// Load default
renderVideos('short');

function displayVideos(list) {
  container.innerHTML = '';
  list.forEach(video => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <video preload="metadata" muted playsinline loop poster="${video.poster || ''}">
        <source src="${video.url}" type="video/mp4">
      </video>
      <div class="play-btn"></div>
      <p>${video.title}</p>
    `;
    card.addEventListener('click', () => openModal(video.url));
    container.appendChild(card);
  });
}
