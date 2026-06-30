const activityCalendarGrid = document.getElementById("activityCalendarGrid");
const activityCalendarImageModal = document.getElementById("activityCalendarImageModal");
const activityCalendarModalImage = document.getElementById("activityCalendarModalImage");
const activityCalendarModalClose = document.getElementById("activityCalendarModalClose");

async function fetchActivityCalendarImages() {
  try {
    activityCalendarGrid.innerHTML = `
      <p class="activity-calendar-loading">Loading activity calendar...</p>
    `;

    const res = await fetch(API_PATHS.ACTIVITY_CALENDAR);
    const data = await res.json();

    if (!res.ok) {
      activityCalendarGrid.innerHTML = `
        <p class="activity-calendar-empty">${data.message || "Images not found"}</p>
      `;
      return;
    }

    if (!data || data.length === 0) {
      activityCalendarGrid.innerHTML = `
        <p class="activity-calendar-empty">No activity calendar images available.</p>
      `;
      return;
    }

    renderActivityCalendarImages(data);

  } catch (error) {
    console.error("Activity calendar fetch error:", error);
    activityCalendarGrid.innerHTML = `
      <p class="activity-calendar-empty">Server error while loading images.</p>
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

function renderActivityCalendarImages(images) {
  activityCalendarGrid.innerHTML = "";

  images.forEach((item) => {
    const imageUrl = getImageUrl(item.image);

    const card = document.createElement("div");
    card.className = "activity-calendar-card";

    card.innerHTML = `
      <img src="${imageUrl}" alt="Activity Calendar Image">
    `;

    card.querySelector("img").addEventListener("click", () => {
      openActivityCalendarImageModal(imageUrl);
    });

    activityCalendarGrid.appendChild(card);
  });
}

function openActivityCalendarImageModal(imageSrc) {
  activityCalendarModalImage.src = imageSrc;
  activityCalendarImageModal.classList.add("active");
}

function closeActivityCalendarImageModal() {
  activityCalendarImageModal.classList.remove("active");
  activityCalendarModalImage.src = "";
}

activityCalendarModalClose.addEventListener("click", closeActivityCalendarImageModal);

activityCalendarImageModal.addEventListener("click", (e) => {
  if (e.target === activityCalendarImageModal) {
    closeActivityCalendarImageModal();
  }
});

fetchActivityCalendarImages();