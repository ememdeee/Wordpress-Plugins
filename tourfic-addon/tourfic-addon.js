console.log("Hello!!");

// add event listener
document.addEventListener("DOMContentLoaded", function() {
    // Ensure the DOM is fully loaded before attaching the event listener
    var button = document.getElementById("bookingFormSubmit");
    if (button) {
        button.addEventListener("click", bookingFormSubmit);
    }

    anchorToForm();
    // event listener to do anchor
    const buttons = document.querySelectorAll('.anchorToForm');
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            anchorToForm(false);
        });
    });

    // event listener to create custom total pricing in tour page
    const incElements = document.querySelectorAll('.tourfic-addon-tour .acr-inc');
    const decElements = document.querySelectorAll('.tourfic-addon-tour .acr-dec');
    incElements.forEach(element => {
      element.addEventListener('click', () => {
        delayedCheckTourUser();
      });
    });
    decElements.forEach(element => {
      element.addEventListener('click', () => {
        delayedCheckTourUser();
      });
    });
});

function anchorToForm(session=true) {
    console.log("hellow");
    // Check if the user was redirected from search result
    if (sessionStorage.getItem('searchResult') === 'true' || session == false) {
        console.log("Redirected from the Search Result");
        sessionStorage.removeItem('searchResult');

        const booking = document.getElementById("book");
        if (booking) {
            const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
            const offset = isMobile ? 200 : 200; // 20px for mobile, 200px for desktop
            const elementPosition = booking.getBoundingClientRect().top + window.pageYOffset;
            
            document.querySelector('.elementor-field-group-bookingName').classList.add('error_field');

            // Scroll to the position minus the offset
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
            notifBanner("Fill in your details to complete your booking!", "#e2272a80");
        }else{
            window.location.href = "/booking/";
        }
    }
}

function clearErrorText(){
    document.querySelector(".errorText_form").textContent = "";
    document.querySelector(".errorText_form").style.display ="none"
    document.querySelector(".error_field")?.classList.remove("error_field");
}

function addErrorText(errorFieldClass, text){
    document.querySelector(".errorText_form").textContent = text;
    document.querySelector(".errorText_form").style.display ="block"
    document.querySelector(errorFieldClass).classList.add("error_field");
}

function IsEmailAdvanced(email) {
    if (email.trim() === "") {
        return "Need Email!";
    };
    if (!email.includes("@")) {
        return "Missing '@'";
    };

    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    if (!regex.test(email)) {
        return "Email Not Valid!";
    };
    
    return "valid";
}

function updateData(){
    console.log("Update!!");
    clearErrorText();
    villaName = document.getElementById('form-field-bookingVilla').value;
    fullName = document.getElementById('form-field-bookingName').value;
    email = document.getElementById('form-field-bookingEmail').value;
    phone = document.getElementById('form-field-bookingPhone').value;
    tourficPrice = document.querySelector('.customPricing.villa .real .woocommerce-Price-amount.amount')?.innerText || `Child= ${document.querySelector('.child .woocommerce-Price-amount')?.innerText || "N/A"} Adult= ${document.querySelector('.adult .woocommerce-Price-amount')?.innerText || "N/A"}`;
    tourficTotalPrice = document.querySelector('.total-price .woocommerce-Price-amount')?.innerText || document.getElementById('totalPrice')?.innerText || tourficPrice;
    tourficCheckInOut = document.getElementById("check-in-out-date").value;
    tourficGuest = document.querySelector('.tf-apartment-guest-row .tf_input-inner')?.innerText.replace(/\n/g, ' ') || `Child = ${document.getElementById("children")?.value || "N/A"} Adult = ${document.getElementById("adults")?.value || "N/A"}`;
    tourficMessage = document.getElementById("form-field-bookingMessage-clone").value;

    if (fullName==undefined || fullName ==''){
        console.log("Input Full Name!");
        addErrorText(".elementor-field-group-bookingName", "Need Full Name!")
        return false;
    }
    else if (IsEmailAdvanced(email) != 'valid'){
        console.log(IsEmailAdvanced(email));
        addErrorText(".elementor-field-group-bookingEmail", IsEmailAdvanced(email))
        return false;
    }
    else if (phone==undefined || phone ==''){
        console.log("Input Phone!");
        addErrorText(".elementor-field-group-bookingPhone", "Need Phone!")
        return false;
    }
    else if (phone.length < 8 || phone.length > 15){
        console.log("Input Valid Phone!");
        addErrorText(".elementor-field-group-bookingPhone", "Need Valid Phone!")
        return false;
    }
    else if (tourficCheckInOut==undefined || tourficCheckInOut ==''){
        console.log("Input Date!");
        addErrorText(".tours-check-in-out.input", "Need Date!")
        return false;
    }
    else if (document.getElementById("adults").value && document.getElementById("adults").value == 0){
        console.log("Adults Minimum 1!");
        addErrorText(".tf-booking-form .tf-booking-person .tf-field", "Adults Minimum 1!")
        return false;
    }
    else{
        document.getElementById("form-field-bookingPrice").value = tourficPrice;
        document.getElementById("form-field-bookingTotalPrice").value = tourficTotalPrice;
        document.getElementById("form-field-bookingInOut").value = tourficCheckInOut;
        document.getElementById("form-field-bookingGuest").value = tourficGuest;
        document.getElementById("form-field-bookingMessage").value = tourficMessage;

        // Save data to local
        const bookingData = {
            villaName: villaName,
            fullName: fullName,
            email: email,
            phone: phone,
            Price: tourficPrice,
            totalPrice: tourficTotalPrice,
            checkInOut: tourficCheckInOut,
            guest: tourficGuest,
            message: tourficMessage
        };
        localStorage.setItem('bookingData', JSON.stringify(bookingData));
        console.log("All Data submited, redirecting...");
        const apartmentBooking = document.getElementById('tf-apartment-booking');
        if (apartmentBooking) {
            apartmentBooking.style.pointerEvents = 'none';
        }

        const tourBookingBox = document.querySelector(".tourfic-addon-tour .tf-tour-booking-box");
        if (tourBookingBox) {
            tourBookingBox.style.pointerEvents = 'none';
        }
        document.getElementById('bookingFormSubmit').textContent = 'Please wait...';
        return true;
    }
}
function bookingFormSubmit(){
    console.log("bookingFormSubmit");
    var elementorFormButton = document.getElementById('bookingSubmit');

    if (updateData()){
        elementorFormButton.click();
        setTimeout(function() { //redirect
            window.location.href = "/booking-confirmation/";
        }, 3000);
    }
    else{
        console.log("Error");
    }
}

function searchFormSubmit() {
    console.log("Search Form Submit!");
    let villa = document.getElementById("tf-apartment-location").value;
    let form = document.getElementById("tf_apartment_booking");
    console.log(villa);

    if (villa.includes("4 Bedroom")) {
        sessionStorage.setItem('searchResult', 'true');
        form.action = "https://sarayahphuketvillas.com/4-bedroom-villa/";
        console.log("redirect 4 bedroom");
    } else if (villa.includes("Private Pool")) {
        sessionStorage.setItem('searchResult', 'true');
        form.action = "https://sarayahphuketvillas.com/private-pool-villa/";
        console.log("redirect Private Pool");
    }
}

function searchFormSubmitNew(villa) {
    console.log("Dropdown Submit!");
    console.log(villa);

    if (villa.includes("4 Bedroom")) {
        sessionStorage.setItem('searchResult', 'true');
        console.log("redirect 4 bedroom");
        window.location.href = '/4-bedroom-villa/';
    } else if (villa.includes("Private Pool")) {
        sessionStorage.setItem('searchResult', 'true');
        console.log("redirect Private Pool");
        window.location.href = '/private-pool-villa/';
    }
}

// Custom Total Price - Espescially Tour Page
function checkTourUser(){
    const adultsInput = document.getElementById('adults');
    const childrenInput = document.getElementById('children');
    const adaultTotalPrice = document.getElementById('adaultTotalPrice');
    const childTotalPrice = document.getElementById('childTotalPrice');
    const customTotalPrice = document.querySelector('.customTotalPrice');
    const adaultRow = document.querySelector('.customTotalPrice .adault');
    const childRow = document.querySelector('.customTotalPrice .child');

    adultValue = adultsInput.value;
    childValue = childrenInput.value;

    console.log(adultValue);
    console.log(childValue);

    if (adultValue != 0) {
        adaultRow.classList.remove('hide');

        const adaultPriceElement = document.querySelector('.customPricing .pricingData.adult .woocommerce-Price-amount.amount');
        const adaultPriceText = adaultPriceElement.textContent || adaultPriceElement.innerText;
        const adaultPriceNumber = parseInt(adaultPriceText.replace(/฿|,/g, ''));
        
        const totalAdultPrice = adaultPriceNumber * adultValue;
        adaultTotalPrice.innerText = `฿${new Intl.NumberFormat('en-US').format(totalAdultPrice)}.00`; // Formats the total price
    } else {
        adaultRow.classList.add('hide');
    };

    if (childValue != 0) {
        childRow.classList.remove('hide');
        
        const childPriceElement = document.querySelector('.customPricing .pricingData.child .woocommerce-Price-amount.amount');
        const childPriceText = childPriceElement.textContent || childPriceElement.innerText;
        const childPriceNumber = parseInt(childPriceText.replace(/฿|,/g, ''));
        
        const totalChildPrice = childPriceNumber * childValue;
        childTotalPrice.innerText = `฿${new Intl.NumberFormat('en-US').format(totalChildPrice)}.00`; // Formats the total price
    } else {
        childRow.classList.add('hide');
    };

    if (adultValue != 0 || childValue != 0){
        customTotalPrice.classList.remove('hide');
        const totalPriceElement = document.getElementById('totalPrice');

        const adaultPriceElement = document.querySelector('.customPricing .pricingData.adult .woocommerce-Price-amount.amount');
        const adaultPriceText = adaultPriceElement.textContent || adaultPriceElement.innerText;
        const adaultPriceNumber = parseInt(adaultPriceText.replace(/฿|,/g, ''));
        const totalAdultPrice = adaultPriceNumber * adultValue;

        const childPriceElement = document.querySelector('.customPricing .pricingData.child .woocommerce-Price-amount.amount');
        const childPriceText = childPriceElement.textContent || childPriceElement.innerText;
        const childPriceNumber = parseInt(childPriceText.replace(/฿|,/g, ''));
        const totalChildPrice = childPriceNumber * childValue;

        const totalPrice = totalAdultPrice + totalChildPrice;
    
        totalPriceElement.innerText = `฿${new Intl.NumberFormat('en-US').format(totalPrice)}.00`;
    } else {
        customTotalPrice.classList.add('hide');
    };
}
function checkVillaTotalDays() {
    const checkInDate = document.getElementById("check-in-date").value; // e.g., '2024/09/08'
    const checkOutDate = document.getElementById("check-out-date").value; // e.g., '2024/09/19'

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const timeDifference = checkOut - checkIn;

    const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Round up to ensure the day is counted if the check-out time is on the same day as check-in

    console.log(totalDays); // Output the total number of 
}

function delayedCheckTourUser() {
    setTimeout(() => {
        checkTourUser();
    }, 100); // Adjust the delay time (in milliseconds) as needed
}

// increase decrease numbers input
function increase(inputId, textClass) {
    let input = document.getElementById(inputId);
    let currentValue = parseInt(input.value);

    // Increment the value and set it back to the input
    input.value = currentValue + 1;

    // Update the text to reflect the new value
    updateText(currentValue + 1, textClass);
}

function decrease(inputId, textClass) {
    let input = document.getElementById(inputId);
    let currentValue = parseInt(input.value);

    // Decrement the value, but ensure it doesn't go below the min attribute
    if (currentValue > parseInt(input.min)) {
        input.value = currentValue - 1;
        // Update the text to reflect the new value
        updateText(currentValue - 1, textClass);
    }
}

function updateText(value, textClass) {
    let textElement = document.querySelector(`.${textClass}`);

    // Handle singular vs plural depending on the value
    if (textClass.includes("child")) {
        textElement.textContent = `${value} ${value === 1 ? 'Child' : 'Children'}`;
    } else if (textClass.includes("infant")) {
        textElement.textContent = value === 0 ? '0 Infant' : `${value} ${value === 1 ? 'Infant' : 'Infants'}`;
    } else if (textClass.includes("adults")) {
        textElement.textContent = `${value} ${value === 1 ? 'Adult' : 'Adults'}`;
    }
}

function notifBanner(bannerText, borderColor) {
    // Update the text content of the banner
    const banner = document.getElementById('notifBanner');
    banner.textContent = bannerText;
    
    // Apply the border color
    banner.style.borderColor = borderColor;
    
    // Move the banner down to 25px
    banner.style.top = '25px';

    // After 5 seconds, move the banner back to -50px and reset the border color
    setTimeout(function() {
        banner.style.top = '-100px';
        banner.style.borderColor = 'transparent';
    }, 6000);
}