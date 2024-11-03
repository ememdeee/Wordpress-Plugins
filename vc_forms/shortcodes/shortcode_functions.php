<?php

class vcShortcodes {

    public function __construct(){

        // $this->ocrBaseUrl = DECODETHISENGINE;

    }

    public function form($reportType){
        $return_html = '';
        $buttonText = ($reportType === 'vhr') ? 'Get Your Vehicle History Report' : 'Get Window Sticker';
        ob_start();
        ?>
        <section>
            <div class="search_vin_wrapper">
                <form id="form">
                    <div class="input_container_vin">
                        <input type="text" class="input_field vin_input" id="vinInput" placeholder="Enter Chassis Number" maxlength="17" oninput="toUpperCase(); syncValues(this, 'vin_input');">
                        <input type="email" id="emailInput" class="input_field email_input" name="emailInput" placeholder="Enter Email Address" oninput="syncValues(this, 'email_input');">
                        <input type="tel" minlength="8" maxlength="15" name="phoneInput" class="input_field phone_input" id="phoneInput" placeholder="Enter Phone Number (Optional)" oninput="this.value = this.value.replace(/[^0-9+()]/g, ''); syncValues(this, 'phone_input');" pattern=".{8,15}">
                    </div>
                    <div class="errorText_form errorText_vin" id="errorText_vin"></div>
                    <button type="button" class="form_submit_btn" onclick="formCollection('<?php echo $reportType; ?>')"><?php echo $buttonText; ?></button>
                </form>
            </div>
        </section>
        <?php
        $return_html = ob_get_contents();
        ob_end_clean();

        return $return_html;
    }

    public function pricing(){ //$atts
        $return_html = '';
        ob_start();
        ?>
        <script>
            // Function to show the popup
            function showPopup(codes) {
                // Get references to DOM elements
                var popup = document.getElementById('popup');
                var overlay = document.getElementById('overlay');
                popup.style.display = 'flex';
                overlay.style.display = 'block';
                currentCodes = codes;
                console.log(currentCodes);

                // give onclick
                const button = document.getElementById('pricingSubmit');
                button.removeAttribute('onclick');
                button.setAttribute("onclick", `creditCollection('${currentCodes}')`);
            }

            // Function to hide the popup
            function hidePopup() {
                var popup = document.getElementById('popup');
                var overlay = document.getElementById('overlay');
                popup.style.display = 'none';
                overlay.style.display = 'none';
            }
        </script>
        <!-- Button to trigger the popup: <button id="popupButton" onclick="showPopup('WSL1')">Show Popup</button> -->

        <!-- Popup content -->
        <div id="popup" class="popup">
            <label for="email_field">Email:</label>
            <input type="email" id="email_field" class="input email_field" name="email_field" placeholder="Enter Your Email" aria-errormessage="email_field_error" required>
            <span class="errorText_pricing" id="errorText_pricing"></span>
            <button class="form_button" id="pricingSubmit" aria-label="Proceed to Checkout">Proceed to Checkout</button>
            <button id="closeButton" onclick="hidePopup()">X</button>
        </div>

        <!-- Overlay -->
        <div id="overlay" class="overlay" onclick="hidePopup()"></div>
        <style>
            /* Styling for the popup */
            .popup {
                display: none;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: white;
                padding: 20px;
                border: 2px solid black;
                border-radius: 5px;
                z-index: 1000;
            }
            /* Styling for the overlay */
            .overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 999;
            }
        </style>
        <?php
        $return_html = ob_get_contents();
        ob_end_clean();

        return $return_html;
    }
}

/**
 * Get VIN Form
 */
function getVinForm(){
    $initOCRObj = new vcShortcodes;
    return $initOCRObj->form('vhr');
}
add_shortcode('vin_form', 'getVinForm');

/**
 * Get WS OCR Form
 */
function getWsForm(){
    $initOCRObj = new vcShortcodes;
    return $initOCRObj->form('ws');
}
add_shortcode('ws_form', 'getWsForm');

/**
 * Get Pricing Form
 */
function getPricingForm(){
    $initOCRObj = new vcShortcodes;
    return $initOCRObj->pricing();
}
add_shortcode('pricing_form', 'getPricingForm');