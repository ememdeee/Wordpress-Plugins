<nav class="nav-container">
    <div class="nav-content">
        <a href="https://classicdecoder.com" class="logo">
            <img width="136" height="46" src="https://classicdecoder.com/wp-content/uploads/2023/01/logo-svg.svg" alt="Classic Decoder">
        </a>
        <div class="nav-links">
            <a href="https://classicdecoder.com/">Home</a>
            <div class="dropdown">
                <a href="#">Products</a>
                <div class="dropdown-content">
                    <a href="https://classicdecoder.com/vin-decoder">VIN Decoder</a>
                    <a href="https://classicdecoder.com/build-sheet">Build Sheet</a>
                    <a href="https://classicdecoder.com/history-report">Vehicle History Report</a>
                </div>
            </div>
            <a href="https://classicdecoder.com/business">Business</a>
            <a href="https://classicdecoder.com/about-us">About Us</a>
            <a href="https://classicdecoder.com/contact-us">Contact Us</a>
            <a href="https://classicdecoder.com/blog">Blog</a>
        </div>
        <div class="login-signup logged-out">
            <a href="https://classicdecoder.com/vehicle/auth/login" class="member-area">Log In</a>
            <a href="https://classicdecoder.com/vehicle/auth/signup" class="member-area">Sign Up</a>
        </div>
        <a href="https://classicdecoder.com/vehicle/search" class="member-area logged-in">My Account</a>
        <div class="mobile-nav">
            <div class="login-signup logged-out">
                <button class="toggle-button" aria-label="Toggle login options">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M15 2.5C8.09625 2.5 2.5 8.09625 2.5 15C2.5 21.9037 8.09625 27.5 15 27.5C21.9037 27.5 27.5 21.9037 27.5 15C27.5 8.09625 21.9037 2.5 15 2.5Z" stroke="#DFC128" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.33887 22.9325C5.33887 22.9325 8.12512 19.375 15.0001 19.375C21.8751 19.375 24.6626 22.9325 24.6626 22.9325M15.0001 15C15.9947 15 16.9485 14.6049 17.6518 13.9017C18.355 13.1984 18.7501 12.2446 18.7501 11.25C18.7501 10.2554 18.355 9.30161 17.6518 8.59835C16.9485 7.89509 15.9947 7.5 15.0001 7.5C14.0056 7.5 13.0517 7.89509 12.3485 8.59835C11.6452 9.30161 11.2501 10.2554 11.2501 11.25C11.2501 12.2446 11.6452 13.1984 12.3485 13.9017C13.0517 14.6049 14.0056 15 15.0001 15V15Z" stroke="#DFC128" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </button>
                <div class="login-options">
                    <a href="https://classicdecoder.com/vehicle/auth/login" class="mobile-member">Log In</a>
                    <a href="https://classicdecoder.com/vehicle/auth/signup" class="mobile-member">Sign Up</a>
                </div>
            </div>
            <a href="https://classicdecoder.com/vehicle/search" class="mobile-member logged-in">My Account</a>
            <button class="hamburger" aria-label="Toggle menu">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>
            </button>
        </div>
    </div>
    <div class="mobile-menu">
        <a href="https://classicdecoder.com/">Home</a>
        <div class="dropdown">
            <a href="#">Products</a>
            <div class="dropdown-content">
                <a href="https://classicdecoder.com/vin-decoder">VIN Decoder</a>
                <a href="https://classicdecoder.com/build-sheet">Build Sheet</a>
                <a href="https://classicdecoder.com/history-report">Vehicle History Report</a>
            </div>
        </div>
        <a href="https://classicdecoder.com/business">Business</a>
        <a href="https://classicdecoder.com/about-us">About Us</a>
        <a href="https://classicdecoder.com/contact-us">Contact Us</a>
        <a href="https://classicdecoder.com/blog">Blog</a>
    </div>
</nav>

<style>
    /* Base styles */
    #header .nav-container {
        font-family: "Montserrat", Sans-serif;
        font-weight: 500;
        background-color: #000;
        color: #fff;
        padding: 1rem;
    }
    #header .nav-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }
    #header .logo{
        display: flex;
    }
    #header .logo img {
        height: 2.8rem;
    }
    #header .nav-links {
        display: flex;
        gap: 1rem;
    }
    #header .nav-links a {
        color: #fff;
        text-decoration: none;
        transition: color 0.3s ease;
    }
    #header .nav-links a:hover {
        color: #fbbf24;
    }
    #header .dropdown {
        position: relative;
    }
    #header .dropdown-content {
        display: none;
        position: absolute;
        background-color: #000;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 10;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
    }
    #header .dropdown:hover .dropdown-content {
        display: block;
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    #header .dropdown-content a {
        color: #fff;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        opacity: 0;
        transform: translateY(-5px);
        transition: opacity 0.2s ease, transform 0.2s ease, background-color 0.3s ease;
    }
    #header .dropdown:hover .dropdown-content a {
        opacity: 1;
        transform: translateY(0);
    }
    #header .dropdown:hover .dropdown-content a:nth-child(1) { transition-delay: 0.05s; }
    #header .dropdown:hover .dropdown-content a:nth-child(2) { transition-delay: 0.1s; }
    #header .dropdown:hover .dropdown-content a:nth-child(3) { transition-delay: 0.15s; }
    #header .dropdown-content a:hover {
        background-color: #333;
    }
    #header .member-area, #header .mobile-member {
        background-color: #fbbf24;
        color: #000;
        padding: 0.5rem 1rem;
        border-radius: 1.5rem;
        text-decoration: none;
        font-weight: bold;
        transition: background-color 0.4s ease;
    }
    #header .member-area:hover, #header .mobile-member:hover {
        background-color: #f59e0b;
    }
    #header .mobile-nav {
        display: none;
    }
    #header .hamburger {
        background: none;
        border: none;
        color: #fff;
        font-size: 1.5rem;
        cursor: pointer;
        height: 26px;
    }
    #header .hamburger svg{
        width: 20px;
    }
    #header .mobile-menu {
        display: none;
        background-color: #000;
        padding: 1rem;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    #header .mobile-menu a {
        color: #fff;
        text-decoration: none;
        display: block;
        padding: 0.5rem 0;
    }
    #header .mobile-menu .dropdown-content {
        position: static;
        background-color: #111;
        padding-left: 1rem;
    }
    #header .logged-in{
        display: none;
    }
    #header .login-signup{
        display: flex;
        gap: 10px;
    }
    #header .toggle-button {
        background: none !important;
        border: none;
        cursor: pointer;
        padding: 0;
        display: flex;
    }
    #header .login-options {
        display: none;
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        top: 100%;
        right: 0;
        background-color: #000;
        border: 1px solid #DFC128;
        border-radius: 4px;
        padding: 10px;
        box-shadow: 0 2px 5px rgba(223, 193, 40, 0.3);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
    }
    #header .login-options a {
        display: block;
        padding: 5px 10px;
        text-decoration: none;
        color: #fff;
        transition: background-color 0.3s, color 0.3s;
        opacity: 0;
        transform: translateY(-5px);
        transition: opacity 0.2s ease, transform 0.2s ease, background-color 0.3s ease;
    }
    #header .login-options a:hover {
        background-color: #DFC128;
        color: #000;
    }
    @media (hover: hover) {
        #header .login-signup:hover .login-options {
            display: flex;
        }
    }
    #header .login-options.show {
        display: flex;
        flex-direction: column;
        gap: 10px;
        text-align: center;
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    #header .login-options.show a {
        opacity: 1;
        transform: translateY(0);
    }

    #header .login-options.show a:nth-child(1) { transition-delay: 0.05s; }
    #header .login-options.show a:nth-child(2) { transition-delay: 0.1s; }

    /* Media query for mobile devices */
    @media (max-width: 768px) {
        #header .nav-links, .member-area {
            display: none;
        }
        #header .mobile-nav {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        #header .mobile-member {
            font-size: 0.875rem;
            padding: 0.375rem 0.75rem;
        }
    }
    @media (max-width: 425px) {
        #header .login-signup:last-child{
            display: none;
        }
    }
</style>

<script>
    // logged-in or logged-out user js
    const userSettings = localStorage.getItem('user_settings');

    if (userSettings) {
        console.log("User settings are available.");
        document.querySelectorAll('.logged-in').forEach(element => {
            element.style.setProperty('display', 'flex', 'important');
        });
        document.querySelectorAll('.logged-out').forEach(element => {
            element.style.setProperty('display', 'none', 'important');
        });
        // Proceed with your logic, such as parsing the data or filling the form
    } else {
        console.log("User settings are not available.");
        // Handle the case where user_settings is not present in localStorage
    }
    document.addEventListener('DOMContentLoaded', function() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const dropdowns = document.querySelectorAll('.mobile-menu .dropdown');

        hamburger.addEventListener('click', function() {
            if (mobileMenu.style.display === 'block') {
                mobileMenu.style.opacity = '0';
                mobileMenu.style.visibility = 'hidden';
                setTimeout(() => {
                    mobileMenu.style.display = 'none';
                }, 300);
            } else {
                mobileMenu.style.display = 'block';
                setTimeout(() => {
                    mobileMenu.style.opacity = '1';
                    mobileMenu.style.visibility = 'visible';
                }, 10);
            }
        });

        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                if (e.target.nextElementSibling.classList.contains('dropdown-content')) {
                    e.preventDefault();
                    const content = e.target.nextElementSibling;
                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                }
            });
        });

        const toggleButton = document.querySelector('.toggle-button');
        const loginOptions = document.querySelector('.login-options');

        toggleButton.addEventListener('click', function() {
            loginOptions.classList.toggle('show');
        });

        // Close the login options when clicking outside
        document.addEventListener('click', function(event) {
            if (!toggleButton.contains(event.target) && !loginOptions.contains(event.target)) {
                loginOptions.classList.remove('show');
            }
        });
    });
</script>