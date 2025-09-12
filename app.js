const slider = document.querySelector('.grid-slider');
const modal = document.getElementById("modal");
const modalVideo = document.getElementById("modal-video");
const modalClose = document.querySelector(".modal-close");

function pauseAllPreviews() {
  document.querySelectorAll('.card video').forEach(v => v.pause());
}

function playAllPreviews() {
  document.querySelectorAll('.card video').forEach(v => v.play().catch(()=>{}));
}

function openModal(videoUrl) {
  pauseAllPreviews();
  modal.classList.add("active");
  modalVideo.src = videoUrl;
  modalVideo.play().catch(()=>{});
}

function closeModal() {
  modal.classList.remove("active");
  modalVideo.pause();
  modalVideo.src = "";
  playAllPreviews();
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function createCard(movie) {
  const card = document.createElement('div');
  card.className = 'card';

  const vid = document.createElement('video');
  vid.src = movie.video + "#t=0,1";
  vid.muted = true;
  vid.playsInline = true;
  vid.autoplay = true;
  vid.loop = true;
  vid.loading = "lazy";
  card.appendChild(vid);

  const playBtn = document.createElement('div');
  playBtn.className = 'play-btn';
  playBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
  card.appendChild(playBtn);

  const title = document.createElement('div');
  title.className = 'card-title';
  title.textContent = movie.title;
  card.appendChild(title);

  card.addEventListener('click', () => openModal(movie.video));

  return card;
}

function renderMovies(movies) {
  slider.innerHTML = "";
  movies.forEach(m => slider.appendChild(createCard(m)));
}
