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

// end of licenseplate fetching function

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

function updateIndicator() {
	var inputElement = document.getElementById('vinInput');
	var currentLength = inputElement.value.length;

    document.querySelectorAll('.indicator').forEach(indicator => {
        indicator.textContent = currentLength + ' of 17';
    });
};

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
// Function to export the current URL safely for use in query parameters
function exportCurrentURLAndChannel() {
    // Get the current URL
    const currentURL = window.location.href;

    // Extract the domain and path
    const url = new URL(currentURL);
    const domain = url.hostname;
    let path = url.pathname;

    // Remove the leading and trailing slashes, if present
    path = path.replace(/^\/|\/$/g, '');

    // Map domain to abbreviations
    const domainMap = {
        'autovinlookup.com': 'avl',
        'toyotavindecoder.com': 'tv',
        'www.chassisvin.com': 'cv'
    };

    // Get channel or fallback to the full domain
    const channel = domainMap[domain] || domain.replace(/[.:]/g, '_');

    // Replace invalid characters in the path
    const currentPath = path === '' ? 'homePage' : path.replace(/[/:?&=]/g, '_');

    // Return as an array
    return [channel, currentPath];
}

function redirect(vin, type){
    const currentURLAndChannel = exportCurrentURLAndChannel();

    if (type=="vhr" || type=="vhr_plate"){
        setTimeout(function () {
            window.location.href = 'https://www.clearvin.com/en/payment/prepare/' + vin + '/?a_aid=b3a49a62' + '&chan=' + currentURLAndChannel[0] + '&variation=' + currentURLAndChannel[1] + '&data2=' + currentURLAndChannel[1] + '_2';
        }, 1000); // You can adjust the delay time (in milliseconds) as needed
    }
    else if (type=="ws" || type=="ws_plate"){
        setTimeout(function () {
            window.location.href = 'https://www.clearvin.com/en/window-sticker/checkout/' + vin + '/?a_aid=b3a49a62' + '&chan=' + currentURLAndChannel[0] + '&variation=' + currentURLAndChannel[1] + '&data2=' + currentURLAndChannel[1] + '_2';
        }, 1000); // You can adjust the delay time (in milliseconds) as needed
    }
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
    document.querySelectorAll('#vinForm button').forEach(btnText => {
        btnText.textContent = text;
    })
}

function formCollection(type) {
    console.log("formCollection...")
    clearErrorText();
	var vinInputValue = document.getElementById('vinInput').value;
    var plateInputValue = document.getElementById('plateInput').value;
	var stateInputValue = document.getElementById('state-list').value;
    var btnOriginalText = document.querySelector('#vinForm button').textContent;
    
    // fetch LP
    if (type=="vhr_plate" || type=="ws_plate"){ // the input is plate
        vinInputValue=""; //clear vin data
        updateBtnText('Please Wait...')
        disable ('#vinForm button', '.vin_input', '.plate_input', '.select_state');
        if (plateInputValue !== '' && stateInputValue !== '') {
            console.log("Fetching Plate to VIN...")
            clearErrorText();
            fetchVinData(stateInputValue, plateInputValue).then(function(vin) {
                if (vin){
                    console.log("success!")
                    console.log('VIN:', vin);
                    // do vin check if necesarry here with other function
                    redirect(vin, type);
                }else{
                    undisable ('#vinForm button', '.vin_input', '.plate_input', '.select_state');
                    updateBtnText(btnOriginalText)
                    addErrorText(".errorText_plate", "Sorry, we couldn't find your record, Please check the License Plate and try again.");
                }
            })
        }     
        else {
            addErrorText(".errorText_plate", "Please enter all fields before submitting.");
            updateBtnText(btnOriginalText)
            undisable ('#vinForm button', '.vin_input', '.plate_input', '.select_state');
        };
    }
	else if (vinInputValue.length === 17) { //vin
        updateBtnText('Please Wait...')
        clearErrorText();
        disable ('#vinForm button', '.vin_input', '.plate_input', '.select_state');
        redirect(vinInputValue, type);
	} else {
        addErrorText(".errorText_vin", "Please enter a VIN of 17 characters.");
        console.log("Error errorText_vin");
        updateBtnText(btnOriginalText)
        undisable ('#vinForm button', '.vin_input', '.plate_input', '.select_state');
	}
};

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

function handleToggleClick(buttonSelector, containerSelector, buttonFunction) {
    removeTogglingClass();

    // Add 'search_by_toggle_active' class to clicked button
    document.querySelectorAll(buttonSelector).forEach(button => {
        button.classList.add('search_by_toggle_active');
    });

    // Add 'input_container_active' class to associated container
    document.querySelectorAll(containerSelector).forEach(container =>{
        container.classList.add('input_container_active');
    });

    // Change OnClick function
    document.querySelectorAll(".main-form-btn").forEach(button => {
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

// select state color change
function updateColor() {
    document.querySelectorAll('.select_state').forEach(element => {
        element.classList.add("option-selected");
    });
}

console.log("AVL forms js work!")