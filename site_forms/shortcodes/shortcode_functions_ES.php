<?php

class siteShortcodes {

    public function __construct(){

        // $this->ocrBaseUrl = DECODETHISENGINE;

    }

    public function form($reportType, $vin, $lp, $ymm, $initial, $color, $vintxt, $lptxt, $ymmtxt){
        $return_html = '';
        $buttonText = ($reportType === 'vhr') ? 'Buscar' : 'Buscar';
        if (!empty($vintxt)) {
            $buttonText = $vintxt; // Override the default button text if $button is not empty
        }
        $buttonFunction = ($initial == 0) ? $reportType : (($initial == 1) ? $reportType . '_plate' : (($initial == 3) ? "_ymm" : ""));
        ob_start();
        ?>
        <section class="<?php echo !empty($color) ? 'style1' : 'default'; ?>">
            <div class="search_vin_wrapper">
                <div class="search_by_wrapper" role="tablist">
                    <button class="search_by-toogle search_by_vin <?php if ($initial == '0') echo "search_by_toggle_active"; ?>" onclick="searchByVinClicked('<?php echo $reportType; ?>')" role="tab">Por VIN</button>
                    <button class="search_by-toogle search_by_plate <?php if ($initial == '1') echo "search_by_toggle_active"; ?>" onclick="searchByPlateClicked('<?php echo $reportType; ?>')" role="tab">Por Matrícula de USA</button>
                    <!-- ymm only for WS -->
                    <?php if ($reportType === 'ws' && $ymm == '1') : ?>
                    <button class="search_by-toogle search_by_ymm <?php if ($initial == '2') echo "search_by_toggle_active"; ?>" onclick="searchByYmmClicked('<?php echo $reportType; ?>')" role="tab"><span class="desktop">Año | Marca | Modelo</span><span class="mobile">AMM</span></button>
                    <?php endif; ?>
                </div>
                <form id="vinForm">
                    <div class="input_container input_container_vin <?php if ($initial == '0') echo "input_container_active"; ?>">
                        <input type="text" class="input_field vin_input" id="vinInput" placeholder="Ingresar VIN" maxlength="17" oninput="toUpperCase(this); syncValues(this, 'vin_input');">
                        <input type="email" class="input_field email_input" id="emailInput" name="emailInput" placeholder="Ingresar Correo Electrónico" oninput="syncValues(this, 'email_input');">
                        <input type="tel" minlength="8" maxlength="15" name="phoneInput" class="input_field phone_input" id="phoneInput" placeholder="Ingresar Teléfono" oninput="this.value = this.value.replace(/[^0-9+()]/g, ''); syncValues(this, 'phone_input');" pattern=".{8,15}">
                        <div class="errorText_form errorText_vin" id="errorText_vin"></div>
                    </div>
                    <div class="input_container input_container_plate <?php if ($initial == '1') echo "input_container_active"; ?>">
                        <input type="email" class="input_field email_input" id="emailInput" name="emailInput" placeholder="Ingresar Correo Electrónico" oninput="syncValues(this, 'email_input');">
                        <input type="tel" minlength="8" maxlength="15" name="phoneInput" class="input_field phone_input" id="phoneInput" placeholder="Ingresar Teléfono" oninput="this.value = this.value.replace(/[^0-9+()]/g, ''); syncValues(this, 'phone_input');" pattern=".{8,15}">
                        <input type="text" class="input_field plate_input lp_input" id="plateInput" placeholder="Enter Plate" maxlength="10" oninput="toUpperCase(this); syncValues(this, 'plate_input');">
                        <select class="input_field select_state lp_input" id="stateList" required="" onchange="syncValues(this, 'select_state');" onclick="listStateData()">
                            <option selected="" disabled="" value="">Seleccionar Estado</option>
                        </select>
                        <div class="errorText_form errorText_plate" id="errorText_plate"></div>
                    </div>
                    <div class="input_container input_container_ymm <?php if ($initial == '2') echo "input_container_active"; ?>">
                        <input type="email" class="input_field email_input" id="emailInput" name="emailInput" placeholder="Ingresar Correo Electrónico" oninput="syncValues(this, 'email_input');">
                        <input type="tel" minlength="8" maxlength="15" name="phoneInput" class="input_field phone_input" id="phoneInput" placeholder="Ingresar Teléfono" oninput="this.value = this.value.replace(/[^0-9+()]/g, ''); syncValues(this, 'phone_input');" pattern=".{8,15}">
                        <select class="input_field year_select ymm_field" id="yearList" onclick="clearErrorText();" onchange="resetDropdown('makeList'); syncValues(this, 'year_select');">
                            <!-- onclick="getYearDropdown(); clearErrorText();" <option value="" disabled selected='selected'>Year</option> -->
                            <!-- <option value="Cargando..." disabled>Cargando...</option> -->
                            <option value="1999" selected='selected'>1999</option><option value="2000">2000</option><option value="2001">2001</option><option value="2002">2002</option><option value="2003">2003</option><option value="2004">2004</option><option value="2005">2005</option><option value="2006">2006</option><option value="2007">2007</option><option value="2008">2008</option><option value="2009">2009</option><option value="2010">2010</option><option value="2011">2011</option><option value="2012">2012</option><option value="2013">2013</option><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option><option value="2024">2024</option><option value="2025">2025</option>
                        </select>
                        <select class="input_field make_select ymm_field" id="makeList" onclick="getMakeDropdown(); clearErrorText();" onchange="resetDropdown('modelList'); syncValues(this, 'make_select');">
                            <option value="" disabled selected='selected'>Marca</option>
                            <option value="Cargando..." disabled>Cargando...</option>
                        </select>
                        <select class="input_field model_select ymm_field" id="modelList" onclick="getModelDropdown(); clearErrorText();" onchange="syncValues(this, 'model_select');">
                            <option value="" disabled selected='selected'>Modelo</option>
                            <option value="Cargando..." disabled>Cargando...</option>
                        </select>
                        <div class="errorText_form errorText_ymm" id="errorText_ymm"></div>
                    </div>
                    <button aria-label="<?php echo $buttonText; ?>" <?php if (!empty($vintxt)) echo 'vin-text="' . $vintxt . '" '; ?> <?php if (!empty($lptxt)) echo 'lp-text="' . $lptxt . '" '; ?> <?php if (!empty($ymmtxt)) echo 'ymm-text="' . $ymmtxt . '" '; ?> type="button" class="form_submit_btn" onclick="formCollection('<?php echo $buttonFunction; ?>')"><?php echo $buttonText; ?></button>
                </form>
            </div>
        </section>
        <style>
            .lpOnly .input_container, .lpOnly .search_by_wrapper, .search_by_ymm .mobile{
                display: none !important;
            }
            .lpOnly .input_container.input_container_plate{
                display: flex !important;
            }
            @media screen and (max-width: 768px){
                .search_by_ymm .desktop{
                    display: none !important;
                }
                .search_by_ymm .mobile{
                    display: inherit !important;
                }
            }
        </style>
        <?php
        // Conditionally include the style based on the value of $color
        if (!empty($color)) {
            echo '<style>
                    form#vinForm{
                        display: block;
                    }
                    .input_field{
                        width: 100%;
                        height: calc(1.9em + 0.75rem + 2px);
                        border: 1px solid #F0F0F0 !important;
                        padding: .375rem .75rem;
                        font-size: 1rem;
                        font-weight: 400;
                        line-height: 1.5;
                        color: #495057;
                        background-color: #fff;
                        border-radius: .25rem;
                        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                    }
                    
                    .input_field:focus {
                        color: #495057;
                        background-color: #fff;
                        outline: 0;
                        box-shadow: 0 0 0 .2rem rgba(0,123,255,.25)
                    }
                    .search_by_wrapper{
                        display: flex;
                        gap: 5px;
                        flex-wrap: wrap;
                    }
                    .search_by-toogle{
                        background-color: #E5E5E5 !important;
                        padding: 10px 15px !important;
                        position: relative !important;
                        color: #333333 !important;
                        border: none !important;
                        font-size: 16px !important;
                        font-weight: 600 !important;
                        border-radius: 7px !important;
                        outline: none !important;
                        cursor: pointer !important;
                    }
                    .search_by_toggle_active{
                        background-color: '. htmlspecialchars($color, ENT_QUOTES, 'UTF-8') .' !important;
                        color: #fff !important;
                    }
                    .search_by_toggle_active:after {
                        width: 0;
                        height: 0;
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-top: 10px solid '. htmlspecialchars($color, ENT_QUOTES, 'UTF-8') .' ;
                        content: " ";
                        position: absolute;
                        bottom: -6px;
                        left: 15px;
                    }
                    .form_submit_btn{
                        color: #fff !important;
                        background-color: '. htmlspecialchars($color, ENT_QUOTES, 'UTF-8') .' !important;
                        border-color: '. htmlspecialchars($color, ENT_QUOTES, 'UTF-8') .' !important;
                        padding: 10px 24px !important;
                        width: -webkit-fill-available;
                        border-radius: 5px !important;
                        font-weight: 400 !important;
                        font-size: 1rem !important;
                        line-height: 1.5 !important;
                        transition: all 0.15s ease-in-out !important;
                        outline: none !important;
                    }
                    
                    .form_submit_btn:hover{
                        background: #2A4D69 !important;
                    }
                    .input_container{
                        margin-top: 8px;
                        margin-bottom: 10px;
                        display: none;
                        flex-wrap: wrap;
                        gap: 5px;
                        padding-bottom: 8px;
                        padding-top: 8px;
                        justify-content: center;
                    }
                    .input_container > *:nth-child(3):nth-last-child(2){
                        grid-column: span 2;
                    }
                    .input_container_active{
                        display: flex !important;
                    }
                    .input_container_plate .input_field, .input_container_ymm .email_input, .input_container_ymm .phone_input, .input_container_vin .input_field{
                        width: calc(50% - 2.5px);
                    }
                    .input_container_vin .input_field.vin_input{
                        width: 100%;
                    }
                    .errorText_form{
                        color: red;
                        font-weight: 500;
                        font-size: 13px;
                        margin-top: -4px;
                        height: 0;
                        width: 100%;
                        transition: all 0.3s ease-out;
                        line-height: 1.5;
                    }
                    .error_field {
                        border: 1px solid #FF0000 !important;
                    }
                    @media screen and (max-width: 425px){
                        .search_by-toogle{
                            padding: 10px 8px !important;
                            font-size: 15px !important;
                        }
                    }
                </style>';
        }
        // End buffering and return the content
        $return_html = ob_get_contents();
        ob_end_clean();

        return $return_html;
    }

    public function pricing(){ 
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
            <label for="email_field">Correo Electrónico:</label>
            <input type="email" id="email_field" class="input_field email_field" name="email_field" placeholder="Ingresar correo electrónico" aria-errormessage="email_field_error" required>
            <span class="errorText_form errorText_pricing" id="errorText_pricing"></span>
            <button class="form_submit_btn" id="pricingSubmit" aria-label="Procesar Pago">Procesar Pago</button>
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

    public function loading(){ 
        $return_html = '';
        ob_start();
        ?>
        <div class="loading-overlay" id="loadingOverlay">
            <div class="loading-spinner"></div>
            <p>Cargando...</p>
        </div>
        <style>
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgb(255 255 255);
                z-index: 1000;
                gap: 20px;
            }
            
            .loading-spinner {
                border: 8px solid #f3f3f3;
                border-top: 8px solid #3498db;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .content {
                padding: 20px;
            }
        </style>
        <?php
        $return_html = ob_get_contents();
        ob_end_clean();

        return $return_html;
    }

    public function banner(){ 
        $return_html = '';
        ob_start();
        ?>
        <div class="info_banner" id="infoBanner">    
            <span class="close" onclick="hideBanner()" aria-hidden="true">×</span>
            <div class="text-center">
                <p>
                    <i class="fa fa-gift banner_icon" aria-hidden="true"></i> 
                    <span class="banner_text" id="bannerText">Ud. ha recibido un DESCUENTO!</span>
                </p>
            </div>
        </div>
        <style>
            #infoBanner{
                padding: 18px 5px;
                background-color: rgb(209, 236, 241);
                color: rgb(12, 84, 96);
                border-color: rgb(190, 229, 235);
                z-index: 1;
                width: 100%;
                text-align: center;
                position: relative;
                transition: opacity 0.4s ease-in-out 0s;
                overflow: hidden;
                pointer-events: none;
                opacity: 0;
                height: 0;
                padding: 0; /*  will set from showBanner js */
            }
            #infoBanner .close{
                font-size: 36px !important;
                font-weight: 400 !important;
                text-shadow: 0 1px 0 #000 !important;
                color: #000 !important;
                opacity: .5 !important;
                cursor: pointer;
                height: auto;
                line-height: .8 !important;
                position: absolute;
                right: 19px;
                top: 50%;
                transform: translateY(-50%);
            }
            #infoBanner p{
                text-align: center;
                margin: 0;
                font-weight: 400;
                font-size: 17px;
            }
            @media (max-width: 768px){
                #infoBanner{
                    padding-right: 20px !important;
                }
                #infoBanner p{
                    font-size: 15px;
                }
                #infoBanner .close{
                    right: 5px;
                }
            }
        </style>
        <?php
        $return_html = ob_get_contents();
        ob_end_clean();

        return $return_html;
    }

    public function pricingData($color) {
        global $site_forms_pricing_data; //the value is a string "{"status":"success","plans":{"CODE1":{"price":15,"nos":"1","name":"Dummy","currency_code":"USD"},"CODE2":{"price":25,"nos":"25","name":"Dummy","currency_code":"USD"},"CODE5":{"price":55,"nos":"5","name":"Dummy","currency_code":"USD"}}}"
        
        $pricing_data = json_decode($site_forms_pricing_data, true);

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
        <style>
            .pricingSection{
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 10px;
            }
            .pricingContainer{
                display: flex;
                flex-direction: column;
                gap: 10px;
                width: 30%;
            }
            .feature{
                display: flex;
                flex-direction: column;
            }
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
            @media only screen and (max-width: 600px) {
                .pricingSection{
                    flex-direction: column;
                }
                .pricingContainer{
                    width: 100%;
                }
            }
            <?php
            if (!empty($color)) {
                echo '
            .jsonPricing, .code{
                display: none;
            }
            .pricingSection{
                row-gap: 20px !important;
            }
            .pricingContainer{
                background: #f7f7f7;
                border-radius: 10px 10px 10px 10px;
                overflow: hidden;
                box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
            }
            .price_currency {
                background: '. htmlspecialchars($color, ENT_QUOTES, 'UTF-8') .';
                color: white;
                font-weight: bold;
                display: flex;
                justify-content: center;
                padding: 18px 0px;
                font-size: 32px;
            }
            .feature span {
                color: black;
                border-bottom: 1px dotted #ccc;
                font-weight: 600;
                padding: 10px 12px;
                text-align: center;
            }
            .pricingButton{
                text-align: center;
                padding-bottom: 20px;
            }
            .popupButton{
                background: #5d717e;
                color: white;
                border: none;
                outline: none;
                padding: 8px 20px;
                font-size: 16px;
                transition: 0.3s;
                cursor: pointer;
            }
            .popupButton:hover{
                background: #485b67;
            }
            .input_field {
                width: 100%;
                height: calc(1.9em + 0.75rem + 2px);
                border: 1px solid #F0F0F0 !important;
                padding: .375rem .75rem;
                font-size: 1rem;
                font-weight: 400;
                line-height: 1.5;
                color: #495057;
                background-color: #fff;
                border-radius: .25rem;
                transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                opacity: 1;
            }
            .popup{
                flex-direction: column;
                gap: 10px;
                width: calc(100% - 20px);
                max-width: 720px;
                font-weight: 500;
            }
            .popup label{
                margin: 0;
            }
            .popup #closeButton{
                position: absolute;
                right: 20px;
                top: 15px;
                background: white;
                border-width: 1px;
                border-radius: 4px;
            }
            .form_submit_btn{
                color: #fff !important;
                background-color: '. htmlspecialchars($color, ENT_QUOTES, 'UTF-8') .' !important;
                border-color: '. htmlspecialchars($color, ENT_QUOTES, 'UTF-8') .' !important;
                padding: 10px 24px !important;
                width: -webkit-fill-available;
                border-radius: 5px !important;
                font-weight: 400 !important;
                font-size: 1rem !important;
                line-height: 1.5 !important;
                transition: all 0.15s ease-in-out !important;
                outline: none !important;
                margin-top: 10px;
            }
            .form_submit_btn:hover{
                background: #2A4D69 !important;
            }
            .errorText_form{
                color: red;
                font-weight: 500;
                font-size: 13px;
                margin-top: -10px;
                height: 0;
                width: 100%;
                transition: all 0.3s ease-out;
                line-height: 1.5;
            }
            .error_field {
                border: 1px solid #FF0000 !important;
            }';
            }
            ?>
        </style>
        <!-- Pricing List -->
        <p class="jsonPricing">Json: <?php echo $site_forms_pricing_data; ?></p>
        <div class="pricingSection">
        <?php foreach ($pricing_data['plans'] as $code => $data) {
            // Prepare the currency symbol
            if ($data['currency_code'] == 'USD') {
                $currency_symbol = "$";
            } elseif ($data['currency_code'] == 'EUR') {
                $currency_symbol = "€";
            } else {
                $currency_symbol = $data['currency_code'];
            }
            ?>
            <div class="pricingContainer">
                <div class="price_currency">
                    <div class="currency" aria-label="<?php echo $currency_symbol; ?>"><?php echo $currency_symbol; ?></div>
                    <div class="price" aria-label="<?php echo $data['price']; ?>"><?php echo $data['price']; ?></div>
                </div>
                <div class="feature">
                    <span><?php echo $data['name']; ?></span>
                    <span><?php echo $data['nos']; ?> Reporte Premium</span>
                    <span>Nunca Expira</span>
                    <span class="code">Code <?php echo $code; ?></span>
                </div>
                <div class="pricingButton">
                    <button class="popupButton" onclick="showPopup('<?php echo $code; ?>')">Obtenga su reporte</button>
                </div>
            </div>
        <?php } ?>
        </div>

        <!-- POPUP -->
        <!-- Button to trigger the popup: <button id="popupButton" onclick="showPopup('WSL1')">Show Popup</button> -->
        <div id="popup" class="popup">
            <label for="email_field">Correo Electrónico:</label>
            <input type="email" id="email_field" class="input_field email_field" name="email_field" placeholder="Ingresar su Correo Electrónico" aria-errormessage="email_field_error" required>
            <span class="errorText_form errorText_pricing" id="errorText_pricing"></span>
            <button class="form_submit_btn" id="pricingSubmit" aria-label="Procesar pago">Procesar pago</button>
            <button id="closeButton" onclick="hidePopup()">X</button>
        </div>
        <!-- Overlay -->
        <div id="overlay" class="overlay" onclick="hidePopup()"></div>
        <?php
        $return_html = ob_get_clean();

        return $return_html;
    }
}

/**
 * Get VIN Form
 */
function getVinForm(){
    $initOCRObj = new siteShortcodes;
    $atts = shortcode_atts(array(
        'type' => 'vhr',  // default value
        'vin' => '1', 
        'lp' => '1',
        'ymm' => '0',
        'initial' => '0', //Show Initial Vin/LP/YMM (0/1/2)
        'color' => '',
        'vintxt' => '',
        'lptxt' => '',
        'ymmtxt' => ''
    ), $atts);
    return $initOCRObj->form($atts['type'], $atts['vin'], $atts['lp'], $atts['ymm'], $atts['initial'], $atts['color'], $atts['vintxt'], $atts['lptxt'], $atts['ymmtxt']);

}
add_shortcode('vin_form', 'getVinForm');

/**
 * Get WS OCR Form
 */
function getWsForm(){
    $initOCRObj = new siteShortcodes;
    $atts = shortcode_atts(array(
        'type' => 'ws',  // default value
        'vin' => '1', 
        'lp' => '1',
        'ymm' => '0',
        'initial' => '0', //Show Initial Vin/LP/YMM (0/1/2)
        'color' => '',
        'vintxt' => '',
        'lptxt' => '',
        'ymmtxt' => ''

    ), $atts);
    return $initOCRObj->form($atts['type'], $atts['vin'], $atts['lp'], $atts['ymm'], $atts['initial'], $atts['color'], $atts['vintxt'], $atts['lptxt'], $atts['ymmtxt']);
}
add_shortcode('ws_form', 'getWsForm');

/**
 * Get VHR/WS  Form
 */
function getForm($atts) {
    $initOCRObj = new siteShortcodes();
    
    $atts = shortcode_atts(array(
        'type' => 'vhr', // Report Type (vhr/ws)
        'vin' => '1',  //Show VIN (0/1)
        'lp' => '1', //Show LP (0/1)
        'ymm' => '0', //Show YMM (0/1)
        'initial' => '0', //Show Initial Vin/LP/YMM (0/1/2)
        'color' => '', //Theme Color (#0000)
        'vintxt' => '', //VIN Button Text ("Vin Search")
        'lptxt' => '', //License Plate Lookup Button Text ("LP Search")
        'ymmtxt' => '' //Year Make Model Button Text ("YMM Search") *Required if lptxt set
    ), $atts);
    
    return $initOCRObj->form($atts['type'], $atts['vin'], $atts['lp'], $atts['ymm'], $atts['initial'], $atts['color'], $atts['vintxt'], $atts['lptxt'], $atts['ymmtxt']);
}
add_shortcode('site_form', 'getForm');

/**
 * Get Pricing Form
 */
function getPricingForm(){
    $initOCRObj = new siteShortcodes;
    return $initOCRObj->pricing();
}
add_shortcode('pricing_form', 'getPricingForm');

/**
 * Get Loading Screen
 */
function getLoadingScreen(){
    $initOCRObj = new siteShortcodes;
    return $initOCRObj->loading();
}
add_shortcode('loading_screen', 'getLoadingScreen');

/**
 * Get Banner
 */
function getBanner(){
    $initOCRObj = new siteShortcodes;
    return $initOCRObj->banner();
}
add_shortcode('banner', 'getBanner');

/**
 * Get Price
 */
function getPrice($atts){
    $initOCRObj = new siteShortcodes;

    $atts = shortcode_atts(array(
        'color' => ''  // default value
    ), $atts);

    return $initOCRObj->pricingData($atts['color']);
}
add_shortcode('pricingData', 'getPrice');