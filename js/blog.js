const blogGrid = document.getElementById("blogGrid");
const blogFileInput = document.getElementById("blogFileInput");
const blogImageModal = document.getElementById("blogImageModal");
const blogModalImage = document.getElementById("blogModalImage");
const blogModalClose = document.getElementById("blogModalClose");

let blogImages = JSON.parse(localStorage.getItem("blogImages")) || [];
let selectedBlogImage = null;

function renderBlogImages() {
  blogGrid.innerHTML = "";

  blogImages.forEach((image, index) => {
    const card = document.createElement("div");
    card.className = "blog-card";

    card.innerHTML = `
      <img src="${image}" alt="Blog Image">
      <button class="blog-delete-btn" title="Delete Image">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    card.querySelector("img").addEventListener("click", () => {
      openBlogImageModal(image);
    });

    card.querySelector(".blog-delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteBlogImage(index);
    });

    blogGrid.appendChild(card);
  });

  createBlogUploadCard();
}

function createBlogUploadCard() {
  const uploadCard = document.createElement("div");
  uploadCard.className = "blog-upload-card";

  uploadCard.innerHTML = `
    <div class="blog-upload-content">
      <div class="blog-upload-icon">
        <i class="fa-solid fa-plus"></i>
      </div>
      <h3>Add Blog Image</h3>
      <p>Click here to upload</p>
    </div>
  `;

  uploadCard.addEventListener("click", () => {
    blogFileInput.click();
  });

  blogGrid.appendChild(uploadCard);
}

blogFileInput.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please only image file upload kare.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    selectedBlogImage = e.target.result;
    showBlogPreviewCard(selectedBlogImage);
  };

  reader.readAsDataURL(file);
  blogFileInput.value = "";
});

function showBlogPreviewCard(imageSrc) {
  const uploadCard = document.querySelector(".blog-upload-card");

  const previewCard = document.createElement("div");
  previewCard.className = "blog-card";

  previewCard.innerHTML = `
    <img src="${imageSrc}" alt="Preview Blog Image">
    <button class="blog-save-btn">Save</button>
  `;

  previewCard.querySelector(".blog-save-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    saveBlogImage(imageSrc);
  });

  previewCard.querySelector("img").addEventListener("click", () => {
    openBlogImageModal(imageSrc);
  });

  blogGrid.insertBefore(previewCard, uploadCard);
  uploadCard.remove();
}

function saveBlogImage(imageSrc) {
  blogImages.push(imageSrc);

  localStorage.setItem("blogImages", JSON.stringify(blogImages));

  // backend banne ke baad yahan POST API call lagegi
  // fetch(`${API_BASE_URL}/api/blog`, {
  //   method: "POST",
  //   body: formData
  // });

  selectedBlogImage = null;
  renderBlogImages();
}

function deleteBlogImage(index) {
  const confirmDelete = confirm("Do you want to delete this blog image?");

  if (!confirmDelete) return;

  blogImages.splice(index, 1);
  localStorage.setItem("blogImages", JSON.stringify(blogImages));

  // backend banne ke baad yahan DELETE API call lagegi
  // fetch(`${API_BASE_URL}/api/blog/${id}`, {
  //   method: "DELETE"
  // });

  renderBlogImages();
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

renderBlogImages();