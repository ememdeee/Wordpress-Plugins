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

function homeCollection() {
	var submitButton = document.querySelector('#vinForm button'); var originalText = submitButton.textContent;
	var vinInput = document.getElementById('vinInput'); var vinInputValue = document.getElementById('vinInput').value;
	var errorText = document.getElementById('errorText'); errorText.textContent = '';

	if (vinInputValue.length === 17) {
		submitButton.textContent = 'Please Wait...';
        disable (submitButton, vinInput);
		setTimeout(function () {
			window.location.href = 'https://www.clearvin.com/en/payment/prepare/' + vinInputValue + '/?a_aid=b3a49a62';
		}, 1000); // You can adjust the delay time (in milliseconds) as needed
	} else {
		errorText.textContent = 'Please enter a VIN of 17 characters.';
        submitButton.textContent = originalText;
        undisable (submitButton, vinInput);
	}
};
function homeCollection_plate() {
    var submitButton = document.querySelector('#vinForm button'); var originalText = submitButton.textContent;
	var plateInput = document.getElementById('plateInput'); var plateInputValue = document.getElementById('plateInput').value;
	var stateInput = document.getElementById('state-list'); var stateInputValue = document.getElementById('state-list').value;
	var errorText = document.getElementById('errorText_plate'); errorText.textContent = '';
    if (plateInputValue != "" & stateInputValue != ""){
        // console.log("yeay!");
        submitButton.textContent = 'Please Wait...';
        disable (submitButton, plateInput, stateInput);
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
            success: function (response) {
                var { vin } = JSON.parse(response);
                if (vin){
                    setTimeout(function () {
                        window.location.href = 'https://www.clearvin.com/en/payment/prepare/' + vin + '/?a_aid=b3a49a62';
                    }, 1000); // You can adjust the delay time (in milliseconds) as needed
                }else{
                    errorText.textContent = "Sorry, we couldn't find your record, Please check the License Plate and try again.";
                    submitButton.textContent = originalText;
                    undisable (submitButton, plateInput, stateInput);
                }
            },
            error: function (error) {
              // Logging any errors to the console
              console.error('Error API:', error);
              errorText.textContent = 'Oops! Something went wrong on our end.';
              submitButton.textContent = originalText;
              undisable (submitButton, plateInput, stateInput);
            }
          });
    }
    else{
        errorText.textContent = 'Please enter all fields before submitting.';
    }
    console.log("Please Wait...");
};

function windowSticker() {
	var submitButton = document.querySelector('button');
	var vinInputValue = document.getElementById('vinInput').value;
	var errorText = document.getElementById('errorText');

	if (vinInputValue.length === 17) {
		submitButton.textContent = 'Please Wait';
		setTimeout(function () {
			window.location.href = 'https://www.clearvin.com/en/window-sticker/checkout/' + vinInputValue + '/?a_aid=b3a49a62';
		}, 1000); // You can adjust the delay time (in milliseconds) as needed
	} else {
		errorText.textContent = 'Please enter a VIN of 17 characters.';
	}
};

function windowSticker_plate() {
    window.location.href = 'https://www.google.com';
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
    button.onclick = window[buttonFunction];
};

function searchByVinClicked(functionName) {
    handleToggleClick('.search_by_vin', '.input_container_vin', functionName);
};

function searchByPlateClicked(functionName) {
    var modifiedFunctionName = functionName + '_plate';
    handleToggleClick('.search_by_plate', '.input_container_plate', modifiedFunctionName);
};

// select state color change
function updateColor() {
	var selectElement = document.getElementById("state-list");
	var isSelected = selectElement.options[selectElement.selectedIndex].value !== "";
	selectElement.classList.add("option-selected");
}

console.log("AVL forms js work!")