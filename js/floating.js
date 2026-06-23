document.addEventListener("DOMContentLoaded", () => {

    const floatingContainer = document.getElementById("floating-icons");

    if (floatingContainer) {

        floatingContainer.innerHTML = `
            <div class="floating-icons">

                 <!-- twiter -->
                <a href="https://x.com/"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="floating-icon twiter ring-effect"
                   title="https://x.com/">
                    <i class="fa-brands fa-x-twitter"></i>
                </a>
                
                <!-- LinkedIn -->
                <a href="https://www.linkedin.com/company/aakhyaan-foundation/"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="floating-icon linkedin ring-effect"
                   title="https://www.linkedin.com/company/aakhyaan-foundation/">
                    <i class="fa-brands fa-linkedin-in"></i>
                </a>

                <!-- Instagram -->
                <a href="https://www.instagram.com/aakhyanfoundation/"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="floating-icon instagram ring-effect"
                   title="https://www.instagram.com/aakhyanfoundation/">
                    <i class="fa-brands fa-instagram"></i>
                </a>

                <!-- Facebook -->
                <a href="https://www.facebook.com/people/Aakhyaan-Foundation/61562046999019/"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="floating-icon facebook ring-effect"
                   title="https://www.facebook.com/people/Aakhyaan-Foundation/61562046999019/">
                    <i class="fa-brands fa-facebook-f"></i>
                </a>

                <!-- WhatsApp -->
                <a href="https://api.whatsapp.com/send?phone=918239707266"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="floating-icon whatsapp ring-effect"
                   title="918239707266">
                    <i class="fa-brands fa-whatsapp"></i>
                </a>

                <!-- Call -->
                <a href="tel:+918239707266"
                   class="floating-icon call ring-effect"
                   title="918239707266">
                    <i class="fa-solid fa-phone"></i>
                </a>

            </div>
        `;
    }

});