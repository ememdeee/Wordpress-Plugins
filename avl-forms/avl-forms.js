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
        var element = arguments[i];
        if (element && typeof element === 'object') {
        element.setAttribute('disabled', true);
        }
    }
}
  
// Function to enable input fields
function undisable() {
    for (var i = 0; i < arguments.length; i++) {
        var element = arguments[i];
        if (element && typeof element === 'object') {
        element.removeAttribute('disabled');
        }
    }
}

function updateIndicator() {
	var inputElement = document.getElementById('vinInput');
	var indicatorElement = document.getElementById('indicator');

	var currentLength = inputElement.value.length;
	indicatorElement.textContent = currentLength + ' of 17';
};

function toUpperCase() {
	var inputElement = document.getElementById('vinInput');
	inputElement.value = inputElement.value.toUpperCase();
};

function redirect(vin, type){
    if (type=="vhr" || type=="vhr_plate"){
        setTimeout(function () {
            window.location.href = 'https://www.clearvin.com/en/payment/prepare/' + vin + '/?a_aid=b3a49a62';
        }, 1000); // You can adjust the delay time (in milliseconds) as needed
    }
    else if (type=="ws" || type=="ws_plate"){
        setTimeout(function () {
            window.location.href = 'https://www.clearvin.com/en/window-sticker/checkout/' + vin + '/?a_aid=b3a49a62';
        }, 1000); // You can adjust the delay time (in milliseconds) as needed
    }
}

function formCollection(type) {
    console.log("formCollection...")
    // get vin data
	var vinInput = document.getElementById('vinInput'); var vinInputValue = document.getElementById('vinInput').value;
	var errorText = document.getElementById('errorText'); errorText.textContent = '';
    // plate data
    var plateInput = document.getElementById('plateInput'); var plateInputValue = document.getElementById('plateInput').value;
	var stateInput = document.getElementById('state-list'); var stateInputValue = document.getElementById('state-list').value;
	var errorText_plate = document.getElementById('errorText_plate'); errorText_plate.textContent = '';
	var submitButton = document.querySelector('#vinForm button'); var originalText = submitButton.textContent;
    
    // fetch LP
    if (type=="vhr_plate" || type=="ws_plate"){ // the input is plate
        vinInputValue=""; //clear vin data
        submitButton.textContent = 'Please Wait...';
        disable (submitButton, vinInput, plateInput, stateInput);
        if (plateInputValue !== '' && stateInputValue !== '') {
            console.log("Fetching Plate to VIN...")
            errorText_plate.textContent = '';
            fetchVinData(stateInputValue, plateInputValue).then(function(vin) {
                if (vin){
                    console.log("success!")
                    console.log('VIN:', vin);
                    // do vin check if necesarry here with other function
                    redirect(vin, type);
                }else{
                    undisable (submitButton, vinInput, plateInput, stateInput);
                    submitButton.textContent = originalText;
                    errorText_plate.textContent = "Sorry, we couldn't find your record, Please check the License Plate and try again.";
                }
            })
        }     
        else {
            errorText_plate.textContent = 'Please enter all fields before submitting.';
            submitButton.textContent = originalText;
            undisable (submitButton, vinInput, plateInput, stateInput);
        };
    }
	else if (vinInputValue.length === 17) { //vin
        submitButton.textContent = 'Please Wait...';
        errorText.textContent = '';
        disable (submitButton, vinInput, plateInput, stateInput);
        redirect(vinInputValue, type);
	} else {
		errorText.textContent = 'Please enter a VIN of 17 characters.';
        submitButton.textContent = originalText;
        undisable (submitButton, vinInput, plateInput, stateInput);
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
    document.querySelector(buttonSelector).classList.add('search_by_toggle_active');

    // Add 'input_container_active' class to associated container
    document.querySelector(containerSelector).classList.add('input_container_active');

    const button = document.querySelector('#vinForm button');
    button.removeAttribute('onclick');
    button.setAttribute("onclick", "formCollection('" + buttonFunction + "')");
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
	var selectElement = document.getElementById("state-list");
	var isSelected = selectElement.options[selectElement.selectedIndex].value !== "";
	selectElement.classList.add("option-selected");
}

console.log("AVL forms js work!")