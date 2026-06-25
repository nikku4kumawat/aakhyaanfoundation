// ==================navbar section ====================
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

/* Open Menu */
menuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    overlay.classList.add("active");
});

/* Close Menu */
function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
}

closeBtn.addEventListener("click", closeMobileMenu);
overlay.addEventListener("click", closeMobileMenu);

/* Sticky Navbar */
window.addEventListener("scroll", () => {

    const navbar = document.getElementById("navbar");

    if (window.scrollY > 120) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }

});

/* Mobile Dropdown */
document.querySelectorAll(".mobile-dropdown .mobile-link").forEach(link => {

    link.addEventListener("click", function(e) {

        e.preventDefault();

        const parent = this.parentElement;
        const submenu = parent.querySelector(":scope > .mobile-submenu");
        const icon = this.querySelector(".mobile-toggle");

        if (!submenu) return;

        submenu.classList.toggle("active");

        if (icon) {
            icon.textContent =
                submenu.classList.contains("active")
                ? "−"
                : "+";
        }

    });

});


