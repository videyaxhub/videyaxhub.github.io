function renderVideos(category) {
  let data = [];
  if (category === "short") data = videos_short;
  if (category === "long") data = videos_long;
  if (category === "popular") data = videos_popular;

  const container = document.getElementById("videoGrid");
  container.innerHTML = "";

  data.forEach(video => {
    const card = document.createElement("div");
    card.classList.add("video-card");
    card.innerHTML = `
      <video src="${video.url}" muted></video>
      <p>${video.title}</p>
    `;
    card.addEventListener("click", () => openModal(video.url));
    container.appendChild(card);
  });

  // Update active tab
  document.querySelectorAll(".nav-links li").forEach(li => li.classList.remove("active"));
  document.querySelector(`.nav-links li[onclick="renderVideos('${category}')"]`).classList.add("active");
}

function openModal(videoUrl) {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  modal.style.display = "block";
  modalVideo.src = videoUrl;
  modalVideo.play();
}

function closeModal() {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  modal.style.display = "none";
  modalVideo.pause();
  modalVideo.src = "";
}

// Load default category
window.onload = () => {
  renderVideos("popular");
};
