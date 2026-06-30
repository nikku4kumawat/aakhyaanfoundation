const pressCoverageGrid = document.getElementById("pressCoverageGrid");
const pressCoverageImageModal = document.getElementById("pressCoverageImageModal");
const pressCoverageModalImage = document.getElementById("pressCoverageModalImage");
const pressCoverageModalClose = document.getElementById("pressCoverageModalClose");

async function fetchPressCoverageImages() {
  try {
    pressCoverageGrid.innerHTML = `
      <p class="activity-calendar-loading">Loading press coverage...</p>
    `;

    const res = await fetch(API_PATHS.PRESS_COVERAGE);
    const data = await res.json();

    if (!res.ok) {
      pressCoverageGrid.innerHTML = `
        <p class="activity-calendar-empty">${data.message || "Press coverage images not found"}</p>
      `;
      return;
    }

    if (!data || data.length === 0) {
      pressCoverageGrid.innerHTML = `
        <p class="activity-calendar-empty">No press coverage images available.</p>
      `;
      return;
    }

    renderPressCoverageImages(data);

  } catch (error) {
    console.error("Press coverage fetch error:", error);
    pressCoverageGrid.innerHTML = `
      <p class="activity-calendar-empty">Server error while loading press coverage images.</p>
    `;
  }
}

function getImageUrl(imagePath) {
  if (!imagePath) return "";

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  return `${BASE_URL}${imagePath}`;
}

function renderPressCoverageImages(images) {
  pressCoverageGrid.innerHTML = "";

  images.forEach((item) => {
    const imageUrl = getImageUrl(item.image);

    const card = document.createElement("div");
    card.className = "activity-calendar-card";

    card.innerHTML = `
      <img src="${imageUrl}" alt="Press Coverage Image">
    `;

    card.querySelector("img").addEventListener("click", () => {
      openPressCoverageImageModal(imageUrl);
    });

    pressCoverageGrid.appendChild(card);
  });
}

function openPressCoverageImageModal(imageSrc) {
  pressCoverageModalImage.src = imageSrc;
  pressCoverageImageModal.classList.add("active");
}

function closePressCoverageImageModal() {
  pressCoverageImageModal.classList.remove("active");
  pressCoverageModalImage.src = "";
}

pressCoverageModalClose.addEventListener("click", closePressCoverageImageModal);

pressCoverageImageModal.addEventListener("click", (e) => {
  if (e.target === pressCoverageImageModal) {
    closePressCoverageImageModal();
  }
});

fetchPressCoverageImages();