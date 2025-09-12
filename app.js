const container = document.getElementById('videoContainer');
const searchInput = document.getElementById('searchInput');
const btnShort = document.getElementById('btnShort');
const btnLong = document.getElementById('btnLong');

let currentList = videosShort;

// Display videos
function displayVideos(list) {
  container.innerHTML = '';
  list.forEach(video => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <video preload="metadata" muted playsinline loop>
        <source src="${video.url}" type="video/mp4">
      </video>
      <div class="play-btn"></div>
      <p>${video.title}</p>
    `;
    card.addEventListener('click', () => openModal(video.url));
    container.appendChild(card);
  });
}

// Open modal
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeBtn = document.querySelector('.close');

function openModal(url) {
  modal.style.display = 'flex';
  modalVideo.src = url;
  modalVideo.play();
}

closeBtn.onclick = () => {
  modal.style.display = 'none';
  modalVideo.pause();
  modalVideo.src = '';
};

window.onclick = (e) => {
  if (e.target === modal) closeBtn.click();
};

// Search
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = currentList.filter(v => v.title.toLowerCase().includes(searchTerm));
  displayVideos(filtered);
});

// Switch buttons
btnShort.addEventListener('click', () => {
  btnShort.classList.add('active');
  btnLong.classList.remove('active');
  currentList = videosShort;
  displayVideos(currentList);
});

btnLong.addEventListener('click', () => {
  btnLong.classList.add('active');
  btnShort.classList.remove('active');
  currentList = videosLong;
  displayVideos(currentList);
});

// Init
displayVideos(currentList);
