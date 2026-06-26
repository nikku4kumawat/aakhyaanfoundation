const galleryGrid = document.getElementById("galleryGrid");

let savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
let selectedImage = null;

function renderGallery() {
  galleryGrid.innerHTML = "";

  savedImages.forEach((image, index) => {
    const imageCard = document.createElement("div");
    imageCard.className = "gallery-card image-card";

    imageCard.innerHTML = `
      <img src="${image}" alt="Gallery Image">
      <button class="delete-btn" onclick="deleteImage(${index})">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    galleryGrid.appendChild(imageCard);
  });

  createUploadCard();
}

function createUploadCard() {
  const uploadCard = document.createElement("div");
  uploadCard.className = "gallery-card upload-card";

  uploadCard.innerHTML = `
    <input type="file" accept="image/*" hidden class="imageInput">

    <div class="upload-content">
      <i class="fa-solid fa-plus"></i>
      <h3>Upload Image</h3>
      <p>Click here to upload</p>
    </div>
  `;

  const imageInput = uploadCard.querySelector(".imageInput");

  uploadCard.addEventListener("click", () => {
    imageInput.click();
  });

  imageInput.addEventListener("change", function (e) {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {
      selectedImage = reader.result;

      uploadCard.classList.remove("upload-card");
      uploadCard.classList.add("image-card");

      uploadCard.innerHTML = `
        <img src="${selectedImage}" alt="Preview Image">
        <button class="save-btn">Save Image</button>
      `;

      const saveBtn = uploadCard.querySelector(".save-btn");

      saveBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        saveImage(selectedImage);
      });
    };

    reader.readAsDataURL(file);
  });

  galleryGrid.appendChild(uploadCard);
}

function saveImage(image) {
  savedImages.push(image);

  localStorage.setItem("galleryImages", JSON.stringify(savedImages));

  selectedImage = null;

  renderGallery();
}

function deleteImage(index) {
  savedImages.splice(index, 1);

  localStorage.setItem("galleryImages", JSON.stringify(savedImages));

  renderGallery();
}

renderGallery();
