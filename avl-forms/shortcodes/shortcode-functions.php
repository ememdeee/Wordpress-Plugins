<?php

class avlShortcodes {

    public function __construct(){

        // $this->ocrBaseUrl = DECODETHISENGINE;

    }

    public function form($reportType){
        $return_html = '';
        ob_start();
        ?>
        <section>
            <div class="search_vin_wrapper">
                <div class="search_by_wrapper" role="tablist">
                    <button class="search_by-toogle search_by_vin search_by_toggle_active" onclick="searchByVinClicked('<?php echo $reportType; ?>')" role="tab">by VIN</button>
                    <button class="search_by-toogle search_by_plate" onclick="searchByPlateClicked('<?php echo $reportType; ?>')" role="tab">by US License Plate</button>
                </div>
                <form id="vinForm">
                    <div class="input_container input_container_vin input_container_active">
                        <input type="text" class="form-control" id="vinInput" placeholder="ENTER VIN" maxlength="17" oninput="updateIndicator(); toUpperCase()">
                        <span class="indicator" id="indicator">0 of 17</span>
                        <div class="errorText_form" id="errorText"></div>
                    </div>
                    <div class="input_container input_container_plate">
                        <input type="text" class="form-control plateInput" id="plateInput" placeholder="ENTER PLATE" maxlength="10" oninput="updateIndicator(); toUpperCase()">
                        <select class="select-state form-control" id="state-list" required="" onchange="updateColor()">
                            <option selected="" disabled="" value="">Select State</option>
                            <option value="AL">AL - Alabama</option>
                            <option value="AK">AK - Alaska</option>
                            <option value="AZ">AZ - Arizona</option>
                            <option value="AR">AR - Arkansas</option>
                            <option value="CA">CA - California</option>
                            <option value="CO">CO - Colorado</option>
                            <option value="CT">CT - Connecticut</option>
                            <option value="DE"> DE - Delaware</option>
                            <option value="DC">DC - Washington DC</option>
                            <option value="FL">FL - Florida</option>
                            <option value="GA">GA - Georgia</option>
                            <option value="HI">HI - Hawaii</option>
                            <option value="ID">ID - Idaho</option>
                            <option value="IL"> IL - Illinois</option>
                            <option value="IN">IN - Indiana</option>
                            <option value="IA"> IA - Iowa</option>
                            <option value="KS">KS - Kansas</option>
                            <option value="KY">KY - Kentucky</option>
                            <option value="LA">LA - Louisiana</option>
                            <option value="ME">ME - Maine</option>
                            <option value="MD">MD - Maryland</option>
                            <option value="MA">MA - Massachusetts</option>
                            <option value="MI">MI - Michigan</option>
                            <option value="MN">MN - Minnesota</option>
                            <option value="MS">MS - Mississippi</option>
                            <option value="MO">MO - Missouri</option>
                            <option value="MT">MT - Montana</option>
                            <option value="NE">NE - Nebraska</option>
                            <option value="NV">NV - Nevada</option>
                            <option value="NH"> NH - New Hampshire</option>
                            <option value="NJ">NJ - New Jersey</option>
                            <option value="NM">NM - New Mexico</option>
                            <option value="NY">NY - New York</option>
                            <option value="NC">NC - North Carolina</option>
                            <option value="ND">ND - North Dakota</option>
                            <option value="OH">OH - Ohio</option>
                            <option value="OK">OK - Oklahoma</option>
                            <option value="OR">OR - Oregon</option>
                            <option value="PA">PA - Pennsylvania</option>
                            <option value="RI">RI - Rhode Island</option>
                            <option value="SC">SC - South Carolina</option>
                            <option value="SD">SD - South Dakota</option>
                            <option value="TN">TN - Tennessee</option>
                            <option value="TX">TX - Texas</option>
                            <option value="UT">UT - Utah</option>
                            <option value="VT">VT - Vermont</option>
                            <option value="VA">VA - Virginia</option>
                            <option value="WA">WA - Washington</option>
                            <option value="WV">WV - West Virginia</option>
                            <option value="WI">WI - Wisconsin</option>
                            <option value="WY">WY - Wyoming</option>
                        </select>
                        <div class="errorText_form" id="errorText_plate"></div>
                    </div>
                    <button type="button" class="form-collection" onclick="formCollection('<?php echo $reportType; ?>')">Check VIN</button>
                </form>
            </div>
        </section>
        <?php
        $return_html = ob_get_contents();
        ob_end_clean();

        return $return_html;
    }
    public function ws_form(){
        $return_html = '';
        ob_start();
        ?>
        <section>
            <p>Not Yet</p>
        </section>
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
    $initOCRObj = new avlShortcodes;
    return $initOCRObj->form('vhr');
}
add_shortcode('vin_form', 'getVinForm');

/**
 * Get WS OCR Form
 */
function getWsForm(){
    $initOCRObj = new avlShortcodes;
    return $initOCRObj->form('ws');
}
add_shortcode('ws_form', 'getWsForm');