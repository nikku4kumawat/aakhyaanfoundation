// ===========================
// IMAGE / FILE PREVIEW
// ===========================

function previewImage(inputId) {
  const input = document.getElementById(inputId);

  if (!input) return;

  const box = input.previousElementSibling;
  if (!box) return;

  const img = box.querySelector(".upload-preview");
  const placeholder = box.querySelector(".upload-placeholder");
  const fileName = box.querySelector(".file-name");

  input.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    if (fileName) {
      fileName.textContent = file.name;
    }

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = function (e) {
        if (img) {
          img.src = e.target.result;
          img.style.display = "block";
        }

        if (placeholder) {
          placeholder.style.display = "none";
        }
      };

      reader.readAsDataURL(file);
    } else {
      if (img) {
        img.style.display = "none";
      }

      if (placeholder) {
        placeholder.style.display = "flex";
      }

      if (fileName) {
        fileName.textContent = file.name;
      }
    }
  });
}

previewImage("profileImage");
previewImage("idUpload");
previewImage("otherUpload");


// ===========================
// FORM SUBMIT
// ===========================

const membershipForm = document.querySelector(".registration-form");

if (membershipForm) {
  membershipForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = membershipForm.querySelector(".submit-btn");

    try {
      submitBtn.disabled = true;
      submitBtn.innerText = "Submitting...";

      // Important:
      // FormData form se files automatically add ho rahi hain,
      // isliye files ko dobara append mat karo.
      const formData = new FormData(membershipForm);

      const response = await fetch(API_PATHS.MEMBERS, {
        method: "POST",
        body: formData,
      });

      const text = await response.text();

      let data = {};

      try {
        data = JSON.parse(text);
      } catch (error) {
        console.log("SERVER RESPONSE:", text);
      }

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert("Membership form submitted successfully!");

      membershipForm.reset();

      document.querySelectorAll(".upload-box").forEach((box) => {
        const preview = box.querySelector(".upload-preview");
        const placeholder = box.querySelector(".upload-placeholder");
        const fileName = box.querySelector(".file-name");

        if (preview) {
          preview.src = "";
          preview.style.display = "none";
        }

        if (placeholder) {
          placeholder.style.display = "flex";
        }

        if (fileName) {
          fileName.textContent = "";
        }
      });

    } catch (error) {
      console.log("MEMBERSHIP FORM ERROR:", error);
      alert("Server error. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Application";
    }
  });
}