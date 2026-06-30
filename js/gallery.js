const galleryGrid = document.getElementById("galleryGrid");
const galleryImageModal = document.getElementById("galleryImageModal");
const galleryModalImage = document.getElementById("galleryModalImage");
const galleryModalClose = document.getElementById("galleryModalClose");

async function fetchGalleryImages() {
  try {
    galleryGrid.innerHTML = `
      <p class="activity-calendar-loading">Loading gallery images...</p>
    `;

    const res = await fetch(API_PATHS.ADMIN_GALLERY);
    const data = await res.json();

    if (!res.ok) {
      galleryGrid.innerHTML = `
        <p class="activity-calendar-empty">${data.message || "Gallery images not found"}</p>
      `;
      return;
    }

    if (!data || data.length === 0) {
      galleryGrid.innerHTML = `
        <p class="activity-calendar-empty">No gallery images available.</p>
      `;
      return;
    }

    renderGalleryImages(data);

  } catch (error) {
    console.error("Gallery fetch error:", error);
    galleryGrid.innerHTML = `
      <p class="activity-calendar-empty">Server error while loading gallery images.</p>
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

function renderGalleryImages(images) {
  galleryGrid.innerHTML = "";

  images.forEach((item) => {
    const imageUrl = getImageUrl(item.image);

    const card = document.createElement("div");
    card.className = "activity-calendar-card";

    card.innerHTML = `
      <img src="${imageUrl}" alt="Gallery Image">
    `;

    card.querySelector("img").addEventListener("click", () => {
      openGalleryImageModal(imageUrl);
    });

    galleryGrid.appendChild(card);
  });
}

function openGalleryImageModal(imageSrc) {
  galleryModalImage.src = imageSrc;
  galleryImageModal.classList.add("active");
}

function closeGalleryImageModal() {
  galleryImageModal.classList.remove("active");
  galleryModalImage.src = "";
}

galleryModalClose.addEventListener("click", closeGalleryImageModal);

galleryImageModal.addEventListener("click", (e) => {
  if (e.target === galleryImageModal) {
    closeGalleryImageModal();
  }
});

fetchGalleryImages();