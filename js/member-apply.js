// ===========================
// IMAGE PREVIEW
// ===========================

function previewImage(inputId){

    const input=document.getElementById(inputId);

    const box=input.previousElementSibling;

    const img=box.querySelector(".upload-preview");

    const placeholder=box.querySelector(".upload-placeholder");

    const fileName=box.querySelector(".file-name");

    input.addEventListener("change",function(){

        const file=this.files[0];

        if(!file) return;

        fileName.textContent=file.name;

        if(file.type.startsWith("image/")){

            const reader=new FileReader();

            reader.onload=function(e){

                img.src=e.target.result;

                img.style.display="block";

                placeholder.style.display="none";

            };

            reader.readAsDataURL(file);

        }
        else{

            img.style.display="none";

            placeholder.style.display="flex";

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

      document.querySelectorAll(".upload-box").forEach(box=>{

      box.querySelector(".upload-preview").style.display="none";

      box.querySelector(".upload-placeholder").style.display="flex";

      box.querySelector(".file-name").textContent="";

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