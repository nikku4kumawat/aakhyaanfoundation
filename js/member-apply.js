const membershipForm = document.querySelector(".registration-form");

if (membershipForm) {
  membershipForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = membershipForm.querySelector(".submit-btn");

    try {
      submitBtn.disabled = true;
      submitBtn.innerText = "Submitting...";

      const formData = new FormData(membershipForm);

      const profileImage = document.getElementById("profileImage").files[0];
      const idUpload = document.getElementById("idUpload").files[0];
      const otherUpload = document.getElementById("otherUpload").files[0];

      if (profileImage) formData.append("profileImage", profileImage);
      if (idUpload) formData.append("idUpload", idUpload);
      if (otherUpload) formData.append("otherUpload", otherUpload);

      const response = await fetch(API_PATHS.MEMBERS, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert("Membership form submitted successfully!");
      membershipForm.reset();

    } catch (error) {
      console.log("MEMBERSHIP FORM ERROR:", error);
      alert("Server error. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Application";
    }
  });
}