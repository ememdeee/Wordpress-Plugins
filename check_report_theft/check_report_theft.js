window.onload = function() {
    updateCharacterCount('items', 'items-indicator');
    updateCharacterCount('theft-details', 'theft-details-indicator');
    console.log("Page fully loaded, including all assets!");

    showReportTheftData();
};

function checkTheftByVin() {
    clearError();
    localStorage.removeItem('stolenData');
    const button = document.getElementById("checkVin");
    const noData = document.getElementById("no_data");
    const vin = document.getElementById('vin-input');
    
    const vin_value = document.getElementById('vin-input').value;
    if (vin_value.length < 17) {
        noData.classList.add("none");
        errorMassage('vin-input', 'VIN must be at least 17 characters long.');
        return; // Stop execution
    }

    button.innerHTML = "Please Wait...";
    button.disabled = true;
    vin.disabled = true;

    noData.classList.add("none");

    const url = `https://app.developtestsite.com/api-cwa/theft-check?vin=${vin_value}`;
    const headers = {
    "x-AuthKey": "c6Jpyu8cWX4V3WoyLwFp"
    };

    console.log("Checking API...");
    // Make the GET request using fetch
    fetch(url, {
        method: "GET",
        headers: headers
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
    })
    .then(data => {
        console.log("Full response data:", data); // Log the full response data to the console

        // check title data availability
        if (data.data.title_check && Object.keys(data.data.title_check).length > 0) {
            const titleCheck = data.data.title_check;
            console.log("Title check data available:", titleCheck);
            localStorage.setItem('titleCheck', JSON.stringify(titleCheck));
            // debugger;
        } else {
            console.log("Title check data not available.");
        };

        // Check if stolen_data has data
        if (data.data.stolen_data && Object.keys(data.data.stolen_data).length > 0) {
            const stolenData = data.data.stolen_data;
            console.log("Stolen data available:", stolenData);
            localStorage.setItem('stolenData', JSON.stringify(stolenData));
            // debugger;
            history.pushState(null, null, window.location.href);
            window.location.href = '/stolen-status/';
        } else {
            console.log("Stolen data not available.");
            button.innerHTML = button.getAttribute("aria-label");
            button.disabled = false;
            vin.disabled = false;
            noData.classList.remove("none");
        };
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    });
}

async function reportThefData() {
    clearError();
    const button = document.getElementById("submitData");
    const reportStatus = document.getElementById("reportStatus");
    const formData = new FormData();

    const vin = document.getElementById('vin').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const stolenDate = document.getElementById('stolenDate').value;
    const stolenLocation = document.getElementById('stolenLocation').value;
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const address = document.getElementById('address').value;
    const theftDetails = document.getElementById('theft-details').value;

    const importantFields = [
        { id: 'vin', value: vin, message: 'VIN must be at least 17 characters long.', condition: vin.length < 17 },
        { id: 'email', value: email, message: 'Email is missing.', condition: email.length < 1 },
        { id: 'phone', value: phone, message: '', condition: false },
        { id: 'stolenDate', value: stolenDate, message: 'Stolen date is missing.', condition: stolenDate.length < 1 },
        { id: 'stolenLocation', value: stolenLocation, message: 'Location is missing.', condition: stolenLocation.length < 1 },
        { id: 'city', value: city, message: 'City is missing.', condition: city.length < 1 },
        { id: 'state', value: state, message: 'State is missing.', condition: state.length < 1 },
        { id: 'address', value: address, message: 'Address is missing.', condition: address.length < 1 },
        { id: 'year', value: year, message: 'Vehicle year is missing.', condition: year.length < 1 },
        { id: 'make', value: make, message: 'Vehicle make is missing.', condition: make.length < 1 },
        { id: 'model', value: model, message: 'Vehicle model is missing.', condition: model.length < 1 },
        { id: 'theft-details', value: theftDetails, message: 'Theft details are missing.', condition: theftDetails.length < 1 }
    ];
    
    for (let field of importantFields) {
        if (field.condition) {
            errorMassage(field.id, field.message);
            return; // Stop execution if a required field is not valid
        }
        else if (field.id === 'email') { // Special validation for email
            var validationStatus = IsEmail(field.value); // Validate email
            if (validationStatus === "empty") {
                errorMassage(field.id, "Email is required.");
                return;
            } else if (validationStatus === "missing_at") {
                errorMassage(field.id, "Email is missing the '@' character.");
                return;
            } else if (validationStatus === "invalid") {
                errorMassage(field.id, "Please enter a valid email.");
                return;
            }
        }
        else if (field.id === 'phone') { // Special validation for phone
            if (phone.length !== 0 && (phone.length < 8 || phone.length > 15)) {
                errorMassage(field.id, 'Please enter a valid Phone Number (8-15 digits).');
                return;
            }
        }
    }

    console.log("All important data filled!");

    formData.append('vin', vin);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('reportedAsStolen', "Yes"); // Default value
    formData.append('stolenLocation', stolenLocation);
    formData.append('stolenDate', stolenDate);
    formData.append('vehicle_make', make);
    formData.append('vehicle_model', model);
    formData.append('vehicle_year', year);
    formData.append('plate_number', document.getElementById('plate').value);
    formData.append('vehicle_color', document.getElementById('color').value);
    formData.append('state', state);
    formData.append('address', address);
    formData.append('theft_details', theftDetails);
    formData.append('police_command', "");
    formData.append('items_with_vehicle', document.getElementById('items').value);

    // for file input need special attention
    var fileInput = document.getElementById('policeReport');
    formData.append('file', fileInput.files[0]);
    if (fileInput.files.length > 0) {
        formData.append('attachedPoliceRpt', "Yes");
    } else {
        formData.append('attachedPoliceRpt', "No");
    }

    console.log(formData);

    button.innerHTML = "Please Wait...";
    button.disabled = true;

    console.log("Posting data");
    
    try {
        const response = await fetch('https://app.developtestsite.com/landing/report-stolen-vehicle', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        // Check the status of the response
        if (response.ok && result.status === 'success') {
            reportStatus.innerHTML = result.message; // Display the message from the response
            reportStatus.style.color = "#4CAF50"; // Green color for success
            
            // Remove all data from the fields
            const inputFields = document.querySelectorAll('.theft_form .input-field');
            inputFields.forEach(input => {
                if (input.type === 'file') {
                    input.value = '';
                } else {
                    input.value = '';
                }
            });
        } else {
            reportStatus.innerHTML = result.message || "Submission Failed!";
            reportStatus.style.color = "#f44336"; // Red color for failure
        }
        reportStatus.classList.remove("none");
        button.innerHTML = button.getAttribute("aria-label");
        button.disabled = false;
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit the form.');
    }
}

function showReportTheftData() {
    const titleCheck = JSON.parse(localStorage.getItem('titleCheck'));
    const stolenData = JSON.parse(localStorage.getItem('stolenData'));
    const no_data = document.getElementById('no_data');
    const report_theft_form = document.getElementById("report_theft_form");

    if (no_data && report_theft_form) {
        if (titleCheck){
            console.log("titleCheck Local Storage found!");
            console.log(titleCheck);
            document.getElementById('location').value = titleCheck.location || '';
            document.getElementById('database').value = titleCheck.database || '';
            document.getElementById('date').value = titleCheck.date || '';
        };
        if (stolenData){
            console.log("stolenData Local Storage found!");
            console.log(stolenData);
            document.getElementById('vin').value = stolenData.vin || '';
            document.getElementById('plate').value = stolenData.plate_number || '';
            document.getElementById('email').value = stolenData.email || '';
            document.getElementById('phone').value = stolenData.phone || '';
            document.getElementById('stolenDate').value = stolenData.stolenDate || '';
            document.getElementById('stolenLocation').value = stolenData.stolenLocation || stolenData.region || '';
            document.getElementById('city').value = stolenData.city || '';
            document.getElementById('state').value = stolenData.state || '';
            document.getElementById('address').value = stolenData.address || '';
            document.getElementById('year').value = stolenData.vehicle_year || '';
            document.getElementById('make').value = stolenData.vehicle_make || '';
            document.getElementById('model').value = stolenData.vehicle_model || '';
            document.getElementById('color').value = stolenData.vehicle_color || '';
            document.getElementById('items').value = stolenData.items_with_vehicle || '';
            document.getElementById('theft-details').value = stolenData.theft_details || '';
            document.getElementById('attachedPoliceRpt').innerHTML = stolenData.attachedPoliceRpt || 'No';
            document.getElementById('policeReport').href = stolenData.policeReport || '';
            document.getElementById('items-indicator').textContent = `${(stolenData.items_with_vehicle || '').length}/300`;
            document.getElementById('theft-details-indicator').textContent = `${(stolenData.theft_details || '').length}/300`;
        };

        // remove download attatch button if no link
        if (stolenData.policeReport.length == 0){
            console.log("No attatched data link!");
            document.getElementById('policeReport').classList.add("none");
            document.getElementById('attachedPoliceRpt').innerHTML = 'No';
        };

        // remove data that empty
        var inputFields = document.querySelectorAll('.input-field');

        inputFields.forEach(function (input) {
          if (input.value=="") {
            var label = document.querySelector('label[for="' + input.id + '"]');
            var container = document.querySelector('div[for="' + input.id + '"]');
            
            if (label) {
                label.remove();
            };
            if (container) {
                container.remove();
            };
            input.remove();
          }
        });

        report_theft_form.classList.remove("none");
        no_data.classList.add("none");
    }
    else {
        if(no_data){
            no_data.innerHTML= "No Data Found";
            console.log("Local Storage not found! or not in the result page!");
        }
    }
}

function errorMassage(id, message) {
    const element = document.getElementById(id);
    const reportStatus = document.getElementById("reportStatus");

    element.classList.add("errorField");

    reportStatus.innerHTML = message;
    reportStatus.style.color = "#f44336"; // Red color for error
    reportStatus.classList.remove("none");
    console.error(message);
}

function clearError() {
    const reportStatus = document.getElementById("reportStatus");
    const errorFields = document.querySelectorAll('.errorField');
    errorFields.forEach(element => element.classList.remove('errorField'));
    
    // Hide the reportStatus element
    reportStatus.classList.add("none");
}

function updateCharacterCount(textareaId, indicatorId) {
    const textarea = document.getElementById(textareaId);
    const indicator = document.getElementById(indicatorId);

    // Check if both the textarea and indicator exist
    if (textarea && indicator) {
        const maxLength = textarea.getAttribute('maxlength');

        textarea.addEventListener('input', () => {
            const currentLength = textarea.value.length;
            indicator.textContent = `${currentLength}/${maxLength}`;
        });

        // Trigger the input event once to initialize the indicator
        textarea.dispatchEvent(new Event('input'));
    }
}

function toUpperCaseTheft(element) {
    element.value = element.value.toUpperCase();
};

function IsEmail(email) {
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

console.log("Check and Report forms js work!");