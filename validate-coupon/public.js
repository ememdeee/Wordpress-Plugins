console.log('Validate coupon plugin working...');

// Always hide banner until the coupon is correct
// var style = document.createElement('style'); style.type = 'text/css'; //create style att
// document.head.appendChild(style);
// style.innerHTML = '.alert-info { display: none; }'; //hide banner before coupon valid

var infoBanner = document.querySelector('.alert-info');
if (infoBanner) {
        infoBanner.style.display = 'none'; //hide banner before coupon valid
} else {
	// Log a message if the element is not found
	console.log('No discount banner found');
}

//function to delete the loading screen
function hideLoadingOverlay() { 
	var loadingOverlay = document.getElementById("loadingOverlay");
	if (loadingOverlay) {
        loadingOverlay.style.display = "none";
    } else {
        console.log("Loading screen not found.");
    }
};
hideFromDynamicCode = false;

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

if (window.location.search) {
	console.log("URL contains a Query String!");
	couponCode = getParameterValue('offer');
	// if (window.location.search.slice(0, 7) == "?offer="){
	if (couponCode){
		// couponCode= window.location.search.substring(7);
		console.log("the coupon is: ", couponCode);
		console.log("Checking coupon API...");
		
// 		check if there is that coupon code in the v1 API or not
		jQuery(document).ready(function () {
			var domainName = window.location.hostname;
			// var domainName = "premiumvin.com";
			var url = "https://app."+ domainName +"/landing/validate-coupon";
			if (domainName == "testing-5851127.xyz" || domainName == "windowstickerslookup.com"){ 
				var domainName = "detailedvehiclehistory.com";
				var url = "https://app."+ domainName +"/landing/validate-coupon";
				console.log("Testing site!!!!")
			}
			var postData = {
			  email: "",
			  code: couponCode,
			  perc: "",
			  address: "",
			  domain: domainName
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
// 		end checking the coupon in v1
		
		function handleCouponValidation(codeInV1) {
			if (codeInV1){
				console.log("Coupon is correct");
				console.log("discount percentage added:", percentages);
// 				add discount code and percentage to Cookies
				const d = new Date();
// 				d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); //expire 1 year
				d.setTime(d.getTime() + (3 * 30 * 24 * 60 * 60 * 1000)); // expire in 3 months
				let expires = "expires="+ d.toUTCString();
				// document.cookie = "perc" + "=" + percentages + ";" + ";path=/"; //add percantage to cookies as session
                sessionStorage.setItem("perc", percentages); //add to session
				// document.cookie = "discount" + "=" + couponCode.toLowerCase() + ";" + ";path=/"; //add coupon to cookies as session
                sessionStorage.setItem("discount", couponCode.toLowerCase()); //add to session
				console.log("Rewriting the price")
				fetchDataAndRender(); //rewrite the price
				hideFromDynamicCode = true;
// 				add or show banner
				var discountTextElement = document.querySelector('.alert-info .mobo_font');
				if (discountTextElement) {
					// Update the content of the element with the new discount value
					discountTextElement.textContent = "You've received " + percentages + "% DISCOUNT";
				} else {
					console.log("Banner element not available");
				}
				// style.innerHTML = '.alert-info { display: inherit !important; }'; //show banner
				console.log("Banner execution");
				var infoBanner = document.querySelector('.alert-info');
				// declare again
				if (infoBanner){
					infoBanner.style.display = 'inherit'; //show banner
					console.log("Show banner")
				}
				else {
					console.log("Banner not found")
				}
				console.log("Banner execution done");
				}
			else {
				console.log("Coupon is incorrect");
				document.cookie = `${"perc"}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                sessionStorage.removeItem("perc");
				document.cookie = `${"discount"}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                sessionStorage.removeItem("discount");
				document.cookie = `${"PHPSESSID"}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; //only can deleted if user in DVH.com because the cookis is from there

				// style.innerHTML = '.alert-info { display: none !important; }'; //hide banner
				
				if (infoBanner){
					infoBanner.style.display = 'none'; //hide banner
					console.log("Hide banner")
				}
				else {
					console.log("Banner not found")
				}

				console.log("remove discount, percentage, and delete banner");
				fetchDataAndRender(); //rewrite the price
				console.log("Rewriting the price");
				hideFromDynamicCode = true;
			}
		}
	}
	else{
		console.log("Not coupon code");
	}
}
else {
	console.log("URL not contains a Query String!");
}
// What this code do:
// check if there is a "Query String" or not
// if there is then check if it an offer "?offer=xxx"
// if yes then this is a coupon code then we need to check is that code is valid or available in V1 or not
// if it available in v1, we will get responde as a valid and the discount percentage
// then add the coupon code and the discount percentage to the cookies and voila done 

// If not valid then we delete the coupon code cookies and percentage so the pricing will be normal again.Date
// The price writing will be done when the coupon is correct and wrong. it will done in the redirect.js code by akinade
console.log('Validate coupon plugin done...');