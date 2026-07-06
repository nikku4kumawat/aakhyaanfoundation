const donationForm = document.getElementById("donationForm");

/*=========================================
        IMAGE PREVIEW + FILE NAME
=========================================*/

function updatePreview(inputId, previewId, textId, iconId, defaultText) {

    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    const text = document.getElementById(textId);
    const icon = document.getElementById(iconId);

    if (!input || !preview || !text || !icon) return;

    input.addEventListener("change", () => {

        if (input.files.length > 0) {

            const reader = new FileReader();

            reader.onload = function (e) {

                preview.src = e.target.result;
                preview.style.display = "block";

                icon.style.display = "none";

            };

            reader.readAsDataURL(input.files[0]);

            text.innerText = input.files[0].name;

        } else {

            preview.style.display = "none";
            preview.src = "";

            icon.style.display = "block";

            text.innerText = defaultText;

        }

    });

}

updatePreview(
    "photo",
    "photoPreview",
    "photoText",
    "photoIcon",
    "Upload Photo"
);

updatePreview(
    "documentFront",
    "frontPreview",
    "frontText",
    "frontIcon",
    "Upload Front"
);

updatePreview(
    "documentBack",
    "backPreview",
    "backText",
    "backIcon",
    "Upload Back"
);


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
            previewReset();

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

/*=========================================
        RESET IMAGE PREVIEW
=========================================*/

function previewReset() {

    [
        {
            preview: "photoPreview",
            icon: "photoIcon",
            text: "photoText",
            defaultText: "Upload Photo"
        },
        {
            preview: "frontPreview",
            icon: "frontIcon",
            text: "frontText",
            defaultText: "Upload Front"
        },
        {
            preview: "backPreview",
            icon: "backIcon",
            text: "backText",
            defaultText: "Upload Back"
        }

    ].forEach(item => {

        document.getElementById(item.preview).style.display = "none";
        document.getElementById(item.preview).src = "";

        document.getElementById(item.icon).style.display = "block";

        document.getElementById(item.text).innerText = item.defaultText;

    });

}