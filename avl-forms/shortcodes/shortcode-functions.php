<?php

class avlShortcodes {

    public function __construct(){

        // $this->ocrBaseUrl = DECODETHISENGINE;

    }

    public function form($reportType, $vin, $lp, $initial){
        $return_html = '';
        $buttonFunction = ($initial == 0) ? $reportType : (($initial == 1) ? $reportType . '_plate' : "");

        ob_start();
        ?>
        <section>
            <div class="search_vin_wrapper">
                <div class="search_by_wrapper" role="tablist">
                    <button class="search_by-toogle search_by_vin <?php if ($initial == '0') echo "search_by_toggle_active"; ?>" onclick="searchByVinClicked('<?php echo $reportType; ?>')" role="tab">by VIN</button>
                    <button class="search_by-toogle search_by_plate <?php if ($initial == '1') echo "search_by_toggle_active"; ?>" onclick="searchByPlateClicked('<?php echo $reportType; ?>')" role="tab">by US License Plate</button>
                </div>
                <form id="vinForm">
                    <div class="input_container input_container_vin <?php if ($initial == '0') echo "input_container_active"; ?>">
                        <input type="text" class="form-control vin_input" id="vinInput" placeholder="ENTER VIN" maxlength="17" oninput="toUpperCase(); syncValues(this, 'vin_input'); updateIndicator();">
                        <span class="indicator" id="indicator">0 of 17</span>
                        <div class="errorText_form errorText_vin" id="errorText_vin"></div>
                    </div>
                    <div class="input_container input_container_plate <?php if ($initial == '1') echo "input_container_active"; ?>">
                        <input type="text" class="form-control plate_input" id="plateInput" placeholder="ENTER PLATE" maxlength="10" oninput="toUpperCase(); syncValues(this, 'plate_input');">
                        <label for="state-list" class="visually-hidden">Select a State:</label>
                        <select class="select_state form-control" id="state-list" required="" onchange="updateColor(); syncValues(this, 'select_state');">
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
                        <div class="errorText_form errorText_plate" id="errorText_plate"></div>
                    </div>
                    <button type="button" class="form-collection main-form-btn" onclick="formCollection('<?php echo $buttonFunction; ?>')">Check VIN</button>
                </form>
            </div>
        </section>
        <?php
        $return_html = ob_get_contents();
        ob_end_clean();

        return $return_html;
    }

    public function faq($content, $show_heading) {
        // Initialize return HTML
        $return_html = '';
    
        // Check if content is provided
        if (!empty($content)) {
            // Optional: Add the heading if the attribute is set to true
            if ($show_heading === 'true') {
                $return_html .= '<h2>Frequently Asked Questions</h2>';
            }
    
            // Split the content into questions and answers using the delimiter *
            $qa_pairs = explode('*', $content);
            $return_html .= '<div class="accordion faqSection">';
            
            // Iterate over the pairs and create the FAQ structure
            for ($i = 0; $i < count($qa_pairs); $i += 2) {
                // Make sure we have both question and answer
                if (isset($qa_pairs[$i]) && isset($qa_pairs[$i + 1])) {
                    $question = trim($qa_pairs[$i]);
                    $answer = trim($qa_pairs[$i + 1]);
                    
                    // Append the details to the return HTML
                    $return_html .= '<details>';
                    $return_html .= '<summary><h3>' . esc_html($question) . '</h3></summary>';
                    $return_html .= '<p>' . esc_html($answer) . '</p>';
                    $return_html .= '</details>';
                }
            }
            
            $return_html .= '</div>';
        } else {
            // Optional: Return a message if no content is provided
            $return_html .= '<p>No FAQs available.</p>';
        }
    
        // Optional: Inline styles can be included directly or in a separate stylesheet
        $return_html .= '<style>
            /* FAQ Section */
            .faqSection h3 {
                color: #333;
                margin: 0;
                cursor: pointer;
                border: none;
                outline: none;
                display: inline-block;
                font-size: 15px;
                width: calc(100% - 20px);
            }
            .faqSection p {
                padding: 10px;
                margin: 0;
                background-color: #f5f5f5;
            }
            .faqSection details {
                margin: 5px 0px;
            }
            .faqSection summary {
                background-color: #fff;
                padding: 10px;
            }
            .faqSection summary::-webkit-details-marker {
                display: none;
            }
        </style>';
    
        return $return_html;
    }
}

/**
 * Get VIN Form
 */
function getVinForm(){
    $initOCRObj = new avlShortcodes;
    return $initOCRObj->form('vhr', '1', '1', '0');
}
add_shortcode('vin_form', 'getVinForm');

/**
 * Get WS OCR Form
 */
function getWsForm(){
    $initOCRObj = new avlShortcodes;
    return $initOCRObj->form('ws', '1', '1', '0');
}
add_shortcode('ws_form', 'getWsForm');

/**
 * Get VHR/WS  Form
 */
function getForm($atts) {
    $initOCRObj = new avlShortcodes();
    
    $atts = shortcode_atts(array(
        'type' => 'vhr', // Report Type (vhr/ws)
        'vin' => '1',  //Show VIN (0/1)
        'lp' => '1', //Show LP (0/1)
        'initial' => '0' //Show Initial Vin/LP (0/1)
    ), $atts);
    
    return $initOCRObj->form($atts['type'], $atts['vin'], $atts['lp'], $atts['initial']);
}
add_shortcode('site_form', 'getForm');

/**
 * Get FAQ Element
 */
function getFaq($atts, $content = null) {
    // Set default attributes and extract them
    $atts = shortcode_atts(
        array(
            'show_heading' => 'true', // Default is to show the heading
        ), 
        $atts
    );

    $initOCRObj = new avlShortcodes;
    return $initOCRObj->faq($content, $atts['show_heading']);
}
add_shortcode('faq', 'getFaq');