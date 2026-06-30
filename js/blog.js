const blogGrid = document.getElementById("blogGrid");
const blogImageModal = document.getElementById("blogImageModal");
const blogModalImage = document.getElementById("blogModalImage");
const blogModalClose = document.getElementById("blogModalClose");

async function fetchBlogImages() {
  try {
    blogGrid.innerHTML = `
      <p class="activity-calendar-loading">Loading blog images...</p>
    `;

    const res = await fetch(API_PATHS.ADMIN_BLOG);
    const data = await res.json();

    if (!res.ok) {
      blogGrid.innerHTML = `
        <p class="activity-calendar-empty">${data.message || "Blog images not found"}</p>
      `;
      return;
    }

    if (!data || data.length === 0) {
      blogGrid.innerHTML = `
        <p class="activity-calendar-empty">No blog images available.</p>
      `;
      return;
    }

    renderBlogImages(data);

  } catch (error) {
    console.error("Blog fetch error:", error);
    blogGrid.innerHTML = `
      <p class="activity-calendar-empty">Server error while loading blog images.</p>
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

function renderBlogImages(images) {
  blogGrid.innerHTML = "";

  images.forEach((item) => {
    const imageUrl = getImageUrl(item.image);

    const card = document.createElement("div");
    card.className = "activity-calendar-card";

    card.innerHTML = `
      <img src="${imageUrl}" alt="Blog Image">
    `;

    card.querySelector("img").addEventListener("click", () => {
      openBlogImageModal(imageUrl);
    });

    blogGrid.appendChild(card);
  });
}

function openBlogImageModal(imageSrc) {
  blogModalImage.src = imageSrc;
  blogImageModal.classList.add("active");
}

function closeBlogImageModal() {
  blogImageModal.classList.remove("active");
  blogModalImage.src = "";
}

blogModalClose.addEventListener("click", closeBlogImageModal);

blogImageModal.addEventListener("click", (e) => {
  if (e.target === blogImageModal) {
    closeBlogImageModal();
  }
});

fetchBlogImages();