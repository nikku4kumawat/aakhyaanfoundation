const membershipForm = document.querySelector(".registration-form");

if (membershipForm) {
  membershipForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = membershipForm.querySelector(".submit-btn");

    try {
      submitBtn.disabled = true;
      submitBtn.innerText = "Submitting...";

      const formData = new FormData(membershipForm);

      const response = await fetch(API_PATHS.MEMBERS, {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      let data = {};

      try {
        data = JSON.parse(text);
      } catch {
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

        if (preview) preview.style.display = "none";
        if (placeholder) placeholder.style.display = "flex";
        if (fileName) fileName.textContent = "";
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