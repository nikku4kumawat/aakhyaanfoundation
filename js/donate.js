const donationForm = document.getElementById("donationForm");

if (donationForm) {
  donationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = donationForm.querySelector(".donate-btn");

    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    try {
      const formData = new FormData();

      formData.append("fullName", document.getElementById("fullName").value.trim());
      formData.append("mobile", document.getElementById("mobile").value.trim());
      formData.append("email", document.getElementById("email").value.trim());
      formData.append("panNumber", document.getElementById("panNumber").value.trim());
      formData.append("address", document.getElementById("address").value.trim());
      formData.append("donationAmount", document.getElementById("donationAmount").value);
      formData.append("documentType", document.getElementById("documentType").value);
      formData.append("documentNumber", document.getElementById("documentNumber").value.trim());

      const photo = document.getElementById("photo").files[0];
      const documentFront = document.getElementById("documentFront").files[0];
      const documentBack = document.getElementById("documentBack").files[0];

      if (photo) formData.append("photo", photo);
      if (documentFront) formData.append("documentFront", documentFront);
      if (documentBack) formData.append("documentBack", documentBack);

      const response = await fetch(API_PATHS.DONATE, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert("Donation form submitted successfully!");
      donationForm.reset();

    } catch (error) {
      console.log("DONATION FORM ERROR:", error);
      alert("Server error. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = "Donate Now";
    }
  });
}