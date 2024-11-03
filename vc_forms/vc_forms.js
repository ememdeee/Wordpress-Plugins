jQuery(document).ready(function($) {
    // Access the domainName and memberAreaPreview variables from plugin admin page
    domainName = vc_forms_vars.domainName;
    memberAreaPreview = vc_forms_vars.memberAreaPreview;

    // Now you can use domainName and memberAreaPreview variables as needed in your JavaScript code
    console.log("Domain Name:", domainName);
    console.log("Member Area Preview:", memberAreaPreview);
});


// Function to disable input fields
function disable() {
    for (var i = 0; i < arguments.length; i++) {
        var elementClass = arguments[i];
        document.querySelectorAll(elementClass).forEach(element =>{
            element.setAttribute('disabled', true);
        })
        
    }
}

// Function to enable input fields
function undisable() {
    for (var i = 0; i < arguments.length; i++) {
        var elementClass = arguments[i];
        document.querySelectorAll(elementClass).forEach(element =>{
            element.removeAttribute('disabled');
        })
        
    }
}


function toUpperCase() {
	var inputElement = document.getElementById('vinInput');
	inputElement.value = inputElement.value.toUpperCase();
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
    document.querySelectorAll(".errorText_vin").forEach(errorText => {
        errorText.textContent = '';
    });
    document.querySelectorAll(".errorText_plate").forEach(errorText => {
        errorText.textContent = '';
    });
}

function addErrorText(elementClass, text){
    document.querySelectorAll(elementClass).forEach(errorText =>{
        errorText.textContent = text;
    });
}

function updateBtnText(text){
    document.querySelectorAll('.form_submit_btn').forEach(btnText => {
        btnText.textContent = text;
    })
}

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email) || email == "") {
        return false;
    } else {
        return true;
    }
}
function isValidVin(vin) {
    // VIN is valid if it's 17 characters long (could be alphanumeric)
    if (vin.length === 17) {
        return true;
    };
    // VIN is also valid if it's between 5 and 14 characters long and numeric
    // if (vin.length >= 5 && vin.length <= 14) {
    //     return true;
    // };
    // Otherwise, it's invalid
    return false;
}
function form_input(name, type, value) {
    input = document.createElement('input');
    input.setAttribute('name', name);
    input.setAttribute('type', type);
    input.setAttribute('value', value);
    return input;
}

function redirect(vin, type, code="code", email="", phone=""){
    let state = '';let title = '';
    let url = window.location.href;
    history.pushState(state, title, url);

    if (type=="vhr"){
        if (memberAreaPreview == "cwampv_proxy") {
            window.location.replace('https://' + domainName + "/vin-check/preview?vin=" + vin + "&email=" + email + "&mobile=" + phone);
        } 
        else if (memberAreaPreview == "cwampv") {
            window.location.replace('https://' + domainName + "/members/preview?vin=" + vin + "&email=" + email + "&mobile=" + phone);
        }
    }
    else if (type=="ws"){
        if (memberAreaPreview == "cwampv_proxy") {
            window.location.replace('https://' + domainName + "/vin-check/ws-preview?vin=" + vin + "&email=" + email + "&mobile=" + phone);
        } 
        else if (memberAreaPreview == "cwampv") {
            window.location.replace('https://' + domainName + "/members/ws-preview?vin=" + vin + "&email=" + email + "&mobile=" + phone);
        }
    }
    else if (type=="credit"){
        // redirect here
        form = "";
        form = document.createElement("form");
        form.setAttribute("method", "GET");
        form.setAttribute("action", "https://" + domainName + "/vin-check/confirm");
        emailData = form_input("email", "hidden", vin); //vin is email
        form.appendChild(emailData);
        cart_plan = form_input("cart_plan", "hidden", code);
        form.appendChild(cart_plan);
        vin = form_input("vin", "hidden", vin); //vin is credit
        form.appendChild(vin);
        payment_gateway = form_input("payment_gateway", "hidden", "default");
        form.appendChild(payment_gateway);
        console.log(form);
        // debugger;
        document.body.appendChild(form);
        if (memberAreaPreview == "cwampv_proxy"){
            window.location = "https://"+ domainName + "/vin-check/confirm?new-data=" + btoa(JSON.stringify(jQuery("form").serializeArray()));
        }else if(memberAreaPreview == "cwampv"){
            window.location = "https://"+ domainName + "/members/confirm?new-data=" + btoa(JSON.stringify(jQuery("form").serializeArray()));
        }
    }
}

function formCollection(type) {
    console.log("formCollection...")
    clearErrorText();
	var vinInputValue = document.getElementById('vinInput').value;
	var emailInputValue = document.getElementById('emailInput').value;
	var phoneInputValue = document.getElementById('phoneInput').value;
    var btnOriginalText = document.querySelector('.form_submit_btn').textContent;
    
    if (!isValidVin(vinInputValue)){
        addErrorText(".errorText_vin", "Please enter a valid Chassis.");
        console.log("Error errorText_vin");
        updateBtnText(btnOriginalText)
        undisable ('.form_submit_btn', '.vin_input', '.phone_input', '.email_input');
    }
    else if (!IsEmail(emailInputValue)){
        addErrorText(".errorText_vin", "Please enter a valid Email.");
        console.log("Error errorText_vin");
        updateBtnText(btnOriginalText)
        undisable ('.form_submit_btn', '.vin_input', '.phone_input', '.email_input');
    }
    else if (phoneInputValue.length !== 0 && (phoneInputValue.length < 8 || phoneInputValue.length > 15)) {
        addErrorText(".errorText_vin", "Please enter a valid Phone Number.");
        console.log("Error errorText_vin");
        updateBtnText(btnOriginalText)
        undisable ('.form_submit_btn', '.vin_input', '.phone_input', '.email_input');
    }
    else if (isValidVin(vinInputValue)) {
        updateBtnText('Please Wait...')
        clearErrorText();
        disable ('.form_submit_btn', '.vin_input', '.phone_input', '.email_input');
        redirect(vinInputValue, type, "code", emailInputValue, phoneInputValue);
    } 
    else {
        addErrorText(".errorText_vin", "Something Wrong...");
        console.log("Error errorText_vin");
        updateBtnText(btnOriginalText)
        undisable ('.form_submit_btn', '.vin_input', '.phone_input', '.email_input');
	}
};

function creditCollection(code){
    console.log("creditCollection...")
    // change button text to loading
    console.log(code)
    var button = document.getElementById('pricingSubmit');
    var errorText = document.getElementById('errorText_pricing');
    button.innerText="Please Wait...";
    errorText.innerText="";
    var email = document.getElementById('email_field').value;
    if (IsEmail(email)){
        redirect ("CREDIT", "credit", code, email);
    }else{
        errorText.innerText="Please Enter Valid Email";
        button.innerText = button.getAttribute('aria-label');
    }
}

console.log("vc forms js work!")