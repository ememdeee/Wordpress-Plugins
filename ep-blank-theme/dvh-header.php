<style>
    /* Header CSS styles here */
    * {
        box-sizing: border-box;
    }
    #header nav {
        position: relative;
        z-index: 2;
        width: 100%;
        background: #ffffff;
    }

    #header .wrapper {
        max-width: 1160px;
        padding: 5px 20px;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #header .logo img {
        width: 120px;
        height: auto;
    }

    #header .nav-links {
        display: flex;
        gap: 5px;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    #header .nav-links li {
        position: relative;
    }

    #header .nav-links a, #header .multi-button a {
        color: #000000;
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;
        padding: 10px 12px;
        display: block;
        background-color: white;
        border-radius: 4px;
        transition: background-color 0.3s, color 0.3s;
    }

    #header .nav-links a.tools{
        display: flex;
        gap: 5px;
    }

    #header .nav-links a:hover:not(.tools), #header .multi-button a:hover {
        color: white;
        background-color: #1D4ED8;
    }

    #header .mega-box {
        position: absolute;
        top: 100%;
        left: 0;
        width: 200px;
        background-color: #ffffff;
        box-shadow: 0 6px 10px rgba(0,0,0,0.15);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
    }

    #header .nav-links li:hover .mega-box {
        opacity: 1;
        visibility: visible;
    }

    #header .mega-links {
        list-style: none;
        padding: 0;
    }

    #header .mega-links li a {
        padding: 10px 15px;
        font-size: 14px;
        border-bottom: 1px solid #f0f0f0;
    }

    #header .multi-button {
        display: flex;
        gap: 5px;
    }

    #header .menu-icon, #header .close-icon {
        display: none;
        font-size: 24px;
        cursor: pointer;
    }

    #header #menu-toggle {
        display: none;
    }

    #header .mobile-login{
        display: none;
    }

    @media screen and (max-width: 970px) {
        #header .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            height: 100vh;
            width: 100%;
            max-width: 350px;
            background: #ffffff;
            flex-direction: column;
            padding: 50px 10px;
            overflow-y: auto;
            box-shadow: -5px 0 15px rgba(0,0,0,0.1);
            transition: right 0.3s ease;
        }

        #menu-toggle:checked ~ .nav-links {
            right: 0;
        }

        #header .menu-icon {
            display: block;
        }

        #header .close-icon {
            display: block;
            position: absolute;
            top: 20px;
            right: 20px;
        }

        #header .mega-box {
            position: static;
            width: 100%;
            opacity: 1;
            visibility: visible;
            box-shadow: none;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        #header .nav-links li:hover .mega-box {
            max-height: 1000px;
        }

        #header .multi-button {
            display: none;
        }

        #header .mobile-login {
            display: block;
        }
    }
</style>
<nav>
    <div class="wrapper">
        <div class="logo">
            <a href="https://detailedvehiclehistory.com/">
                <img src="https://detailedvehiclehistory.com/wp-content/uploads/sites/3/2023/10/logo.png" alt="Detailed Vehicle History Logo" width="120" height="62">
            </a>
        </div>
        <input type="checkbox" id="menu-toggle">
        <label for="menu-toggle" class="menu-icon"><img width="23px" height="23px" src="https://detailedvehiclehistory.com/wp-content/uploads/sites/3/2024/10/solid-bars.svg" alt="bars"></label>
        <ul class="nav-links">
            <li><a href="https://detailedvehiclehistory.com/sample">Sample Reports</a></li>
            <li><a href="https://detailedvehiclehistory.com/vin-decoder">VIN Decoder</a></li>
            <li><a href="https://detailedvehiclehistory.com/window-sticker">Window Sticker</a></li>
            <li><a href="https://detailedvehiclehistory.com/dealers">For Dealers</a></li>
            <li>
                <a href="#" class="desktop-item tools">Our Tools <img width="15px" height="15px" src="https://detailedvehiclehistory.com/wp-content/uploads/sites/3/2024/10/solid-chevron-down.svg" alt="drop-down"></a>
                <div class="mega-box">
                    <ul class="mega-links">
                        <li><a href="https://detailedvehiclehistory.com/license-plate-lookup">License Plate Lookup</a></li>
                        <li><a href="https://detailedvehiclehistory.com/classic-window-stickers">Classic Car Window Sticker</a></li>
                        <li><a href="https://detailedvehiclehistory.com/classic-vin-decoder">Classic Car VIN Decoder</a></li>
                        <li><a href="https://detailedvehiclehistory.com/motorcycle-vin-check">Motorcycle VIN Decoder</a></li>
                        <li><a href="https://detailedvehiclehistory.com/vehicle-recalls">Vehicle Recall Check</a></li>
                        <li><a href="https://detailedvehiclehistory.com/rv-vin-lookup">RV VIN Lookup</a></li>
                        <li><a href="https://detailedvehiclehistory.com/lien-check">Lien Check</a></li>
                    </ul>
                </div>
            </li>
            <li class="mobile-login"><a href="https://detailedvehiclehistory.com/members/login">Login</a></li>
            <li class="mobile-login"><a href="https://detailedvehiclehistory.com/members/signup">Sign up</a></li>
            <label for="menu-toggle" class="close-icon"><img width="24px" height="24px" src="https://detailedvehiclehistory.com/wp-content/uploads/sites/3/2024/10/solid-xmark.svg" alt="close" ></label>
        </ul>
        <div class="multi-button">
            <a href="https://detailedvehiclehistory.com/members/login">Login</a>
            <a href="https://detailedvehiclehistory.com/members/signup">Sign up</a>
        </div>
    </div>
</nav>