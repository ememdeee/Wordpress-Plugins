console.log('site_forms.js working...');
jQuery(document).ready(function($) {
    // Access the domainName and memberAreaPreview variables from plugin admin page
    domainName = site_forms_vars.domainName;
    memberAreaPreview = site_forms_vars.memberAreaPreview;
    referenceDomain = site_forms_vars.referenceDomain || getCookie('ref') || '';
    pricing = JSON.parse(site_forms_vars.pricing); // pricing = site_forms_vars.pricing;

    console.log("Domain Name:", domainName);
    console.log("Member Area Preview:", memberAreaPreview);
    console.log("Reference Domain:", referenceDomain);
    console.log("Pricing:", site_forms_vars.pricing);
    console.log("Pricing Json:", pricing);

    // Ohter needed code
    if (document.getElementById('vinForm')) {
        // resetDropdown('makeList');resetDropdown('modelList');resetDropdown('yearList'); //to fix the blank field after checkout https://prnt.sc/7lollnVUlIz7
        resetDropdown('makeList');resetDropdown('modelList'); //to fix the blank field after checkout https://prnt.sc/7lollnVUlIz7
    };
});

// Prefill email, phone, & vin if user already login (Works for CD)
function prefillData(){
    // Retrieve the user_settings data from localStorage
    const userSettings = JSON.parse(localStorage.getItem('user_settings'));

    if (userSettings){
        // Access the email and phone number
        const userEmail = userSettings.user.email;
        const usePhone = userSettings.user.phone;

        // Log the email and phone number to the console
        // console.log('Email:', userEmail);
        // console.log('Phone:', usePhone);

        if (userEmail) {
            document.querySelectorAll('.email_input').forEach(input => {
                input.value = userEmail;
            });
        }
        
        // If phone is available, fill all fields with class 'phone_input'
        if (usePhone) {
            document.querySelectorAll('.phone_input').forEach(input => {
                input.value = usePhone;
            });
        }
        console.log("User logged in");
    }else{
        console.log("User not logged in");
    }
}
prefillData(); //execute

// Get cookie without jquery extention
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null; // return null if cookie not found
}

// fetch license_plate to vin function 
function fetchVinData(stateInputValue, plateInputValue) {
    return new Promise(function(resolve, reject) {
        var requestData = {
            state: stateInputValue,
            plate: plateInputValue,
            email: 'test@test.com'
        };

        var apiUrl = 'https://app.detailedvehiclehistory.com/landing/get_license';

        jQuery.ajax({
            type: 'POST',
            url: apiUrl,
            data: requestData,
            success: function(response) {
                var { vin } = JSON.parse(response);
                resolve(vin);
            },
            error: function(xhr, status, error) {
                reject(error);
            }
        });
    });
}

//Check if classic VIN is mapped or not
function checkMappedVin(vin) {
    console.log("Checking Map unmapped API...");
    console.log("Por favor espere...");
    return new Promise(function(resolve, reject) {
        var requestData = {
            vin: vin
        };

        var apiUrl = 'https://app.detailedvehiclehistory.com/landing/check_mapped_vin';

        jQuery.ajax({
            type: 'POST',
            url: apiUrl,
            data: requestData,
            success: function(response) {
                var { status } = JSON.parse(response);
                resolve(status);
            },
            error: function(xhr, status, error) {
                reject(error);
            }
        });
    });
}

// Get pricing data from API domain/wp/report_plans
function getPricingData(){
    console.log("Get Pricing Data...")
}

// for search by vin or plate toogle
function removeTogglingClass() {
    // Remove 'search_by_toggle_active' class from all buttons
    document.querySelectorAll('.search_by_toggle_active').forEach(button => {
        button.classList.remove('search_by_toggle_active');
    });

    // Remove 'input_container_active' class from all elements
    document.querySelectorAll('.input_container_active').forEach(element => {
        element.classList.remove('input_container_active');
    });
};

function changeBtnText(buttonSelector){
    document.querySelectorAll("button[vin-text][lp-text][ymm-text]").forEach(button => {
        if (buttonSelector == ".search_by_vin") {
            button.textContent = button.getAttribute('vin-text');
        }
        else if (buttonSelector == ".search_by_plate"){
            button.textContent = button.getAttribute('lp-text');
        }
        else if (buttonSelector == ".search_by_ymm"){
            button.textContent = button.getAttribute('ymm-text');
        }
    });
}

function handleToggleClick(buttonSelector, containerSelector, buttonFunction) {
    removeTogglingClass();
    changeBtnText(buttonSelector); //if custom text set

    // Add 'search_by_toggle_active' class to clicked button
    document.querySelectorAll(buttonSelector).forEach(button => {
        button.classList.add('search_by_toggle_active');
    });

    // Add 'input_container_active' class to associated container
    document.querySelectorAll(containerSelector).forEach(container =>{
        container.classList.add('input_container_active');
    });

    // Change OnClick function
    document.querySelectorAll(".form_submit_btn").forEach(button => {
        button.removeAttribute('onclick');
        button.setAttribute("onclick", "formCollection('" + buttonFunction + "')");
    });
};

function searchByVinClicked(reportType) {
    handleToggleClick('.search_by_vin', '.input_container_vin', reportType);
};

function searchByPlateClicked(reportType) {
    var modifiedReportType = reportType + '_plate';
    handleToggleClick('.search_by_plate', '.input_container_plate', modifiedReportType);
};

function searchByYmmClicked(reportType) {
    var modifiedReportType = reportType + '_ymm';
    handleToggleClick('.search_by_ymm', '.input_container_ymm', modifiedReportType);
};

// Function to disable input fields
function disable() {
    var element = ['.form_submit_btn', '.vin_input', '.phone_input', '.email_input', '.plate_input', '.select_state', '.search_by-toogle', '.ymm_field']
    for (var i = 0; i < element.length; i++) {
        var elementClass = element[i];
        document.querySelectorAll(elementClass).forEach(element =>{
            element.setAttribute('disabled', true);
        })
        
    }
}

// Function to enable input fields
function undisable() {
    var element = ['.form_submit_btn', '.vin_input', '.phone_input', '.email_input', '.plate_input', '.select_state', '.search_by-toogle', '.ymm_field']
    for (var i = 0; i < element.length; i++) {
        var elementClass = element[i];
        document.querySelectorAll(elementClass).forEach(element =>{
            element.removeAttribute('disabled');
        })
    }
}

function toUpperCase(element) {
    element.value = element.value.toUpperCase();
};

function syncValues(input, className) {
    // Get the value of the input that triggered the event
    var value = input.value;

    // Select all input fields with the class "vin_input" except for the input that triggered the event
    document.querySelectorAll('.' + className).forEach( field => {
        if (field !==input){
            field.value = value;
        };
    });
}

function clearErrorText(){
    document.querySelectorAll(".errorText_form").forEach(errorText => {
        errorText.textContent = '';
    });
    document.querySelectorAll(".input_field").forEach(field => {
        field.classList.remove("error_field");
    });
}

function addErrorText(errorFieldClass, errorTextClass, text){
    document.querySelectorAll(errorTextClass).forEach(errorText =>{
        errorText.textContent = text;
    });
    document.querySelectorAll(errorFieldClass).forEach(errorField =>{ // add error class to perspective field
        errorField.classList.add("error_field");
    });
}

function updateBtnText(text){
    document.querySelectorAll('.form_submit_btn').forEach(btnText => {
        btnText.textContent = text;
    })
}

function IsEmailAdvanced(email) {
    if (email.trim() === "") {
        return "empty";
    };
    if (!email.includes("@")) {
        return "missing_at";
    };

    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    if (!regex.test(email)) {
        return "invalid";
    };
    
    return "valid";
}
function form_input(name, type, value) {
    input = document.createElement('input');
    input.setAttribute('name', name);
    input.setAttribute('type', type);
    input.setAttribute('value', value);
    return input;
}

function create_password(n) {
    var add = 1,
      max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.
  
    if (n > max) {
      return create_password(max) + create_password(n - max);
    }
  
    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return ("" + number).substring(add);
}

// ymm
function getYearDropdown(){
    console.log("Get Year Data!");
    // endPoint = "https://app.developtestsite.com/api-cwa/get-dropdown";
    endPoint = "https://app.developtestsite.com/api-cwa/get-stickerYear";
    year = "";
    make = "";
    elementId = "yearList";
    if (checkData(elementId)){
        calAPIYmm(endPoint, year, make, elementId);
    }
    else {
        console.log("Data already stored.");
    }
  }
function getMakeDropdown(){
    console.log("Get Make Data!");
    endPoint = "https://app.developtestsite.com/api-cwa/get-stickerMakes";
    // endPoint = "https://app.developtestsite.com/api/get-wp-makes";
    year = document.getElementById("yearList").value;
    make = "";
    elementId = "makeList";
    if (year != ""){
        if (checkData(elementId)){
            calAPIYmm(endPoint, year, make, elementId);
        }
        else {
            console.log("Data already stored.");
        }
    }
    else{
        resetDropdown(elementId, "Select Year")
    }
}
function getModelDropdown(){
    console.log("Get Model Data!");
    // endPoint = "https://app.developtestsite.com/api/get-wp-models";
    endPoint = "https://app.developtestsite.com/api-cwa/get-stickerModels";
    year = document.getElementById("yearList").value;
    // year = "2010";
    make = document.getElementById("makeList").value;
    // make = "acura";
    elementId = "modelList";
    if (make != ""){
      if (checkData(elementId)){
          calAPIYmm(endPoint, year, make, elementId);
      }
      else {
          console.log("Data already stored.");
      }
    }
    else{
      resetDropdown(elementId, "Select Make")
    }
}
function checkData(id){
    select = document.getElementById(id);
    if (select.value == '') {
        return true
    }
    else {
        return false
    }
}
function resetDropdown(id, text="Loading..."){
    select = document.getElementById(id);
    select.innerHTML = '';
    var option = document.createElement('option');
    if (id == "yearList"){
        option.text = "Year";
    }
    else if (id == "makeList"){
        option.text = "Make";
    }
    else if (id == "modelList"){
        option.text = "Model";
    }
    option.value = "";
    option.selected = true;
    option.disabled = true;
    select.appendChild(option);
    var optionLoading = document.createElement('option');
    optionLoading.text = text
    optionLoading.value = text
    optionLoading.disabled = true;
    select.appendChild(optionLoading);
}
  
function calAPIYmm(endPoint, year, make, elementId) {
    console.log(endPoint, year, make, elementId)
    var apiUrl = endPoint; //endPoint
  
    // Prepare the form data
    var formData = new FormData();
    formData.append("year", year);
    formData.append("make", make);
  
    // Fetch options
    var options = {
        method: "POST",
        body: formData,
        headers: {
            "X-AuthKey": "c6Jpyu8cWX4V3WoyLwFp"
        }
    };
  
    // Make the fetch request
    fetch(apiUrl, options)
        .then(function(response) {
            // Check if the request was successful
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // Parse the JSON response
            return response.json();
        })
        .then(function(data) {
            // Log the response data
            console.log("respondddddd", data);
            reWrite(elementId, data)
        })
        .catch(function(error) {
            // Log any errors
            // console.log(options)
            console.log("Form Data:");
            for (var pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            console.error("Error:", error);
        });
}
  
function reWrite(id, data){
    select = document.getElementById(id);
    select.innerHTML = '';
    console.log("Rewriting...")
    console.log("Select Id: ", id);
    if (id == "yearList"){
        array=data.years;
        console.log("array year: ", array);
    }
    else if (id == "makeList"){
        array=data.makes;
        console.log("array make: ", array);
    }
    else if (id == "modelList"){
        array=data.models;
        console.log("array model: ", array);
    }
    array.forEach(function(data, index) {
        var option = document.createElement('option');
        option.text = data;
        option.value = data;
        if (index == 0) {
            option.selected = true;
        }
        select.appendChild(option);
    })
}
// end of ymmt tab form
function buildQueryParams(params, querry = true) { // if querry false, Output: "&name=John%20Doe&age=30". if true, Output: "name=John%20Doe&age=30"
    const queryString = Object.keys(params)
                              .filter(key => params[key] !== undefined && params[key] !== null && params[key] !== "")
                              .map(key => `${key}=${params[key]}`)
                              .join('&');
                            //   .map(key => `${key}=${encodeURIComponent(params[key])}`)
    if (!queryString) {
        return '';
    }                          
    return querry ? queryString : `&${queryString}`;
}

function getYmmCode(type) { //https://app.detailedvehiclehistory.com/wp/report_plans https://app.detailedvehiclehistory.com/wp/sticker_plans 
    const domainCodes = {
        "detailedvehiclehistory.com": ["DVH1", "DVHST1"],
        "developtestsite.com": ["DTS1", "DDTST1"],
        "miocicvscormier.com": ["MVC1", "DMVCT1"],
        "windowstickerslookup.com": ["null", "WSLST1"]
    };

    let code = domainCodes[domainName];
    
    if (!code) {
        console.log("YMM Code unknown, domainName not registered!");
        return null;  // Return null or a default value to handle unknown domains
    }

    return type.includes("ws") ? code[1] : code[0];
}

function baseUrl(type, memberAreaPreview) {
    // Define the mapping based on type and memberAreaPreview
    let path = "";

    if (type === "vhr" || type === "vhr_plate") {
        if (memberAreaPreview === "cwampv_proxy") {
            if (domainName.includes("classicdecoder.com")) {
                path = "/vehicle/preview?type=vhr&";
            }
            else if (domainName.includes("smartcarcheck.uk")){
                path = "/landing/preview?";
            } 
            else {
                path = "/vin-check/preview?";
            }
        } else if (memberAreaPreview === "cwampv") {
            path = "/members/preview?";
        }
    } else if (type === "ws" || type === "ws_plate") {
        if (memberAreaPreview === "cwampv_proxy") {
            if (domainName.includes("classicdecoder.com")) {
                path = "/vehicle/preview?type=sticker&";
            } else {
                path = "/vin-check/ws-preview?";
            }
        } else if (memberAreaPreview === "cwampv") {
            path = "/members/ws-preview?";
        }
    }

    return path;
}

function checkPage(link){
    let url = new URL(link);
    let path = url.pathname;
    if(path === '/' || path === ''){
        return 'homepage';
    }else{
        // Remove leading and trailing slashes and replace any remaining slashes with hyphens
        return path.replace(/^\/|\/$/g, '').replace(/\//g, '-');
    }
}

function redirect(vin, type, code="code", email="", phone=""){
    let state = '';let title = '';
    let url = window.location.href;
    history.pushState(state, title, url);

    let commonParams = {
        vin: vin,
        email: email,
        mobile: phone,
        ref: referenceDomain,
        offer: sessionStorage.getItem("discount"),
        wpPage: checkPage(url),
    };
    let queryParams = buildQueryParams(commonParams);

    console.log(queryParams);
    // debugger;

    if (type=="vhr" || type=="vhr_plate" || type=="ws" || type=="ws_plate"){
        if (vin.length >= 5 && vin.length <= 14) { //classic Vin
            if (type.includes("plate")) {
                type = type.replace("_plate", "");
            };
            checkMappedVin(vin).then(function(status) {
                console.log("redirecting...Waiting for preview page to ready");
                if (status != "error"){
                    console.log("VIN is mapped!");
                    window.location.replace('https://' + domainName + baseUrl(type, memberAreaPreview) + queryParams);
                }else{
                    console.log("VIN is unmapped!");
                    if (domainName.includes("classicdecoder.com")) {
                        window.location.replace('https://' + domainName + baseUrl(type, memberAreaPreview) + queryParams);
                    }else{
                        window.location.replace('https://' + domainName + "/confirm?" + queryParams + "&type=" + type);
                    };
                }
            });
        }else {
            console.log("redirecting...Waiting for preview page to ready");
            if (domainName.includes("classicdecoder.com")) {
                domainName = "instantvinreports.com"; //redirect to IVR if CD with 17 VIN
                commonParams = {
                    vin: vin,
                    email: email,
                    mobile: phone,
                    ref: "classicdecoder.com",
                    offer: sessionStorage.getItem("discount"),
                    wpPage: checkPage(url),
                };
                queryParams = buildQueryParams(commonParams); //rebuilt params to change ref
                console.log(queryParams);
                window.open('https://' + domainName + baseUrl(type, memberAreaPreview) + queryParams, '_blank'); //open in new tab
            }else{
                window.location.replace('https://' + domainName + baseUrl(type, memberAreaPreview) + queryParams);
            }
        };
    }
    else if (type=="credit" || type=="credit_ws" || type.includes("ymm")){
        // redirect here
        form = "";
        form = document.createElement("form");
        form.setAttribute("method", "GET");
        form.setAttribute("action", "https://" + domainName + "/vin-check/confirm");
        emailData = form_input("email", "hidden", email);
        form.appendChild(emailData);
        cart_plan = form_input("cart_plan", "hidden", code);
        form.appendChild(cart_plan);
        vin = form_input("vin", "hidden", vin); //vin is credit/ymm
        form.appendChild(vin);
        payment_gateway = form_input("payment_gateway", "hidden", "default");
        phone = form_input("phone", "hidden", phone);
        form.appendChild(phone);
        if (type.includes("ws")){
            var pr_type = form_input('pr_type', 'hidden', 'sticker');
            form.appendChild(pr_type);
        };
        form.appendChild(payment_gateway);
        document.body.appendChild(form);
        let queryParams = buildQueryParams({ref: referenceDomain, offer: sessionStorage.getItem("discount"), refPage: checkPage(url)}, false);
        console.log(form);
        console.log(queryParams);
        // debugger;
        console.log("redirecting...Waiting for preview page to ready");
        if (memberAreaPreview == "cwampv_proxy"){
            window.location = "https://"+ domainName + "/vin-check/confirm?new-data=" + btoa(JSON.stringify(jQuery("form").serializeArray())) + queryParams;
        }else if(memberAreaPreview == "cwampv"){
            window.location = "https://"+ domainName + "/members/confirm?new-data=" + btoa(JSON.stringify(jQuery("form").serializeArray())) + queryParams;
        }
    }
}

function formCollection(type) {
    console.log("formCollection...", type)
    clearErrorText();
	var vinInputValue = document.getElementById('vinInput').value;
    var plateInputValue = document.getElementById('plateInput').value;
	var stateInputValue = document.getElementById('stateList').value;
	var emailInputValue = document.getElementById('emailInput').value;
	var phoneInputValue = document.getElementById('phoneInput').value;
    var btnOriginalText = document.querySelector('.form_submit_btn').textContent;
    var yearValue = document.getElementById('yearList').value;
    var makeValue = document.getElementById('makeList').value;
    var modelValue = document.getElementById('modelList').value;

    var validationStatus = IsEmailAdvanced(emailInputValue); //advanced validate email

    // if using vin check the vin first
    if (vinInputValue.length === 0 && (type === "vhr" || type === "ws")){
        addErrorText(".vin_input", ".errorText_vin", "Por favor ingrese un VIN válido.");
        console.log("Error Vin Empty");
        updateBtnText(btnOriginalText)
        undisable();
    }
    else if (vinInputValue.length < 5  && (type === "vhr" || type === "ws")) {
        addErrorText(".vin_input", ".errorText_vin", "El VIN debe tener por lo menos 5 caracteres.");
        console.log("Error Vin Length");
        updateBtnText(btnOriginalText)
        undisable();
    }
    // else if (vinInputValue.length > 14  && domainName.includes("classicdecoder.com") && (type === "vhr" || type === "ws")) {
    //     addErrorText(".vin_input", ".errorText_vin", "VIN must be fewer than 15 characters long.");
    //     console.log("Error Vin Length");
    //     updateBtnText(btnOriginalText)
    //     undisable();
    // }
    // check email
    else if (validationStatus !== "valid") {
        if (validationStatus === "empty") {
            addErrorText(".email_input", ".errorText_form", "Por favor ingrese un correo electrónico.");
            console.log("Error Email Empty");
        } else if (validationStatus === "missing_at") {
            addErrorText(".email_input", ".errorText_form", "Al correo electrónico le falta el caracter '@'.");
            console.log("Error Missing @");
        } else if (validationStatus === "invalid") {
            addErrorText(".email_input", ".errorText_form", "Por favor ingrese un correo electrónico válido");
            console.log("Error Email Invalid");
        }
        updateBtnText(btnOriginalText);
        undisable();
    }
    // check phone
    else if (phoneInputValue.length !== 0 && (phoneInputValue.length < 8 || phoneInputValue.length > 15)) {
        addErrorText(".phone_input", ".errorText_form", "Por favor ingrese un número de teléfono válido");
        console.log("Error phone_input");
        updateBtnText(btnOriginalText)
        undisable();
    }
    // if lp
    else if (type=="vhr_plate" || type=="ws_plate"){ // the input is plate
        vinInputValue=""; //clear vin data
        if (plateInputValue == '') {
            undisable();
            addErrorText(".plate_input", ".errorText_plate", "Por favor ingrese una matrícula válida");
        }
        else if (plateInputValue.length < 5 || plateInputValue.length > 8){
            undisable();
            addErrorText(".plate_input", ".errorText_plate", "Ingrese un número de matrícula de 5 a 8 dígitos.");
        }
        else if (domainName == 'smartcarcheck.uk') {
            updateBtnText('Por favor espere...')
            // disable();
            clearErrorText();
            redirect(plateInputValue, type, "code", emailInputValue, phoneInputValue);
        }
        else if (stateInputValue == '') {
            undisable();
            addErrorText(".select_state", ".errorText_plate", "Ingrese un Estado válido.");
        }
        else if (plateInputValue !== '' && stateInputValue !== '') {
            console.log("Fetching Plate to VIN...")
            updateBtnText('Por favor espere...')
            disable();
            clearErrorText();
            fetchVinData(stateInputValue, plateInputValue).then(function(vin) {
                if (vin){
                    console.log("success!")
                    console.log('VIN:', vin);
                    // do vin check if necesarry here with other function
                    redirect(vin, type, "code", emailInputValue, phoneInputValue);
                }else{
                    undisable();
                    updateBtnText(btnOriginalText)
                    addErrorText(".lp_input", ".errorText_plate", "Lo sentimos, no pudimos encontrar su registro, por favor verifique la matrícula y vuelva a intentarlo.");
                }
            })
        }
        else {
            undisable();
            addErrorText(".input_container_plate .input_field", ".errorText_plate", "Por favor ingrese un dato válido.");
        }
    }
    // if ymm
    else if (type.includes("ymm")){
        console.log("YMM!");
        updateBtnText('Por favor espere...');
        disable();
        clearErrorText();
        if (yearValue !== "" && makeValue !== "" && modelValue !== "") {
            var vin = yearValue + '_' + makeValue + '_' +  modelValue;
            let code = getYmmCode(type);
            console.log("calling redirect");
            redirect(vin, type, code , emailInputValue, phoneInputValue);
        }
        else{
            clearErrorText();
            if (yearValue === "") {
                addErrorText(".year_select", ".errorText_ymm", "Por favor, introduzca todos los datos.");
            };
            if (makeValue === "") {
                addErrorText(".make_select", ".errorText_ymm", "Por favor, introduzca todos los datos.");
            };
            if (modelValue === "") {
                addErrorText(".model_select", ".errorText_ymm", "Por favor, introduzca todos los datos.");
            };
            console.log("Error errorText_ymm");
            updateBtnText(btnOriginalText)
            undisable();
        }
    }
    else if ((vinInputValue.length === 17 || (vinInputValue.length >= 5 && vinInputValue.length <= 14)) && (type === "vhr" || type === "ws")) {
        updateBtnText('Por favor espere...')
        clearErrorText();
        disable();
        redirect(vinInputValue, type, "code", emailInputValue, phoneInputValue);
    }
    else {
        addErrorText(".vin_input", ".errorText_vin", "Por favor, introduzca un VIN válido.");
        console.log("Error errorText_vin, Invalid VIN length");
        updateBtnText(btnOriginalText);
        undisable();
    }
};

function creditCollection(code){
    console.log("creditCollection...")
    // change button text to loading
    console.log(code)
    clearErrorText();
    var button = document.getElementById('pricingSubmit');
    button.innerText="Por favor espere...";
    button.disabled = true;
    var email = document.getElementById('email_field').value;
    var validationStatus = IsEmailAdvanced(email); //advanced validate email
    console.log("status: ", validationStatus)

    if (validationStatus !== "valid") {
        if (validationStatus === "empty") {
            addErrorText(".email_field", ".errorText_pricing", "Por favor, introduzca un correo electrónico.");
        } else if (validationStatus === "missing_at") {
            addErrorText(".email_field", ".errorText_pricing", "Al correo electrónico le falta el carácter '@'.");
        } else if (validationStatus === "invalid") {
            addErrorText(".email_field", ".errorText_pricing", "Por favor, introduzca un correo electrónico válido.");
        }
        button.innerText = button.getAttribute('aria-label');
        button.disabled = false;
    }
    else if (validationStatus == "valid"){
        if (window.location.hostname === "windowstickerslookup.com") {
            type = "credit_ws";
        } else {
            type = "credit";
        }
        redirect("CREDIT", type, code, email);
    };
}

function listStateData(){
    // const stateList = document.getElementById("stateList");
    const stateLists = document.querySelectorAll(".select_state");
    stateLists.forEach(stateList => {
        if (stateList.children.length <= 1) {
            console.log("add state list");
            const states = [
                { value: "AL", name: "AL - Alabama" },
                { value: "AK", name: "AK - Alaska" },
                { value: "AZ", name: "AZ - Arizona" },
                { value: "AR", name: "AR - Arkansas" },
                { value: "CA", name: "CA - California" },
                { value: "CO", name: "CO - Colorado" },
                { value: "CT", name: "CT - Connecticut" },
                { value: "DE", name: "DE - Delaware" },
                { value: "DC", name: "DC - Washington DC" },
                { value: "FL", name: "FL - Florida" },
                { value: "GA", name: "GA - Georgia" },
                { value: "HI", name: "HI - Hawaii" },
                { value: "ID", name: "ID - Idaho" },
                { value: "IL", name: "IL - Illinois" },
                { value: "IN", name: "IN - Indiana" },
                { value: "IA", name: "IA - Iowa" },
                { value: "KS", name: "KS - Kansas" },
                { value: "KY", name: "KY - Kentucky" },
                { value: "LA", name: "LA - Louisiana" },
                { value: "ME", name: "ME - Maine" },
                { value: "MD", name: "MD - Maryland" },
                { value: "MA", name: "MA - Massachusetts" },
                { value: "MI", name: "MI - Michigan" },
                { value: "MN", name: "MN - Minnesota" },
                { value: "MS", name: "MS - Mississippi" },
                { value: "MO", name: "MO - Missouri" },
                { value: "MT", name: "MT - Montana" },
                { value: "NE", name: "NE - Nebraska" },
                { value: "NV", name: "NV - Nevada" },
                { value: "NH", name: "NH - New Hampshire" },
                { value: "NJ", name: "NJ - New Jersey" },
                { value: "NM", name: "NM - New Mexico" },
                { value: "NY", name: "NY - New York" },
                { value: "NC", name: "NC - North Carolina" },
                { value: "ND", name: "ND - North Dakota" },
                { value: "OH", name: "OH - Ohio" },
                { value: "OK", name: "OK - Oklahoma" },
                { value: "OR", name: "OR - Oregon" },
                { value: "PA", name: "PA - Pennsylvania" },
                { value: "RI", name: "RI - Rhode Island" },
                { value: "SC", name: "SC - South Carolina" },
                { value: "SD", name: "SD - South Dakota" },
                { value: "TN", name: "TN - Tennessee" },
                { value: "TX", name: "TX - Texas" },
                { value: "UT", name: "UT - Utah" },
                { value: "VT", name: "VT - Vermont" },
                { value: "VA", name: "VA - Virginia" },
                { value: "WA", name: "WA - Washington" },
                { value: "WV", name: "WV - West Virginia" },
                { value: "WI", name: "WI - Wisconsin" },
                { value: "WY", name: "WY - Wyoming" }
            ];

            states.forEach(state => {
                const option = document.createElement("option");
                option.value = state.value;
                option.textContent = state.name;
                stateList.appendChild(option);
            });
        }
        else{
            console.log("State list already stored");
        }
    });
}
console.log('site_forms.js done...');