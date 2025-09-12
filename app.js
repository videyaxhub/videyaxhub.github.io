const container = document.getElementById('video-container');
const modal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const closeModal = document.getElementById('close-modal');

function renderVideos(category) {
  container.innerHTML = '';
  let data = [];
  if (category === 'short') data = videos_short;
  if (category === 'long') data = videosLong;
  if (category === 'popular') data = videosPopular;

  data.forEach(video => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <video preload="metadata" muted playsinline loop loading="lazy">
        <source src="${video.url}" type="video/mp4">
      </video>
      <p style="padding: 5px;">${video.title}</p>
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

// Load default category
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
