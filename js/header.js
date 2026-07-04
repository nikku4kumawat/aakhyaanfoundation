const header = document.getElementById("header");

header.innerHTML = `

<!-- =========================
        TOP HEADER START
========================= -->

<div class="top-header">

    <div class="container">

        <!-- Left Side -->
        <div class="top-left">

            <a href="https://maps.app.goo.gl/7zK1nSQX6dZKrBKd9" target="_blank">
                <i class="fas fa-location-dot"></i>
                JHOTWARA JAIPUR
            </a>

            <a href="tel:+919001123836">
                <i class="fas fa-phone"></i>
                +91 9001123836
            </a>

            <a href="mailto:connect@aakhyaanfoundation.org">
                <i class="fas fa-envelope"></i>
                connect@aakhyaanfoundation.org
            </a>

        </div>

        <!-- Right Side -->
        <div class="top-right">

            <a href="https://www.facebook.com/people/Aakhyaan-Foundation/61562046999019/" target="_blank">
                <i class="fab fa-facebook-f"></i>
            </a>

            <a href="https://www.instagram.com/aakhyanfoundation/" target="_blank">
                <i class="fab fa-instagram"></i>
            </a>


             <!-- WhatsApp -->
                <a href="https://api.whatsapp.com/send?phone=919001123836"
                   target="_blank"
                    <i class="fa-brands fa-whatsapp"></i>
                </a>

                <!-- Call -->
                <a href="tel:+919001123836" target="_blank">
                   <i class="fa-solid fa-phone"></i>
                </a>

            <a href="https://www.linkedin.com/company/aakhyaan-foundation/" target="_blank">
                <i class="fab fa-linkedin-in"></i>
            </a>



        </div>

    </div>

</div>
`;



header.innerHTML += `

<!-- =========================
        NAVBAR START
========================= -->

<header class="navbar-area" id="navbar">

    <div class="container nav-container">

        <!-- Logo -->
        <div class="logo">

            <a href="#">
                <img src="img/af-logo.gif" alt="logo">
            </a>

        </div>

        <!-- Navigation -->
        <nav class="nav-menu" id="navMenu">

            <ul>

                <!-- HOME -->
                <li>
                    <a href="index.html">HOME</a>
                </li>

                <!-- ABOUT US -->
                <li class="dropdown">

                    <a href="#">
                        ABOUT US
                        <i class="fa-solid fa-angle-down"></i>
                    </a>

                    <ul class="submenu">

                        <li><a href="overview.html">OVERVIEW</a></li>
                        <li><a href="mission.html">MISSION & VISION</a></li>
                        <li><a href="value.html">VALUES</a></li>
                        <li><a href="advisory.html">ADVISORY BOARD</a></li>
                        <li><a href="board.html">BOARD OF DIRECTORS</a></li>

                    </ul>

                </li>

                <!-- WHAT WE DO -->
                <li class="dropdown">

                    <a href="what-we-do.html">
                        WHAT WE DO
                        <i class="fa-solid fa-angle-down"></i>
                    </a>

                    <ul class="submenu">

                        <!-- HOW WE WORK -->
                        <li class="dropdown has-sub">

                            <a href="#">
                                HOW WE WORK
                                <i class="fa-solid fa-angle-right"></i>
                            </a>

                            <ul class="submenu-2">

                                <li>
                                    <a href="our-approach.html">
                                        OUR APPROACH
                                    </a>
                                </li>

                            </ul>

                        </li>

                        <!-- PROGRAMMES -->
                        <li class="dropdown has-sub">

                            <a href="#">
                                PROGRAMMES
                                <i class="fa-solid fa-angle-right"></i>
                            </a>

                            <ul class="submenu-2">

                                <li><a href="shiksha.html">SHIKSHA</a></li>
                                <li><a href="swasthya.html">SWASTHYA</a></li>
                                <li><a href="suraksha.html">SURAKSHA</a></li>
                                <li><a href="target-group.html">TARGET GROUP</a></li>
                                <li><a href="focus-area.html">FOCUS AREA</a></li>
                                <li><a href="internship.html">INTERNSHIP</a></li>

                            </ul>

                        </li>

                    </ul>

                </li>

                <!-- INFORMATION DESK -->
                <li class="dropdown">

                    <a href="#">
                        INFORMATION DESK
                        <i class="fa-solid fa-angle-down"></i>
                    </a>

                    <ul class="submenu">

                        <li><a href="upcomingevent.html">UPCOMING EVENTS</a></li>
                        <li><a href="report.html">REPORT</a></li>
                        <li><a href="audit.html">AUDIT</a></li>
                        <li><a href="policy.html">POLICIES</a></li>
                        <li><a href="donerlist.html">LIST OF DONORS</a></li>
                        <li><a href="https://aakhyaanfoundation.org/wp-content/uploads/2024/08/Guide-For-Employees.pdf" target="_blank">GUIDE FOR EMPLOYEES</a></li>
                        <li><a href="certifications.html">CERTIFICATIONS</a></li>

                    </ul>

                </li>

                <!-- RESOURCES -->
                <li class="dropdown">

                    <a href="#">
                        RESOURCES
                        <i class="fa-solid fa-angle-down"></i>
                    </a>

                    <ul class="submenu">

                        <li><a href="#">OUR TEAM</a></li>
                        <li><a href="partnership.html">PARTNERSHIP</a></li>
                        <li><a href="https://aakhyaanfoundation.org/wp-content/uploads/2025/03/Vision-Document.pdf"target="_blank">VISION DOCUMENT</a></li>
                        <li><a href="activity-calendar.html">ACTIVITY CALENDAR</a></li>
                        <li><a href="press-coverage.html">MEDIA COVERAGE</a></li>
                        <li><a href="blog.html">JOURNALING / NEWSLETTERS / BLOGS</a></li>
                        <li><a href="#">RESEARCH & EVIDENCE</a></li>
                        <li><a href="gallery.html">Gallery</a></li>

                    </ul>

                </li>

                <!-- CONTACT -->
                <li>
                    <a href="contact.html">CONTACT US</a>
                </li>

            </ul>

        </nav>

        <!-- Donate Button -->
        <div class="help-btn">

            <a href="donate.html">
                Donate Now
            </a>

        </div>

        <!-- Mobile Button -->

        <div class="mobile-btn" id="menuBtn">

            <i class="fas fa-bars"></i>

        </div>

    </div>

</header>

`;




header.innerHTML += `

<!-- =========================
      MOBILE NAVBAR START
========================= -->

<div class="mobile-menu" id="mobileMenu">

    <!-- Close Button -->
    <div class="close-btn" id="closeBtn">
        <i class="fas fa-times"></i>
    </div>

    <ul>

    
        <!-- HOME -->
        <li>
            <a href="/index.html">HOME</a>
        </li>

        <!-- ABOUT US -->
        <li class="mobile-dropdown">

            <div class="mobile-link">
                <a href="#">ABOUT US</a>
                <span class="mobile-toggle">+</span>
            </div>

            <ul class="mobile-submenu">

                <li><a href="overview.html">OVERVIEW</a></li>
                <li><a href="mission.html">MISSION & VISION</a></li>
                <li><a href="value.html">VALUES</a></li>
                <li><a href="advisory.html">ADVISORY BOARD</a></li>
                <li><a href="board.html">BOARD OF DIRECTORS</a></li>

            </ul>

        </li>

        <!-- WHAT WE DO -->
        <li class="mobile-dropdown">

            <div class="mobile-link">
                <a href="#">WHAT WE DO</a>
                <span class="mobile-toggle">+</span>
            </div>

            <ul class="mobile-submenu">

                <!-- HOW WE WORK -->
                <li class="mobile-dropdown">

                    <div class="mobile-link">
                        <a href="#">HOW WE WORK</a>
                        <span class="mobile-toggle">+</span>
                    </div>

                    <ul class="mobile-submenu">

                        <li>
                            <a href="our-approach.html">
                                OUR APPROACH
                            </a>
                        </li>

                    </ul>

                </li>

                <!-- PROGRAMMES -->
                <li class="mobile-dropdown">

                    <div class="mobile-link">
                        <a href="#">PROGRAMMES</a>
                        <span class="mobile-toggle">+</span>
                    </div>

                    <ul class="mobile-submenu">

                        <li><a href="shiksha.html">SHIKSHA</a></li>
                        <li><a href="swasthya.html">SWASTHYA</a></li>
                        <li><a href="suraksha.html">SURAKSHA</a></li>
                        <li><a href="target-group.html">TARGET GROUP</a></li>
                        <li><a href="focus-area.html">FOCUS AREA</a></li>
                        <li><a href="internship.html">INTERNSHIP</a></li>

                    </ul>

                </li>

            </ul>

        </li>

        <!-- INFORMATION DESK -->
        <li class="mobile-dropdown">

            <div class="mobile-link">
                <a href="#">INFORMATION DESK</a>
                <span class="mobile-toggle">+</span>
            </div>

            <ul class="mobile-submenu">

                <li><a href="upcomingevent.html">UPCOMING EVENTS</a></li>
                <li><a href="report.html">REPORT</a></li>
                <li><a href="audit.html">AUDIT</a></li>
                <li><a href="policy.html">POLICIES</a></li>
                <li><a href="donerlist.html">LIST OF DONORS</a></li>
                <li><a href="https://aakhyaanfoundation.org/wp-content/uploads/2024/08/Guide-For-Employees.pdf" target="_blank">GUIDE FOR EMPLOYEES</a></li>
                <li><a href="certifications.html">CERTIFICATIONS</a></li>

            </ul>

        </li>

        <!-- RESOURCES -->
        <li class="mobile-dropdown">

            <div class="mobile-link">
                <a href="#">RESOURCES</a>
                <span class="mobile-toggle">+</span>
            </div>

            <ul class="mobile-submenu">

                <li><a href="#">OUR TEAM</a></li>
                <li><a href="partnership.html">PARTNERSHIP</a></li>
                <li><a href="https://aakhyaanfoundation.org/wp-content/uploads/2025/03/Vision-Document.pdf"target="_blank">VISION DOCUMENT</a></li>
                <li><a href="activity-calendar.html">ACTIVITY CALENDAR</a></li>
                <li><a href="press-coverage.html">MEDIA COVERAGE</a></li>
                <li><a href="blog.html">JOURNALING / NEWSLETTERS / BLOGS</a></li>
                <li><a href="#">RESEARCH & EVIDENCE</a></li>
                <li><a href="gallery.html">Gallery</a></li>

            </ul>

        </li>

        <!-- CONTACT -->
        <li>
            <a href="contact.html">CONTACT US</a>
        </li>


        <!-- MOBILE DONATE BUTTON -->
        <li class="mobile-donate">
           <a href="donate.html">
               Donate Now
           </a>
       </li>

       
        <div class="mobile-contact-info">

            <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>connect@aakhyaanfoundation.org</span>
            </div>

            <div class="contact-item">
                <i class="fas fa-location-dot"></i>
                <span>Jhotwara Jaipur, Rajasthan</span>
            </div>

            <div class="contact-item">
                <i class="fas fa-phone"></i>
                <span>+91 8239707266</span>
            </div>

            <div class="mobile-social">

                <a href="#">
                    <i class="fab fa-facebook-f"></i>
                </a>

                <a href="#">
                    <i class="fab fa-instagram"></i>
                </a>

                <a href="#">
                    <i class="fab fa-linkedin-in"></i>
                </a>

                <a href="#">
                    <i class="fa-brands fa-whatsapp"></i>
                </a>

            </div>



        </div>

    </ul>

</div>

<div class="overlay" id="overlay"></div>

`;


