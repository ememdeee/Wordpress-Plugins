<?php

class tcShortcodes {

    public function __construct(){

        // $this->ocrBaseUrl = DECODETHISENGINE;

    }

    public function check_theft_form(){
        $return_html = '';
        ob_start();
        ?>
        <section class="theft_form check_theft_form" id="check_theft_form">
            <label for="vin-input">VIN Number:</label>
            <input id="vin-input" class="input-field" type="text" placeholder="Enter VIN Number" oninput="toUpperCaseTheft(this);" maxlength="17" autocomplete="off">
            <button class="big-btn" id="checkVin" aria-label="Check Vin" onclick="checkTheftByVin()">Check Vin</button>
            <span class="no_data flex none" id="no_data">No theft records found for this VIN!</span>
            <p class="none reportStatus" id="reportStatus"></p>
        </section>
        <?php
        $return_html = ob_get_contents();
        ob_end_clean();
        return $return_html;
    }

    public function report_theft_form($submit) {
        $return_html = '';
        ob_start();
        ?>
        <?php if (!$submit): ?>
            <span id="backFromShowReport" class="back-button" onclick="history.back()">← Back</span>
            <h1 style="margin:20px 0 25px 0;">Theft Check Report</h1>
            <span class="no_data flex" id="no_data">Loading...</span>
        <?php endif; ?>
        <section class="theft_form report_theft_form <?php if (!$submit): ?>show_report_theft_form none<?php endif; ?>" id="report_theft_form">
            <?php if (!$submit): ?>
                <label for="location" class="bold">Location</label>
                <input id="location" class="input-field" type="text" placeholder="Location" disabled>
                <label for="database" class="bold">Database</label>
                <input id="database" class="input-field" type="text" placeholder="Database" disabled>
                <label for="date" class="bold">Date</label>
                <input id="date" class="input-field" type="text" placeholder="Date" disabled>
            <?php endif; ?>
            <label for="vin" class="bold">Vehicle Identification Number (VIN)<span class="important">*</span></label>
            <input id="vin" class="input-field" type="text" placeholder="Enter VIN Number" oninput="toUpperCaseTheft(this);" maxlength="17" <?php echo !$submit ? 'disabled' : ''; ?>>

            <label for="plate" class="bold">License Plate Number</label>
            <input id="plate" class="input-field" type="text" placeholder="Enter License Plate Number" oninput="toUpperCaseTheft(this);" minlength="4" maxlength="7" <?php echo !$submit ? 'disabled' : ''; ?>>
            
            <label for="email" class="bold email">Enter Email<span class="important">*</span></label>
            <input id="email" class="input-field email" type="text" placeholder="Enter Email" <?php echo !$submit ? 'disabled' : ''; ?>>

            <label for="phone" class="bold phone">Enter Phone</label>
            <input id="phone" class="input-field phone" type="text" placeholder="Enter Phone" oninput="this.value = this.value.replace(/[^0-9+()]/g, '');" <?php echo !$submit ? 'disabled' : ''; ?>>
            
            <label for="stolenDate" class="bold">Stolen Date<span class="important">*</span></label>
            <input id="stolenDate" class="input-field" type="<?php echo !$submit ? 'text' : 'date'; ?>" placeholder="Stolen Date" <?php echo !$submit ? 'disabled' : ''; ?>>

            <label for="stolenLocation" class="bold">Stolen From<span class="important">*</span></label>
            <?php if (!$submit): ?>
            <input id="stolenLocation" class="input-field" type="text" placeholder="Stolen From" disabled>
            <?php else: ?>
            <select id="stolenLocation" class="input-field select" <?php echo !$submit ? 'disabled' : ''; ?>>
                <option value="" data-id="0">Select Countries</option>
                <option value="Afghanistan" data-id="1">Afghanistan</option>
                <option value="Albania" data-id="2">Albania</option>
                <option value="Algeria" data-id="3">Algeria</option>
                <option value="American Samoa" data-id="4">American Samoa</option>
                <option value="Andorra" data-id="5">Andorra</option>
                <option value="Angola" data-id="6">Angola</option>
                <option value="Anguilla" data-id="7">Anguilla</option>
                <option value="Antarctica" data-id="8">Antarctica</option>
                <option value="Antigua And Barbuda" data-id="9">Antigua And Barbuda</option>
                <option value="Argentina" data-id="10">Argentina</option>
                <option value="Armenia" data-id="11">Armenia</option>
                <option value="Aruba" data-id="12">Aruba</option>
                <option value="Australia" data-id="13">Australia</option>
                <option value="Austria" data-id="14">Austria</option>
                <option value="Azerbaijan" data-id="15">Azerbaijan</option>
                <option value="Bahamas The" data-id="16">Bahamas The</option>
                <option value="Bahrain" data-id="17">Bahrain</option>
                <option value="Bangladesh" data-id="18">Bangladesh</option>
                <option value="Barbados" data-id="19">Barbados</option>
                <option value="Belarus" data-id="20">Belarus</option>
                <option value="Belgium" data-id="21">Belgium</option>
                <option value="Belize" data-id="22">Belize</option>
                <option value="Benin" data-id="23">Benin</option>
                <option value="Bermuda" data-id="24">Bermuda</option>
                <option value="Bhutan" data-id="25">Bhutan</option>
                <option value="Bolivia" data-id="26">Bolivia</option>
                <option value="Bosnia and Herzegovina" data-id="27">Bosnia and Herzegovina</option>
                <option value="Botswana" data-id="28">Botswana</option>
                <option value="Bouvet Island" data-id="29">Bouvet Island</option>
                <option value="Brazil" data-id="30">Brazil</option>
                <option value="British Indian Ocean Territory" data-id="31">British Indian Ocean Territory</option>
                <option value="Brunei" data-id="32">Brunei</option>
                <option value="Bulgaria" data-id="33">Bulgaria</option>
                <option value="Burkina Faso" data-id="34">Burkina Faso</option>
                <option value="Burundi" data-id="35">Burundi</option>
                <option value="Cambodia" data-id="36">Cambodia</option>
                <option value="Cameroon" data-id="37">Cameroon</option>
                <option value="Canada" data-id="38">Canada</option>
                <option value="Cape Verde" data-id="39">Cape Verde</option>
                <option value="Cayman Islands" data-id="40">Cayman Islands</option>
                <option value="Central African Republic" data-id="41">Central African Republic</option>
                <option value="Chad" data-id="42">Chad</option>
                <option value="Chile" data-id="43">Chile</option>
                <option value="China" data-id="44">China</option>
                <option value="Christmas Island" data-id="45">Christmas Island</option>
                <option value="Cocos (Keeling) Islands" data-id="46">Cocos (Keeling) Islands</option>
                <option value="Colombia" data-id="47">Colombia</option>
                <option value="Comoros" data-id="48">Comoros</option>
                <option value="Congo" data-id="49">Congo</option>
                <option value="Congo The Democratic Republic Of The" data-id="50">Congo The Democratic Republic Of The</option>
                <option value="Cook Islands" data-id="51">Cook Islands</option>
                <option value="Costa Rica" data-id="52">Costa Rica</option>
                <option value="Cote D'Ivoire (Ivory Coast)" data-id="53">Cote D'Ivoire (Ivory Coast)</option>
                <option value="Croatia (Hrvatska)" data-id="54">Croatia (Hrvatska)</option>
                <option value="Cuba" data-id="55">Cuba</option>
                <option value="Cyprus" data-id="56">Cyprus</option>
                <option value="Czech Republic" data-id="57">Czech Republic</option>
                <option value="Denmark" data-id="58">Denmark</option>
                <option value="Djibouti" data-id="59">Djibouti</option>
                <option value="Dominica" data-id="60">Dominica</option>
                <option value="Dominican Republic" data-id="61">Dominican Republic</option>
                <option value="East Timor" data-id="62">East Timor</option>
                <option value="Ecuador" data-id="63">Ecuador</option>
                <option value="Egypt" data-id="64">Egypt</option>
                <option value="El Salvador" data-id="65">El Salvador</option>
                <option value="Equatorial Guinea" data-id="66">Equatorial Guinea</option>
                <option value="Eritrea" data-id="67">Eritrea</option>
                <option value="Estonia" data-id="68">Estonia</option>
                <option value="Ethiopia" data-id="69">Ethiopia</option>
                <option value="External Territories of Australia" data-id="70">External Territories of Australia</option>
                <option value="Falkland Islands" data-id="71">Falkland Islands</option>
                <option value="Faroe Islands" data-id="72">Faroe Islands</option>
                <option value="Fiji Islands" data-id="73">Fiji Islands</option>
                <option value="Finland" data-id="74">Finland</option>
                <option value="France" data-id="75">France</option>
                <option value="French Guiana" data-id="76">French Guiana</option>
                <option value="French Polynesia" data-id="77">French Polynesia</option>
                <option value="French Southern Territories" data-id="78">French Southern Territories</option>
                <option value="Gabon" data-id="79">Gabon</option>
                <option value="Gambia The" data-id="80">Gambia The</option>
                <option value="Georgia" data-id="81">Georgia</option>
                <option value="Germany" data-id="82">Germany</option>
                <option value="Ghana" data-id="83">Ghana</option>
                <option value="Gibraltar" data-id="84">Gibraltar</option>
                <option value="Greece" data-id="85">Greece</option>
                <option value="Greenland" data-id="86">Greenland</option>
                <option value="Grenada" data-id="87">Grenada</option>
                <option value="Guadeloupe" data-id="88">Guadeloupe</option>
                <option value="Guam" data-id="89">Guam</option>
                <option value="Guatemala" data-id="90">Guatemala</option>
                <option value="Guernsey and Alderney" data-id="91">Guernsey and Alderney</option>
                <option value="Guinea" data-id="92">Guinea</option>
                <option value="Guinea-Bissau" data-id="93">Guinea-Bissau</option>
                <option value="Guyana" data-id="94">Guyana</option>
                <option value="Haiti" data-id="95">Haiti</option>
                <option value="Heard and McDonald Islands" data-id="96">Heard and McDonald Islands</option>
                <option value="Honduras" data-id="97">Honduras</option>
                <option value="Hong Kong S.A.R." data-id="98">Hong Kong S.A.R.</option>
                <option value="Hungary" data-id="99">Hungary</option>
                <option value="Iceland" data-id="100">Iceland</option>
                <option value="India" data-id="101">India</option>
                <option value="Indonesia" data-id="102">Indonesia</option>
                <option value="Iran" data-id="103">Iran</option>
                <option value="Iraq" data-id="104">Iraq</option>
                <option value="Ireland" data-id="105">Ireland</option>
                <option value="Israel" data-id="106">Israel</option>
                <option value="Italy" data-id="107">Italy</option>
                <option value="Jamaica" data-id="108">Jamaica</option>
                <option value="Japan" data-id="109">Japan</option>
                <option value="Jersey" data-id="110">Jersey</option>
                <option value="Jordan" data-id="111">Jordan</option>
                <option value="Kazakhstan" data-id="112">Kazakhstan</option>
                <option value="Kenya" data-id="113">Kenya</option>
                <option value="Kiribati" data-id="114">Kiribati</option>
                <option value="Korea North" data-id="115">Korea North</option>
                <option value="Korea South" data-id="116">Korea South</option>
                <option value="Kuwait" data-id="117">Kuwait</option>
                <option value="Kyrgyzstan" data-id="118">Kyrgyzstan</option>
                <option value="Laos" data-id="119">Laos</option>
                <option value="Latvia" data-id="120">Latvia</option>
                <option value="Lebanon" data-id="121">Lebanon</option>
                <option value="Lesotho" data-id="122">Lesotho</option>
                <option value="Liberia" data-id="123">Liberia</option>
                <option value="Libya" data-id="124">Libya</option>
                <option value="Liechtenstein" data-id="125">Liechtenstein</option>
                <option value="Lithuania" data-id="126">Lithuania</option>
                <option value="Luxembourg" data-id="127">Luxembourg</option>
                <option value="Macau S.A.R." data-id="128">Macau S.A.R.</option>
                <option value="Macedonia" data-id="129">Macedonia</option>
                <option value="Madagascar" data-id="130">Madagascar</option>
                <option value="Malawi" data-id="131">Malawi</option>
                <option value="Malaysia" data-id="132">Malaysia</option>
                <option value="Maldives" data-id="133">Maldives</option>
                <option value="Mali" data-id="134">Mali</option>
                <option value="Malta" data-id="135">Malta</option>
                <option value="Man (Isle of)" data-id="136">Man (Isle of)</option>
                <option value="Marshall Islands" data-id="137">Marshall Islands</option>
                <option value="Martinique" data-id="138">Martinique</option>
                <option value="Mauritania" data-id="139">Mauritania</option>
                <option value="Mauritius" data-id="140">Mauritius</option>
                <option value="Mayotte" data-id="141">Mayotte</option>
                <option value="Mexico" data-id="142">Mexico</option>
                <option value="Micronesia" data-id="143">Micronesia</option>
                <option value="Moldova" data-id="144">Moldova</option>
                <option value="Monaco" data-id="145">Monaco</option>
                <option value="Mongolia" data-id="146">Mongolia</option>
                <option value="Montserrat" data-id="147">Montserrat</option>
                <option value="Morocco" data-id="148">Morocco</option>
                <option value="Mozambique" data-id="149">Mozambique</option>
                <option value="Myanmar" data-id="150">Myanmar</option>
                <option value="Namibia" data-id="151">Namibia</option>
                <option value="Nauru" data-id="152">Nauru</option>
                <option value="Nepal" data-id="153">Nepal</option>
                <option value="Netherlands Antilles" data-id="154">Netherlands Antilles</option>
                <option value="Netherlands The" data-id="155">Netherlands The</option>
                <option value="New Caledonia" data-id="156">New Caledonia</option>
                <option value="New Zealand" data-id="157">New Zealand</option>
                <option value="Nicaragua" data-id="158">Nicaragua</option>
                <option value="Niger" data-id="159">Niger</option>
                <option value="Nigeria" data-id="160">Nigeria</option>
                <option value="Niue" data-id="161">Niue</option>
                <option value="Norfolk Island" data-id="162">Norfolk Island</option>
                <option value="Northern Mariana Islands" data-id="163">Northern Mariana Islands</option>
                <option value="Norway" data-id="164">Norway</option>
                <option value="Oman" data-id="165">Oman</option>
                <option value="Pakistan" data-id="166">Pakistan</option>
                <option value="Palau" data-id="167">Palau</option>
                <option value="Palestinian Territory Occupied" data-id="168">Palestinian Territory Occupied</option>
                <option value="Panama" data-id="169">Panama</option>
                <option value="Papua new Guinea" data-id="170">Papua new Guinea</option>
                <option value="Paraguay" data-id="171">Paraguay</option>
                <option value="Peru" data-id="172">Peru</option>
                <option value="Philippines" data-id="173">Philippines</option>
                <option value="Pitcairn Island" data-id="174">Pitcairn Island</option>
                <option value="Poland" data-id="175">Poland</option>
                <option value="Portugal" data-id="176">Portugal</option>
                <option value="Puerto Rico" data-id="177">Puerto Rico</option>
                <option value="Qatar" data-id="178">Qatar</option>
                <option value="Reunion" data-id="179">Reunion</option>
                <option value="Romania" data-id="180">Romania</option>
                <option value="Russia" data-id="181">Russia</option>
                <option value="Rwanda" data-id="182">Rwanda</option>
                <option value="Saint Helena" data-id="183">Saint Helena</option>
                <option value="Saint Kitts And Nevis" data-id="184">Saint Kitts And Nevis</option>
                <option value="Saint Lucia" data-id="185">Saint Lucia</option>
                <option value="Saint Pierre and Miquelon" data-id="186">Saint Pierre and Miquelon</option>
                <option value="Saint Vincent And The Grenadines" data-id="187">Saint Vincent And The Grenadines</option>
                <option value="Samoa" data-id="188">Samoa</option>
                <option value="San Marino" data-id="189">San Marino</option>
                <option value="Sao Tome and Principe" data-id="190">Sao Tome and Principe</option>
                <option value="Saudi Arabia" data-id="191">Saudi Arabia</option>
                <option value="Senegal" data-id="192">Senegal</option>
                <option value="Serbia" data-id="193">Serbia</option>
                <option value="Seychelles" data-id="194">Seychelles</option>
                <option value="Sierra Leone" data-id="195">Sierra Leone</option>
                <option value="Singapore" data-id="196">Singapore</option>
                <option value="Slovakia" data-id="197">Slovakia</option>
                <option value="Slovenia" data-id="198">Slovenia</option>
                <option value="Smaller Territories of the UK" data-id="199">Smaller Territories of the UK</option>
                <option value="Solomon Islands" data-id="200">Solomon Islands</option>
                <option value="Somalia" data-id="201">Somalia</option>
                <option value="South Africa" data-id="202">South Africa</option>
                <option value="South Georgia" data-id="203">South Georgia</option>
                <option value="South Sudan" data-id="204">South Sudan</option>
                <option value="Spain" data-id="205">Spain</option>
                <option value="Sri Lanka" data-id="206">Sri Lanka</option>
                <option value="Sudan" data-id="207">Sudan</option>
                <option value="Suriname" data-id="208">Suriname</option>
                <option value="Svalbard And Jan Mayen Islands" data-id="209">Svalbard And Jan Mayen Islands</option>
                <option value="Swaziland" data-id="210">Swaziland</option>
                <option value="Sweden" data-id="211">Sweden</option>
                <option value="Switzerland" data-id="212">Switzerland</option>
                <option value="Syria" data-id="213">Syria</option>
                <option value="Taiwan" data-id="214">Taiwan</option>
                <option value="Tajikistan" data-id="215">Tajikistan</option>
                <option value="Tanzania" data-id="216">Tanzania</option>
                <option value="Thailand" data-id="217">Thailand</option>
                <option value="Togo" data-id="218">Togo</option>
                <option value="Tokelau" data-id="219">Tokelau</option>
                <option value="Tonga" data-id="220">Tonga</option>
                <option value="Trinidad And Tobago" data-id="221">Trinidad And Tobago</option>
                <option value="Tunisia" data-id="222">Tunisia</option>
                <option value="Turkey" data-id="223">Turkey</option>
                <option value="Turkmenistan" data-id="224">Turkmenistan</option>
                <option value="Turks And Caicos Islands" data-id="225">Turks And Caicos Islands</option>
                <option value="Tuvalu" data-id="226">Tuvalu</option>
                <option value="Uganda" data-id="227">Uganda</option>
                <option value="Ukraine" data-id="228">Ukraine</option>
                <option value="United Arab Emirates" data-id="229">United Arab Emirates</option>
                <option value="United Kingdom" data-id="230">United Kingdom</option>
                <option value="United States" data-id="231">United States</option>
                <option value="United States Minor Outlying Islands" data-id="232">United States Minor Outlying Islands</option>
                <option value="Uruguay" data-id="233">Uruguay</option>
                <option value="Uzbekistan" data-id="234">Uzbekistan</option>
                <option value="Vanuatu" data-id="235">Vanuatu</option>
                <option value="Vatican City State (Holy See)" data-id="236">Vatican City State (Holy See)</option>
                <option value="Venezuela" data-id="237">Venezuela</option>
                <option value="Vietnam" data-id="238">Vietnam</option>
                <option value="Virgin Islands (British)" data-id="239">Virgin Islands (British)</option>
                <option value="Virgin Islands (US)" data-id="240">Virgin Islands (US)</option>
                <option value="Wallis And Futuna Islands" data-id="241">Wallis And Futuna Islands</option>
                <option value="Western Sahara" data-id="242">Western Sahara</option>
                <option value="Yemen" data-id="243">Yemen</option>
                <option value="Yugoslavia" data-id="244">Yugoslavia</option>
                <option value="Zambia" data-id="245">Zambia</option>
                <option value="Zimbabwe" data-id="246">Zimbabwe</option>
            </select>
            <?php endif; ?>

            <label for="city" class="bold">City<span class="important">*</span></label>
            <input id="city" class="input-field" type="text" placeholder="Enter City" <?php echo !$submit ? 'disabled' : ''; ?>>

            <label for="state" class="bold">State<span class="important">*</span></label>
            <input id="state" class="input-field" type="text" placeholder="Enter State" <?php echo !$submit ? 'disabled' : ''; ?>>

            <label for="address" class="bold">Stolen Address<span class="important">*</span></label>
            <input id="address" class="input-field" type="text" placeholder="Enter Address" <?php echo !$submit ? 'disabled' : ''; ?>>

            <label for="year" class="bold">Year<span class="important">*</span></label>
            <input id="year" class="input-field" type="text" placeholder="Enter Year" oninput="this.value = this.value.replace(/[^0-9+()]/g, '');" maxlength="4" <?php echo !$submit ? 'disabled' : ''; ?>>

            <label for="make" class="bold">Make<span class="important">*</span></label>
            <input id="make" class="input-field" type="text" placeholder="Enter Make" <?php echo !$submit ? 'disabled' : ''; ?>>

            <label for="model" class="bold">Model<span class="important">*</span></label>
            <input id="model" class="input-field" type="text" placeholder="Enter Model" <?php echo !$submit ? 'disabled' : ''; ?>>

            <label for="color" class="bold">Vehicle Color</label>
            <input id="color" class="input-field" type="text" placeholder="Enter Color" <?php echo !$submit ? 'disabled' : ''; ?>>

            <label for="items" class="bold">Items Stolen with Vehicle</label>
            <div for="items" class="textarea-container">
                <textarea name="items" id="items" class="input-field" maxlength="300" placeholder="Write the details about the claims" <?php echo !$submit ? 'disabled' : ''; ?>></textarea>
                <span for="items" class="textarea-indicator" id="items-indicator">0/300</span>
            </div>

            <label for="theft-details" class="bold">Theft Details and Descriptions<span class="important">*</span></label>
            <div for="theft-details" class="textarea-container">
                <textarea name="theft-details" id="theft-details" class="input-field" maxlength="300" placeholder="Enter Theft Details and Descriptions" <?php echo !$submit ? 'disabled' : ''; ?>></textarea>
                <span for="theft-details" class="textarea-indicator" id="theft-details-indicator">0/300</span>
            </div>

            <div class="policeReportContainer">
                <label for="policeReport" class="pointer attatch-police-report">Attach Police Report</label>
                <?php if (!$submit): ?>
                <p id="attachedPoliceRpt">Yes/No</p>
                <?php endif; ?>
            </div>
            <?php if ($submit): ?>
            <input type="file" name="policeReport" id="policeReport" class="input-field" accept=".pdf, .png, .jpg, .jpeg" />
            <?php endif; ?>
            
            <?php if (!$submit): ?>
                <a id="policeReport" href="#">Download</a>
            <?php endif; ?>

            <?php if ($submit): ?>
            <button class="big-btn" id="submitData" onclick="reportThefData()" aria-label="Submit Details">Submit Details</button>
            <p class="none reportStatus" id="reportStatus"></p>
            <?php endif; ?>
        </section>
        <?php
        $return_html = ob_get_contents();
        ob_end_clean();
        return $return_html;
    }
}

/**
 * Get Check Theft Form
 */
function getCheckForm(){
    $initOCRObj = new tcShortcodes;
    return $initOCRObj->check_theft_form();
}
add_shortcode('check_theft_form', 'getCheckForm');

/**
 * Get Report Theft Form
 */
function getReportForm($atts) {
    $initOCRObj = new tcShortcodes();
    
    $atts = shortcode_atts(array(
        'submit' => true  // default value
    ), $atts);
    
    $submit = filter_var($atts['submit'], FILTER_VALIDATE_BOOLEAN);
    
    return $initOCRObj->report_theft_form($submit);
}
add_shortcode('report_theft_form', 'getReportForm');