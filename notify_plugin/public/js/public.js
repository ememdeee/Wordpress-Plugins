;(function($) {
    "use strict";
    console.log("Notify plugin working...");

    var domainName = window.location.hostname;
	var notifyBaseUrl = "https://app."+ domainName;
	var appDomain = "app."+domainName;
	if (domainName == "testing-site.local"){
		var domainName = "miocicvscormier.com";
	    var notifyBaseUrl = "https://"+ domainName;
		var appDomain = domainName;
		console.log("Testing site!!!")
	}
	var nVin = getCustomCookie("cart_vin");
	if(!nVin){
		nVin = sessionStorage.getItem("cart_vin");
	}
	var cartPlanCode = getCustomCookie("cart_plan");
	if(!cartPlanCode){
		cartPlanCode = sessionStorage.getItem("cart_plan");
	}
    console.log('my base url', notifyBaseUrl);
	console.log('cookies cart_plan', cartPlanCode);
	console.log('session cart_vin', nVin);

	if (window.location.search) { 
		var couponCode = getParameterValue('offer');
		if (couponCode){
			console.log("the coupon is: ", couponCode);
			console.log("Checking coupon API...");
	
			// check if there is that coupon code in the v1 API or not
			jQuery(document).ready(function () {
				// Check if the banner has been closed before
				var bannerClosed = localStorage.getItem('bannerClosed');
				if (bannerClosed === 'true') {
					// If the banner has been closed before, hide it
					var banner = document.querySelector('.notification');
					banner.style.display = 'none';
				}else{
					var postData = {
						email: "",
						code: couponCode,
						perc: "",
						address: "",
						domain: domainName
					};
					jQuery.ajax({
						type: "POST",
						url: notifyBaseUrl+"/landing/validate-coupon",
						data: postData,
						success: function (response) {
							// Logging the response to the console
							var responseObject = JSON.parse(response);
							console.log("Coupon API Response:", responseObject);
							var codeInV1 = responseObject.status === "valid";
							var percentages = responseObject.percentage;
							getCouponValidation(codeInV1,percentages);
							if(getCustomCookie("cookie_txn") && getCustomCookie("cookie_txn") != ""){
								//destroy banner
								verifyOrder(getCustomCookie("cookie_txn"));
							}
							//show reset banner
							getDecodeData(nVin);
						},
						error: function (error) {
							// Logging the error to the console
							console.error("Error:", error);
						}
					});
	
					// Get the close icon element by its ID
					var closeIcon = document.getElementById("notify_closeIcon");
	
					// Add an onclick event listener to the close icon
					closeIcon.onclick = function(e) {
						e.preventDefault();
						// Your code to handle the click event goes here
						// For example, you can close a modal or hide an element
						console.log("Notification banner Close icon clicked!");
						var banner = document.getElementById("notification_display");
						banner.style.display = 'none';
						navbarSpacer();
						localStorage.setItem('bannerClosed', 'true');
					};
				}
			});
			// end checking the coupon in v1

			function getCouponValidation(codeInV1,percentages) {
				if (codeInV1){
					console.log("Coupon is valid");
					// add discount code and percentage to Cookies
					sessionStorage.setItem("cart_perc", percentages); //add percentage to session
					setCustomCookie("cart_perc", percentages, 1); //add percentage to cookie
				}else{
					console.log("Coupon is not valid");
					// add discount code and percentage to Cookies
					sessionStorage.setItem("cart_perc", 0); //add percentage to session
					setCustomCookie("cart_perc", 0, 3); //add percentage to cookie
				}
				// getDecodeData(nVin);
			}
		}
	}else{
		jQuery(document).ready(function () {
			console.log("no query string");
			// add discount code and percentage to Cookies
			sessionStorage.setItem("cart_perc", 0); //add percentage to session
			setCustomCookie("cart_perc", 0, 3); //add percentage to cookie
			// Check if the banner has been closed before
			var bannerClosed = localStorage.getItem('bannerClosed');
			if (bannerClosed === 'true') {
				// If the banner has been closed before, hide it
				var banner = document.querySelector('.notification');
				banner.style.display = 'none';
			}else{
				if(getCustomCookie("cookie_txn") && getCustomCookie("cookie_txn") != ""){
					//destroy banner
					verifyOrder(getCustomCookie("cookie_txn"));
				}
				//show reset banner
				getDecodeData(nVin);
	
				// Get the close icon element by its ID
				var closeIcon = document.getElementById("notify_closeIcon");
	
				// Add an onclick event listener to the close icon
				closeIcon.onclick = function(e) {
					e.preventDefault();
					// Your code to handle the click event goes here
					// For example, you can close a modal or hide an element
					console.log("Notification banner Close icon clicked!");
					var banner = document.getElementById("notification_display");
					banner.style.display = 'none';
					navbarSpacer();
					localStorage.setItem('bannerClosed', 'true');
				};
			}
		});
	}

	jQuery(document).ready(function () {
		$("#notify_btn").click(function (event) {
			console.log('fired');
			event.preventDefault();
			var cartType = getCustomCookie("cart_type");
			if(!cartType){
				cartType = sessionStorage.getItem("cart_type");
			}
			var getPlanType = (cartType === "report") ? "report" : "sticker";
			var cartPlate = (getCustomCookie("cart_plate")) ? getCustomCookie("cart_plate") : "";
			if(!cartPlate){
				cartPlate = (sessionStorage.getItem("cart_plate")) ? sessionStorage.getItem("cart_plate") : "";
			}
			var checkPlate = (cartPlate && cartPlate != "") ? cartPlate : "";
			notify_cartplan(cartPlanCode,getPlanType,checkPlate);
		});
	});

	function getDecodeData(nVin) {
		if(nVin){
			$.ajax({
				type: "GET",
				url: notifyBaseUrl+"/landing/decode_data?vin="+nVin,
				dataType: 'json',
				async:false,
				beforeSend: function(){
					console.log("Getting decode data...");
				},
				success: function (e) {
					console.log("decode data", e);
					//remove cookies
					deleteCustomCookie("cart_year");
					deleteCustomCookie("cart_make");
					deleteCustomCookie("cart_model");
					deleteCustomCookie("cart_price");
					deleteCustomCookie("cart_currency_sign");
					//remove session storage
					sessionStorage.removeItem("cart_year");
					sessionStorage.removeItem("cart_make");
					sessionStorage.removeItem("cart_model");
					sessionStorage.removeItem("cart_price");
					sessionStorage.removeItem("cart_currency_sign");
					//delete vin cookies/session if condition meet
					if(e.vin){
						deleteCustomCookie("cart_vin");
						sessionStorage.removeItem("cart_vin");
					}
					//check decode status
					if(e.status == 'success' && showBanner == 'Yes'){
						sessionStorage.setItem("cart_year", e.year); //add decode year to session
						sessionStorage.setItem("cart_make", e.make); //add decode make to session
						sessionStorage.setItem("cart_model", e.model); //add decode model to session
						setCustomCookie("cart_year", e.year, 3); //add decode year to cookie
						setCustomCookie("cart_make", e.make, 3); //add decode make to cookie
						setCustomCookie("cart_model", e.model, 3); //add decode model to cookie
						//add vin to cookie/session if condition meet
						if(e.vin){
							setCustomCookie("cart_vin", e.vin, 3);
							sessionStorage.setItem("cart_vin", e.vin);
						}

						// get notification container
						var notificationDisplay = document.getElementById("notification_display");
						var notify_vin = document.getElementById("notify_vin");
						var notify_discount = document.getElementById("notify_discount");
						var notify_ymm = document.getElementById("notify_ymm");
						var notify_msg = document.getElementById("notify_msg");
						// var notificationBtnText = document.getElementById("banner-buy-report-text");
						var notificationBtn = document.getElementById("notify_btn");

						var newYear = getCustomCookie("cart_year");
						if(!newYear){
							newYear = sessionStorage.getItem("cart_year");
						}
						newYear = (newYear && newYear != "N/A") ? newYear + " " : "";
						var newMake = getCustomCookie("cart_make");
						if(!newMake){
							newMake = sessionStorage.getItem("cart_make");
						}
						newMake = (newMake && newMake != "N/A") ? newMake + " " : "";
						var newModel = getCustomCookie("cart_model");
						if(!newModel){
							newModel = sessionStorage.getItem("cart_model");
						}
						newModel = (newModel && newModel != "N/A") ? newModel + " " : "";
						var nVin = getCustomCookie("cart_vin");
						if(!nVin){
							nVin = sessionStorage.getItem("cart_vin");
						}
						var myPerc = getCustomCookie("cart_perc");
						if(!myPerc){
							myPerc = sessionStorage.getItem("cart_perc");
						}
						// var percentageText = (myPerc > 0) ? " with <strong>" + myPerc + "%</strong> discount" : "";
						if (myPerc > 0){
							notify_discount.innerHTML =  "With <strong>" + myPerc + "%</strong> discount";
							notify_discount.style.display = "block";
						};

						// update notification text
						var cartType = getCustomCookie("cart_type");
						if(!cartType){
							cartType = sessionStorage.getItem("cart_type");
						}
						console.log("cartType: ", cartType);
						var planType = (cartType === "report") ? "report" : "sticker";

						// notify_msg.innerHTML = "Your " + getCustomCookie("cart_type") + " for your " + newYear + newMake + newModel + (nVin == "CREDIT" ? "" : "(<span style='color:#ffd200;'>" + nVin + "</span>)") + " is ready" + percentageText;
						
						if (domainName.includes('smartcarcheck.uk') || domainName.includes('mrexplainervideos.com')) {
							if (cartPlanCode.includes("UKP")) {
								planType = "Premium Report";
							} else if (cartPlanCode.includes("UKB")) {
								planType = "Basic Report";
							} else {
								planType = "Report";
							}
							notify_vin.innerHTML = "Your " + planType + " is ready " + (getCustomCookie("site_form").includes("plate") ? "REG#" : "VIN#") + nVin;
						} else {
							notify_vin.innerHTML = "Your " + planType + " is ready VIN# " + nVin;
						}
						notify_ymm.innerHTML = (!newYear && !newMake && !newModel) ? "" : newYear + newMake + newModel;
						notify_msg.innerHTML = "Get the "+ planType +" for this vehicle. Give yourself the benefit of information that will help you make the best decision.";
						// notificationBtnText.innerHTML = "Download " + capitalizeFirstLetter(getCustomCookie("cart_type"));
						notificationBtn.innerHTML = "Get Access";
						console.log("newYear:", newYear, typeof newYear);
						console.log("newMake:", newMake, typeof newMake);
						console.log("newModel:", newModel, typeof newModel);
						
						// Check if any of the values are undefined or null
						if (newYear == null || newMake == null || newModel == null || newYear.trim() == "null" || newMake.trim() == "null" || newModel.trim() == "null") {
							console.log("delete cart_plan");
							deleteCustomCookie("cart_plan");
							cartPlanCode = null;
						} else {
							console.log("no delete cart_plan");
						}
						
						getPlanDetails(cartPlanCode, discountCalculator);
						navbarSpacer();
					}else{
						console.log("decode data not found");
					}
				},
				error: function (error) {
					// Logging the error to the console
					console.error("Error:", error);
				}
			});	
		}
	}

	// function capitalizeFirstLetter(text) {
	// 	if (!text) return text;
	// 	return text.charAt(0).toUpperCase() + text.slice(1);
	// }

	var showBanner = "Yes";
	function verifyOrder(txnId) {
		if(txnId){
			$.ajax({
				type: "GET",
				url: notifyBaseUrl+"/landing/verify_order?txn="+txnId,
				dataType: 'json',
				async:false,
				beforeSend: function(){
					console.log("Getting decode data...");
				},
				success: function (e) {
					console.log("order data", e);
					if(e.status == 'success' && e.data.payment_status == 'paid'){
						// delete notification container
						deleteCustomCookie("cookie_txn");
						deleteCustomCookie("cookie_oid");
						showBanner = "No";
					}else{
						// display notification container
						showBanner = "Yes";
						console.log("show banner");
					}
				},
				error: function (error) {
					// Logging the error to the console
					console.error("Error:", error);
				}
			});	
		}else{
			// display notification container
			showBanner = "Yes";
			console.log("show banner");
		}
	}

	function getPlanDetails(pCode, myCallback){
        console.log("pCode: ", pCode)
        if(pCode){
            pCode = pCode.replace(/\d+|UN/g, '1');
            console.log("the first package code:", pCode);
            $.ajax({
                type: "GET",
                url: notifyBaseUrl+"/landing/getPlans?pcode="+pCode,
                dataType: 'json',
                async:false,
                beforeSend: function(){
                    console.log("Getting plan details...");
                },
                success: function (e) {
                    console.log("plan details", e);
                    var notificationCodeText = document.getElementById("notify_cost");
                    var discountPerc = getCustomCookie("cart_perc");
                    if(!discountPerc || discountPerc == 0){
                        discountPerc = sessionStorage.getItem("cart_perc");
                    }
                    sessionStorage.setItem("cart_currency_sign", e.currency_sign); //add currency sign to session
                    setCustomCookie("cart_currency_sign", e.currency_sign, 3); //add currency sign to cookie
                    // var calIDiscountedPrice = myCallback(e.price,discountPerc,e.currency_code);
                    var calIDiscountedPrice = myCallback(e.price/e.nos,discountPerc,e.currency_code); //to make sure we use the 1 price, but need to check to use package 1 only
                    notificationCodeText.innerHTML = "for " + e.currency_sign + calIDiscountedPrice;
					var banner = document.getElementById('notification_display');
					banner.style.display = 'flex';
					console.log("plan code is found, show banner");
                },
                error: function (error) {
                    // Logging the error to the console
                    console.error("Error:", error);
                }
            });
        }else{
            // hide notification container
            // var notificationCodeBtn = document.getElementById("notify_button");
            // notificationCodeBtn.style.display = "none";
            // console.log("plan code not found, so button hidden");
            var banner = document.getElementById('notification_display');
            banner.style.display = 'none';
            console.log("plan code not found, so banner hidden");
        }
    }


	function discountCalculator(p,d,c) {
		var zero_currency = ["BIF","CLP","DJF","GNF","JPY","KMF","KRW","MGA","PYG","RWF","UGX","VND","VUV","XAF","XOF","XPF"];
        var three_decimal_currency = ["BHD","JOD","KWD","OMR","TND"];

		d = (d)?d:0;
		if(d != 0){
			var dis = ((p*d)/100);
			var price = p-dis;
			if(zero_currency.includes(c)){
				price = Math.ceil(price);
			}else if(three_decimal_currency.includes(c)){
				price = roundToTheNearestAnything(price, 10);
			}
			setCustomCookie("cart_price", price, 3); //add price to cookie
			sessionStorage.setItem("cart_price", price); //add price to session
			return Math.round(price, 2);
		}else{
			setCustomCookie("cart_price", p, 3); //add price to cookie
			sessionStorage.setItem("cart_price", p); //add price to session
			return Math.round(p, 2);
		}
	}

	function roundToTheNearestAnything(value, roundTo) {
		var mod = value % roundTo;
		return value + (mod < (roundTo / 2) ? -mod : roundTo - mod);
	}

	function notify_cartplan(code,type,preview) {
		let PROXYBASEURL;
		var mainDomain = notifyBaseUrl.replace('app.', '');

		var email = getCustomCookie("cart_email");
		if(!email){
			email = sessionStorage.getItem("cart_email");
		}
		var mobile = getCustomCookie("cart_mobile");
		if(!mobile){
			mobile = sessionStorage.getItem("cart_mobile");
		}
		var plate = (getCustomCookie("cart_plate")) ? getCustomCookie("cart_plate") : "";
		if(!plate){
			plate = (sessionStorage.getItem("cart_plate")) ? sessionStorage.getItem("cart_plate") : "";
		}
		var state = (getCustomCookie("cart_state")) ? getCustomCookie("cart_state") : "";
		if(!state){
			state = (sessionStorage.getItem("cart_state")) ? sessionStorage.getItem("cart_state") : "";
		}
		var couponCode = getParameterValue('offer');
		var sdiscount = (couponCode != null) ? '&offer='+couponCode : ((getCustomCookie("cart_type") == "sticker") ? '&offer=STICKER0' : '&offer=VHR0');

		deleteCustomCookie("cart_plan");
		sessionStorage.removeItem("cart_plan");
		setCustomCookie("cart_plan", code, 3); //add plan code to cookie
		sessionStorage.setItem("cart_plan", code); //add plan code to session
		GetSiteSettings();

		if(memberAreaPreview == 'cwampv_proxy'){
			PROXYBASEURL = mainDomain;
		}else{
			PROXYBASEURL = "";
		}
		var redirectUrl = (PROXYBASEURL == "") ? notifyBaseUrl : PROXYBASEURL;

		if (memberAreaPreview == "cwampv" || memberAreaPreview == "cwampv_proxy") {
			if (domainName == 'classicdecoder.com' || domainName == 'pintonaturals.com'){
				window.location = 
				redirectUrl + 
				"/vehicle/preview?type=" + (type === "report" ? "vhr" : "sticker") +
				"&vin=" + nVin + 
				"&email=" + email + 
				"&phone=" + mobile + 
				sdiscount + 
				"&wpPage=revisitBanner";
			}
			else if (domainName == 'smartcarcheck.uk' || domainName == 'mrexplainervideos.com'){
				window.location = 
				redirectUrl + 
				"/landing/preview?" + (getCustomCookie("site_form").includes("plate") ? "regNo=" : "vin=") + nVin +
				"&email=" + email + 
				"&phone=" + mobile + 
				sdiscount + 
				"&wpPage=revisitBanner";
			}
			else if (type == "report" && preview != "") {
				window.location =
				redirectUrl +
				"/vin-check/license-preview?vin=" +
				nVin +
				"&email=" +
				email +
				"&mobile=" +
				mobile + sdiscount +
				"&wpPage=revisitBanner";
			} else if (type == "report" && preview == "") {
				window.location =
				redirectUrl +
				"/vin-check/preview?vin=" +
				nVin +
				"&email=" +
				email +
				"&mobile=" +
				mobile + sdiscount +
				"&wpPage=revisitBanner";
			}
			else {
				window.location =
				redirectUrl +
				"/vin-check/ws-preview?vin=" +
				nVin +
				"&email=" +
				email +
				"&mobile=" +
				mobile + sdiscount +
				"&wpPage=revisitBanner";
			}
		}else {
			// console.log("di Else", memberAreaPreview);
			// debugger;
			if (type == "report" && preview != "") {
				window.location =
				notifyBaseUrl +
				"/vin-check/license-preview?vin=" +
				nVin +
				"&email=" +
				email +
				"&mobile=" +
				mobile + sdiscount +
				"&wpPage=revisitBanner";
			} else if (type == "report" && preview == "") {
				window.location =
				notifyBaseUrl +
				"/vin-check/preview?vin=" +
				nVin +
				"&email=" +
				email +
				"&mobile=" +
				mobile + sdiscount +
				"&wpPage=revisitBanner";
			} else {
				window.location =
				notifyBaseUrl +
				"/vin-check/ws-preview?vin=" +
				nVin +
				"&email=" +
				email +
				"&mobile=" +
				mobile + sdiscount +
				"&wpPage=revisitBanner";
			}
		}
	}

    var memberAreaPreview = "";
    function GetSiteSettings(){
        $.ajax({
            type: "post",
            url: notifyBaseUrl+"/landing/site_settings",
            data: {
                domain: appDomain, 
            },
            dataType: 'json',
            async:false,
            beforeSend: function(){
              console.log("Getting Site Settings...");
            },
            success: function(e){
    			// console.log(e.data);
                if(e.status != 'error'){
                    memberAreaPreview = e.data.member_area_preview;
                }
            }
        });
    }

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

	function setCustomCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

	function getCustomCookie(cname){
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++){
			let c = ca[i];
			while(c.charAt(0) == ' '){
				c = c.substring(1);
			}
			if(c.indexOf(name) == 0){
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	function deleteCustomCookie(cname) {
		document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		console.log("deleted cookie is", cname);
	}

})(jQuery);