/*====================================================
            BOARD OF DIRECTORS POPUP
====================================================*/

document.addEventListener("DOMContentLoaded", function () {

    const popup = document.querySelector(".director-popup");
    const popupBox = document.querySelector(".popup-box");

    const popupImage = document.getElementById("popupImage");
    const popupName = document.getElementById("popupName");
    const popupDesignation = document.getElementById("popupDesignation");
    const popupText = document.getElementById("popupText");

    const closeBtn = document.querySelector(".popup-close");

    const readButtons = document.querySelectorAll(".read-more-btn");


    /*====================================================
                    OPEN POPUP
    ====================================================*/

    readButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const image = this.dataset.image;
            const name = this.dataset.name;
            const designation = this.dataset.designation;
            const description = this.dataset.description;

            popupImage.src = image;
            popupImage.alt = name;

            popupName.textContent = name;
            popupDesignation.textContent = designation;
            popupText.textContent = description;

            popup.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    /*====================================================
                    CLOSE POPUP
    ====================================================*/

    function closePopup() {

        popup.classList.remove("active");

        document.body.style.overflow = "";

    }


    /*====================================================
                    CLOSE BUTTON
    ====================================================*/

    if (closeBtn) {

        closeBtn.addEventListener("click", closePopup);

    }


    /*====================================================
                CLICK OUTSIDE CLOSE
    ====================================================*/

    popup.addEventListener("click", function (e) {

        if (e.target === popup) {

            closePopup();

        }

    });


    /*====================================================
                    ESC KEY
    ====================================================*/

    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape" && popup.classList.contains("active")) {

            closePopup();

        }

    });


    /*====================================================
                IMAGE FALLBACK
    ====================================================*/

    popupImage.addEventListener("error", function () {

        this.src = "images/default-user.jpg";

    });


    /*====================================================
                CARD HOVER EFFECT
    ====================================================*/

    const cards = document.querySelectorAll(".director-card");

    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            card.style.transition = ".4s ease";

        });

    });


    /*====================================================
            PREVENT POPUP BOX CLOSE
    ====================================================*/

    popupBox.addEventListener("click", function (e) {

        e.stopPropagation();

    });

});