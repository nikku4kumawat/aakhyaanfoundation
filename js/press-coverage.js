const pressGrid = document.getElementById("pressGrid");
const fileInput = document.getElementById("pressFileInput");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

let pressImages = JSON.parse(localStorage.getItem("pressCoverageImages")) || [];
let selectedImage = null;

function renderPressImages() {
  pressGrid.innerHTML = "";

  pressImages.forEach((image, index) => {
    const card = document.createElement("div");
    card.className = "press-card";

    card.innerHTML = `
      <img src="${image}" alt="Press Coverage Image">
      <button class="delete-btn" title="Delete Image">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    card.querySelector("img").addEventListener("click", () => {
      openImageModal(image);
    });

    card.querySelector(".delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteImage(index);
    });

    pressGrid.appendChild(card);
  });

  createUploadCard();
}

function createUploadCard() {
  const uploadCard = document.createElement("div");
  uploadCard.className = "upload-card";

  uploadCard.innerHTML = `
    <div class="upload-content">
      <div class="upload-icon">
        <i class="fa-solid fa-plus"></i>
      </div>
      <h3>Add Press Coverage</h3>
      <p>Click here to upload</p>
    </div>
  `;

  uploadCard.addEventListener("click", () => {
    fileInput.click();
  });

  pressGrid.appendChild(uploadCard);
}

fileInput.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please only image file upload kare.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    selectedImage = e.target.result;
    showPreviewCard(selectedImage);
  };

  reader.readAsDataURL(file);
  fileInput.value = "";
});

function showPreviewCard(imageSrc) {
  const uploadCard = document.querySelector(".upload-card");

  const previewCard = document.createElement("div");
  previewCard.className = "press-card";

  previewCard.innerHTML = `
    <img src="${imageSrc}" alt="Preview Image">
    <button class="save-btn">Save Image</button>
  `;

  previewCard.querySelector(".save-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    saveImage(imageSrc);
  });

  previewCard.querySelector("img").addEventListener("click", () => {
    openImageModal(imageSrc);
  });

  pressGrid.insertBefore(previewCard, uploadCard);
  uploadCard.remove();
}

function saveImage(imageSrc) {
  pressImages.push(imageSrc);

  // abhi frontend testing ke liye localStorage
  localStorage.setItem("pressCoverageImages", JSON.stringify(pressImages));

  // backend banne ke baad yahan POST API call lagegi
  // fetch(`${API_BASE_URL}/api/press-coverage`, {
  //   method: "POST",
  //   body: formData
  // });

  selectedImage = null;
  renderPressImages();
}

function deleteImage(index) {
  const confirmDelete = confirm("Are you sure you want to delete this image?");

  if (!confirmDelete) return;

  pressImages.splice(index, 1);
  localStorage.setItem("pressCoverageImages", JSON.stringify(pressImages));

  // backend banne ke baad yahan DELETE API call lagegi
  // fetch(`${API_BASE_URL}/api/press-coverage/${id}`, {
  //   method: "DELETE"
  // });

  renderPressImages();
}

function openImageModal(imageSrc) {
  modalImage.src = imageSrc;
  imageModal.classList.add("active");
}

function closeImageModal() {
  imageModal.classList.remove("active");
  modalImage.src = "";
}

modalClose.addEventListener("click", closeImageModal);

imageModal.addEventListener("click", (e) => {
  if (e.target === imageModal) {
    closeImageModal();
  }
});

renderPressImages();