console.log('validate_coupon.js working...');

function getParameterValue(parameterName) {
    const queryString = window.location.search;
    const trimmedQueryString = queryString.substring(1);
  
    const queryParams = trimmedQueryString.split('&');
  
    for (const param of queryParams) {
      const [key, value] = param.split('=');
  
      if (key === parameterName) {
        return decodeURIComponent(value.replace(/\+/g, ' '));
      }
    }
  
    return null;
};
function navbarSpacer() {
    var navbarSpacer = document.getElementById('navbarSpacer');
    // <div id="navbarSpacer" style="height: 77px; transition: height 0.3s ease;" original-height="77px"></div>
    if (navbarSpacer) {
        var originalHeight = parseInt(navbarSpacer.getAttribute('original-height')) || 0;

        var banner = document.getElementById('infoBanner');
        if (banner){
            var bannerHeight = parseInt(window.getComputedStyle(banner).height) || 0;
            originalHeight += bannerHeight;
            console.log("addBannerHeight: ", bannerHeight);
        }

        var notificationBanner = document.getElementById('notification_display');
        if (notificationBanner) {
            var notificationBannerHeight = parseInt(window.getComputedStyle(notificationBanner).height) || 0;
            originalHeight += notificationBannerHeight;
            console.log("addNotifBannerHeight: ", notificationBannerHeight);
        }

        console.log("heightAdjustment", originalHeight);
        navbarSpacer.style.height = originalHeight + 'px';
    } else {
        console.log("Navbar Spacer Not Found");
    }
}

function showBanner(perc){
	var infoBanner = document.getElementById('infoBanner');
	var discountTextElement = document.getElementById('bannerText');
	if (infoBanner) {
		discountTextElement.textContent = "Recibiste: " + perc + "% de Descuento";
		infoBanner.style.opacity = '1';
		infoBanner.style.pointerEvents = 'auto';
		infoBanner.style.height = 'auto';
		infoBanner.style.padding = '18px 5px';

		// add/decrease spacer if the navigation is fixed
		navbarSpacer();
	} else {
		console.log('No discount banner found');
	};
}
function hideBanner(){
	var infoBanner = document.getElementById('infoBanner');
	if (infoBanner) {
		infoBanner.style.opacity = '0';
		infoBanner.style.pointerEvents = 'none';
		infoBanner.style.height = '0';
		infoBanner.style.padding = '0';
		// add/decrease spacer if the navigation is fixed
		navbarSpacer();
	} else {
		console.log('No discount banner found');
	};
}

// Rewrite pricing price if user have discount
function reWritePrice(percentage=sessionStorage.getItem("perc")){
	resetPrice();
    console.log("Rewrite!");
    if (percentage && percentage!=''){
        var discountPercentage = parseFloat(percentage);
        var priceElements = document.querySelectorAll('.price');
        priceElements.forEach(function(priceElement) {
            var originalPrice = parseFloat(priceElement.textContent);
            var discountedPrice = originalPrice - (originalPrice * discountPercentage / 100);
            priceElement.textContent = discountedPrice.toFixed(2);
        });
    };
	hideLoadingOverlay();
}

function resetPrice(){
    var priceElements = document.querySelectorAll('.price');
    priceElements.forEach(function(priceElement) {
        var originalPrice = priceElement.getAttribute('aria-label');
        priceElement.textContent = parseFloat(originalPrice);
    });
}

function hideLoadingOverlay() { 
	var loadingOverlay = document.getElementById("loadingOverlay");
	if (loadingOverlay) {
        loadingOverlay.style.display = "none";
    } else {
        console.log("Loading screen not found.");
    }
};

if (window.location.search) {
	console.log("URL contains a Query String!");
	couponCode = getParameterValue('offer');
	ref = getParameterValue('ref');
	if (couponCode){
		console.log("the coupon is: ", couponCode);
		console.log("Checking coupon API...");
		
		//check if there is that coupon code in the v1 API or not
		jQuery(document).ready(function () {
			var targetDomain = domainName;
			var url = "https://app."+ targetDomain +"/landing/validate-coupon";
			if (targetDomain == "miocicvscormier.com"){ 
                console.log("miocicvscormier!")
                var targetDomain = "detailedvehiclehistory.com";
				var url = "https://app.detailedvehiclehistory.com/landing/validate-coupon";
				console.log("use DVH!", url)
			}
			var postData = {
			  email: "",
			  code: couponCode,
			  perc: "",
			  address: "",
			  domain: targetDomain
			};

			// Sending POST request
			jQuery.ajax({
			  type: "POST",
			  url: url,
			  data: postData,
			  success: function (response) {
				// Logging the response to the console
				var responseObject = JSON.parse(response);
				console.log("API Response:", responseObject);
				codeInV1 = responseObject.status === "valid";
				percentages = responseObject.percentage;
				handleCouponValidation(codeInV1);
			  },
			  error: function (error) {
				// Logging the error to the console
				console.error("Error:", error);
			  }
			});
		});	
		//end checking the coupon in v1
		
		function handleCouponValidation(codeInV1) {
			if (codeInV1){
				console.log("Coupon is correct");
				console.log("discount percentage added:", percentages);
				const d = new Date();
				d.setTime(d.getTime() + (3 * 30 * 24 * 60 * 60 * 1000)); // expire in 3 months
                sessionStorage.setItem("perc", percentages); //add to session
                sessionStorage.setItem("discount", couponCode.toLowerCase()); //add to session
				reWritePrice(); //rewrite the price to new value
				showBanner(percentages); //show benner with percentages
				}
			else {
				console.log("Coupon is incorrect");
                sessionStorage.removeItem("perc");
                sessionStorage.removeItem("discount");
				reWritePrice(); //rewrite the price to normal
			}
		}
	}
	else{
		console.log("Not coupon code");
	};
	if (ref){
		console.log("There is Ref!");
		const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
		document.cookie = "ref=" + encodeURIComponent(ref) + "; expires=" + expires + "; path=/";
	};
}
else {
	console.log("URL not contains a Query String!");
	reWritePrice(); //rewrite the price to normal just to make sure
}
// What this code do:
// check if there is a "Query String" or not
// if there is then check if it an offer "?offer=xxx"
// if yes then this is a coupon code then we need to check is that code is valid or available in V1 or not
// if it available in v1, we will get responde as a valid and the discount percentage
// then add the coupon code and the discount percentage to the cookies and voila done 

// If not valid then we delete the coupon code cookies and percentage so the pricing will be normal again.Date
console.log('validate_coupon.js done...');