// const donationForm = document.getElementById("donationForm");

// if (donationForm) {
//   donationForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const submitBtn = donationForm.querySelector(".donate-btn");

//     submitBtn.disabled = true;
//     submitBtn.innerText = "Submitting...";

//     try {
//       const formData = new FormData();

//       formData.append("fullName", document.getElementById("fullName").value.trim());
//       formData.append("mobile", document.getElementById("mobile").value.trim());
//       formData.append("email", document.getElementById("email").value.trim());
//       formData.append("panNumber", document.getElementById("panNumber").value.trim());
//       formData.append("address", document.getElementById("address").value.trim());
//       formData.append("donationAmount", document.getElementById("donationAmount").value);
//       formData.append("documentType", document.getElementById("documentType").value);
//       formData.append("documentNumber", document.getElementById("documentNumber").value.trim());

//       const photo = document.getElementById("photo").files[0];
//       const documentFront = document.getElementById("documentFront").files[0];
//       const documentBack = document.getElementById("documentBack").files[0];

//       if (photo) formData.append("photo", photo);
//       if (documentFront) formData.append("documentFront", documentFront);
//       if (documentBack) formData.append("documentBack", documentBack);

//       const response = await fetch(API_PATHS.DONATE, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         alert(data.message || "Something went wrong");
//         return;
//       }

//       alert("Donation form submitted successfully!");
//       donationForm.reset();

//     } catch (error) {
//       console.log("DONATION FORM ERROR:", error);
//       alert("Server error. Please try again.");
//     } finally {
//       submitBtn.disabled = false;
//       submitBtn.innerText = "Donate Now";
//     }
//   });
// }






const donationForm = document.getElementById("donationForm");

/*=========================================
        SHOW SELECTED FILE NAME
=========================================*/

function updateFileName(inputId, textId, defaultText) {
    const input = document.getElementById(inputId);
    const text = document.getElementById(textId);

    if (!input || !text) return;

    input.addEventListener("change", () => {
        if (input.files.length > 0) {
            text.innerText = input.files[0].name;
        } else {
            text.innerText = defaultText;
        }
    });
}

updateFileName("photo", "photoText", "Upload Photo");
updateFileName("documentFront", "frontText", "Upload Front");
updateFileName("documentBack", "backText", "Upload Back");


/*=========================================
            DONATION FORM
=========================================*/

if (donationForm) {

    donationForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const submitBtn = donationForm.querySelector(".donate-btn");

        submitBtn.disabled = true;
        submitBtn.innerText = "Submitting...";

        try {

            const fullName = document.getElementById("fullName").value.trim();
            const mobile = document.getElementById("mobile").value.trim();
            const email = document.getElementById("email").value.trim();
            const panNumber = document.getElementById("panNumber").value.trim();
            const address = document.getElementById("address").value.trim();
            const donationAmount = document.getElementById("donationAmount").value;
            const documentType = document.getElementById("documentType").value;
            const documentNumber = document.getElementById("documentNumber").value.trim();

            /*=========================
                    VALIDATION
            =========================*/

            if (
                !fullName ||
                !mobile ||
                !address ||
                !donationAmount ||
                !documentType ||
                !documentNumber
            ) {
                alert("Please fill all required fields.");

                submitBtn.disabled = false;
                submitBtn.innerText = "Donate Now";

                return;
            }

            /*=========================
                    FORM DATA
            =========================*/

            const formData = new FormData();

            formData.append("fullName", fullName);
            formData.append("mobile", mobile);
            formData.append("email", email);
            formData.append("panNumber", panNumber);
            formData.append("address", address);
            formData.append("donationAmount", donationAmount);
            formData.append("documentType", documentType);
            formData.append("documentNumber", documentNumber);

            const photo = document.getElementById("photo").files[0];
            const documentFront = document.getElementById("documentFront").files[0];
            const documentBack = document.getElementById("documentBack").files[0];

            if (photo) {
                formData.append("photo", photo);
            }

            if (documentFront) {
                formData.append("documentFront", documentFront);
            }

            if (documentBack) {
                formData.append("documentBack", documentBack);
            }

            /*=========================
                SEND TO BACKEND
            =========================*/

            const response = await fetch(API_PATHS.DONATE, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            alert("Donation form submitted successfully!");

            donationForm.reset();

            document.getElementById("photoText").innerText = "Upload Photo";
            document.getElementById("frontText").innerText = "Upload Front";
            document.getElementById("backText").innerText = "Upload Back";

        }

        catch (error) {

            console.error("DONATION ERROR :", error);

            alert(error.message || "Server Error. Please try again.");

        }

        finally {

            submitBtn.disabled = false;
            submitBtn.innerText = "Donate Now";

        }

    });

}