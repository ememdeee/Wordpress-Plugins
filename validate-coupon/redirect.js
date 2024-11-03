console.log('Redirect.js code working...');
// don't forget to double check the domain name (currently it lead to dev environment)
// check line 6, 8, 673 and can be more.

// need add some code for different domain, line: 673
// configured domain: miocicvscormier, DVH, premiumvin, instanvinreports, consultadevin, vehiclehistoryeu, vehiclesreport, classic decoder, smar car check.



var domainName = window.location.hostname;
if (domainName == "testing-5851127.xyz" || domainName == "windowstickerslookup.com") {
  var domainName = "miocicvscormier.com";
  console.log("Testing site Test!")
}
// else if (domainName == "windowstickerslookup.com") {
//   var domainName = "developtestsite.com";
//   console.log("Testing site WSL!")
// };
var memberAreaPreview = ""
var sites_config = {
  // 'URL':"https://"+domainName,
  'URL': "https://app." + domainName,
  'domain': "app." + domainName,
  'PROCESSING_PAGE': "disabled",
  //       	   'pricing':{
  //             'plan1':15,
  //             'plan2':35,
  //             'plan5':60,
  //             'plan10':100,
  //             'plan25':500,
  //             'plan50':900,
  //         	}	
  'pricing': {
    'plan0': 15,
    'plan1': 35,
    'plan2': 60,
    'plan3': 100,
    'plan4': 500,
    'plan5': 900,
  }
};
if (domainName == "miocicvscormier.com") {
  sites_config.URL = "https://miocicvscormier.com/";
  sites_config.domain = "miocicvscormier.com";
  console.log("Testing site!!!")
}

// 	var sites_config;


function fetchDataAndRender() {
  function discount_counter(price, percentage, currency_sign) {
    zero_currency = ["BIF", "CLP", "DJF", "GNF", "JPY", "KMF", "KRW", "MGA", "PYG", "RWF", "UGX", "VND", "VUV", "XAF", "XOF", "XPF"];
    zero_currency_result = null;
    three_decimal_currency = ["BHD", "JOD", "KWD", "OMR", "TND"];
    three_decimal_currency_result = null;

    // Discount is available and not empty
    discount = price * (percentage / 100);
    discounted_price = (price - discount).toFixed(2);
    //console.log ("initial price after discount:",discounted_price);
    // here the if logic
    if (zero_currency.includes(currency_sign)) {
      finalPrice = zero_currency_result = Math.ceil(discounted_price);
      //console.log ("in zero_currency, price ceiled: ", finalPrice);
    }
    else if (three_decimal_currency.includes(currency_sign)) {
      //round the 2 number behind comma
      var num = discounted_price.toFixed(2);
      //console.log("input", num);
      let roundedNumber = roundToNearestTen(num * 100);
      finalPrice = three_decimal_currency_result = (roundedNumber / 100).toFixed(2);
      //console.log("final price after three decimal", finalPrice);
    }
    finalPrice = parseFloat(discounted_price).toFixed(2);
    return finalPrice
  }
  if (domainName == "smartcarcheck.uk") {
    console.log("SCC")
    jQuery(document).ready(function ($) {
      $.ajax({
        type: "GET",
        url: sites_config.URL + "/api_uk/basic_plans?user_type=user",
        dataType: 'json',
        success: function (result) {
          var allPlans = result.credit_plans;
          var plength = allPlans.length;
          // var discount = getCookie('discount');
          var discount = sessionStorage.getItem("discount");
          var percentage = sessionStorage.getItem("perc");
          console.log(discount);
          var tempDiscount = [];
          $.each(allPlans, function (key, item) {
            item = allPlans[key];
            var vehiclenos = (item.nos > 1) ? 'vehicles' : 'vehicle';
            var rptnos = (item.nos > 1) ? 'Reports' : 'Report';
            // var dict = (percentage != '') ? "<span class='price-badge-"+percentage+"'>Save "+percentage+"%</span>" : "";
            console.log(item);
            price = item.price; currency_sign = item.currency_sign;
            if (percentage) {
              price = discount_counter(price, percentage, currency_sign)
            }
            // (percentage != '') ? tempDiscount.push(sites_config.pricing[plan+key]) : '';
            // (percentage != '') ? sites_config.pricing[plan+key] = item.price-((percentage/100)*item.price) : '';
            // (percentage != '') ? sites_config.pricing[plan+key] = item.price.toFixed(2) : '';
            // (percentage != '') ? console.log(sites_config.pricing[plan+key]) : '';

            // $('#header'+key).html("<div class='header'>"+dict+"<div class='price'><h4><span class='pricing_new'><sub>"+item.currency_sign+"</sub>"+item.price+"</span><span class='period-txt'>/ "+item.nos+' '+rptnos+"</span></h4></div></div>");
            $('#header' + key).html("<div class='header'><div class='price'><h4><span class='pricing_new'><sub>" + item.currency_sign + "</sub>" + price + "</span><span class='period-txt'>/ " + item.nos + ' ' + rptnos + "</span></h4></div></div>");
            $('#features' + key).html("<ul><li><i aria-hidden='true' class='fa-check-one'></i>Check " + item.nos + ' ' + vehiclenos + "</li><li><i aria-hidden='true' class='fa-check-one'></i>Verified data in one report</li><li><i aria-hidden='true' class='fa-check-one'></i>This report never expires</li><li><i aria-hidden='true' class='fa-check-one'></i>100% money back guarantee</li></ul><input type='hidden' id='pcode' value='" + item.code + "'/>");


            // 					$('.pricing_new'+key).html("<sub>"+item.currency_sign+"</sub>"+item.price)
            // 					$('#planPeriod'+key).html("/"+item.nos+" "+((item.nos > 1)?"Reports":"Report"));
            // 					$('.fa-ul'+key).html("<li><i aria-hidden='true' class='fa-check-one'></i>Check "+item.nos+" "+((item.nos > 1)?"vehicles":"vehicle")+"</li><li><i aria-hidden='true' class='fa-check-one'></i>Verified data in one report</li><li><i aria-hidden='true' class='fa-check-one'></i>This report never expires</li><li><i aria-hidden='true' class='fa-check-one'></i>100% money back guarantee</li>");
          });
        }
      });
    });

    jQuery(document).ready(function ($) {
      $.ajax({
        type: "GET",
        url: sites_config.URL + "/api_uk/premium_plans?user_type=user",
        dataType: 'json',
        success: function (result) {
          var allPlans = result.credit_plans;
          var plength = allPlans.length;
          // var discount = getCookie('discount');
          var discount = sessionStorage.getItem("discount");
          console.log(discount);
          var percentage = sessionStorage.getItem("perc");
          var tempDiscount = [];
          $.each(allPlans, function (key, item) {
            item = allPlans[key];
            var vehiclenos = (item.nos > 1) ? 'vehicles' : 'vehicle';
            var rptnos = (item.nos > 1) ? 'Reports' : 'Report';
            // var dict = (percentage != '') ? "<span class='price-badge-20>Save "+percentage+"%</span>" : "";
            console.log(item);
            price = item.price; currency_sign = item.currency_sign;
            if (percentage) {
              price = discount_counter(price, percentage, currency_sign)
            }
            // (percentage != '') ? tempDiscount.push(sites_config.pricing[plan+key]) : '';
            // (percentage != '') ? sites_config.pricing[plan+key] = item.price-((percentage/100)*item.price) : '';
            // (percentage != '') ? sites_config.pricing[plan+key] = item.price.toFixed(2) : '';
            // (percentage != '') ? console.log(sites_config.pricing[plan+key]) : '';

            // $('#pheader'+key).html("<div class='header'>"+dict+"<div class='price'><h4><span class='pricing_new'><sub>"+item.currency_sign+"</sub>"+item.price+"</span><span class='period-txt'>/ "+item.nos+' '+rptnos+"</span></h4></div></div>");
            $('#pheader' + key).html("<div class='header'><div class='price'><h4><span class='pricing_new'><sub>" + item.currency_sign + "</sub>" + price + "</span><span class='period-txt'>/ " + item.nos + ' ' + rptnos + "</span></h4></div></div>");
            $('#pfeatures' + key).html("<ul><li><i aria-hidden='true' class='fa-check-one'></i>Check " + item.nos + ' ' + vehiclenos + "</li><li><i aria-hidden='true' class='fa-check-one'></i>Verified data in one report</li><li><i aria-hidden='true' class='fa-check-one'></i>This report never expires</li><li><i aria-hidden='true' class='fa-check-one'></i>100% money back guarantee</li></ul><input type='hidden' id='pcode' value='" + item.code + "'/>");
          });
          if (window.location.search.slice(0, 7) !== "?offer=") {
            console.log("hide-loading from redirect js");
            hideLoadingOverlay();
          } else if (hideFromDynamicCode) {
            console.log("hide-loading from dynamic code");
            hideLoadingOverlay();
          }
        }
      });
    });
  }
  else {
    jQuery.ajax({
      type: "GET",
      url: sites_config.URL + "/landing/app_cart_plans",
      dataType: 'json',
      success: function (result) {
        var allPlans = result.plans;
        // 				var discount = sessionStorage.getItem("discount");
        // 				var discount = 90;
        // 				console.log(discount);
        // 				discount = (discount != null) ? discount.toLowerCase() : '';
        // 				discount = (discount != null) ? ((discount.includes('sticker')) ? discount.replace("sticker", "") : ((discount.includes('bf')) ? discount.replace("bf", "") : discount.replace("vhr", ""))) : "";
        // 				console.log("bismillah!");
        //   var percentage = getCookie('perc');
        var percentage = sessionStorage.getItem("perc"); //get from session
        discounted_price = null;
        console.log(percentage);
        // 				var tempDiscount = [];

        zero_currency = ["BIF", "CLP", "DJF", "GNF", "JPY", "KMF", "KRW", "MGA", "PYG", "RWF", "UGX", "VND", "VUV", "XAF", "XOF", "XPF"];
        zero_currency_result = null;
        three_decimal_currency = ["BHD", "JOD", "KWD", "OMR", "TND"];
        three_decimal_currency_result = null;

        // 				this is function to round the 2 behind comma, for three decimal currency.
        function roundToNearestTen(number) {
          return Math.round(number / 10) * 10;
        };
        jQuery.each(allPlans, function (key, item) {
          item = allPlans[key];
          if (percentage !== undefined && percentage !== null && percentage !== "") {
            // Discount is available and not empty
            discount = item.price * (percentage / 100);
            discounted_price = (item.price - discount).toFixed(2);
            //console.log ("initial price after discount:",discounted_price);
            // here the if logic
            if (zero_currency.includes(item.currency_code)) {
              finalPrice = zero_currency_result = Math.ceil(discounted_price);
              //console.log ("in zero_currency, price ceiled: ", finalPrice);
            }
            else if (three_decimal_currency.includes(item.currency_code)) {
              //round the 2 number behind comma
              var num = discounted_price.toFixed(2);
              //console.log("input", num);
              let roundedNumber = roundToNearestTen(num * 100);
              finalPrice = three_decimal_currency_result = (roundedNumber / 100).toFixed(2);
              //console.log("final price after three decimal", finalPrice);
            }
            finalPrice = parseFloat(discounted_price).toFixed(2);
          } else {
            //Discount is unavailable or empty
            //finalPrice = item.price; this is the normal price
            finalPrice = parseFloat(item.price).toFixed(2); //this is following v1
          }
          jQuery('#plan' + key).html(item.currency_sign + finalPrice);
          console.log("plan= ", item.currency_sign + finalPrice)
          jQuery('#list-unstyled' + key).html("<li>" + item.name + "</li><li>" + item.nos + " Premium Report</li><li>Never Expires</li><li> </li>");
          console.log(item);
          console.log("Currency code:", item.currency_code);
          console.log("initial price:", item.price);
          console.log("Discount Percentage: ", percentage);
          console.log("Discounted Price: ", discounted_price);
          console.log("zero_currency calculation:", zero_currency_result);
          console.log("three decimal currency calculation:", three_decimal_currency_result);
          console.log("finel price:", finalPrice);
        });

        if (window.location.search.slice(0, 7) !== "?offer=") {
          console.log("hide-loading from redirect js");
          hideLoadingOverlay();
        } else if (hideFromDynamicCode) {
          console.log("hide-loading from dynamic code");
          hideLoadingOverlay();
        }
      }
    });
  }
};
jQuery(document).ready(function ($) {
  // fetchDataAndRender(); //don't check price in all page, it slow down sites.
  const currentUrl = window.location.href;
  const allowedPages = ['/vin-check-rates', '/pricing', '/price'];

  if (allowedPages.some(page => currentUrl.endsWith(page))) { // Run fetchDataAndRender() for allowed pages only
    console.log("check price!");
    fetchDataAndRender();
  } else {
    console.log("dont run check price!");
  }
});

jQuery(document).ready(function ($) {
  //console.log(sites_config.domain);
  $.ajax({
    type: "POST",
    url: sites_config.URL + "/landing/site_settings",
    data: {
      domain: sites_config.domain,
    },
    dataType: 'json',
    success: function (result) {
      //console.log(result.data);
      var memberarea = result.data.member_area;
      memberAreaPreview = result.data.member_area_preview;
      if (memberAreaPreview == "cwampv_proxy") {
        var logindomain = result.data.protocol + '://' + domainName + '/members/login';
      } else {
        var logindomain = (memberarea == 'cwa_mvp') ? result.data.protocol + '://members.' + domainName + '/members/login' : sites_config.URL + "/login";
      }
      $("#login_url").attr("href", logindomain);
      $(".button-default-outline").attr("href", logindomain);
      $("#footer_login_url").attr("href", logindomain);
      $("#topbar_login_url").attr("href", logindomain);
    }
  });
});

jQuery(document).ready(function ($) {
  $(".code").hide();
  $('.license-vin').hide();
  //       $("#login_url").attr("href", sites_config.URL+"/login");
  //       $("#footer_login_url").attr("href", sites_config.URL+"/login");
  //       $("#topbar_login_url").attr("href", sites_config.URL+"/login");
  $("#footer_unlimited_url").attr("href", sites_config.URL + "/auction-vin-checks");

  // 		try{
  //           console.log("Retrive Report Plans.");
  //           get_report_plans();
  //           //get_subscription();
  //         }catch(e){
  //           console.log("Can not retrive data. Triggering Local object.");
  //           report_plan_option("report_code", app_config.newpricing.plans);
  //           console.log("Error: "+e.message);
  //         }


  var discount = sessionStorage.getItem("discount");
  console.log(discount);
  if (discount != null) {
    discount = discount.toLowerCase();
    discount = (discount.includes('sticker')) ? discount.replace("sticker", "") : discount.replace("vhr", "");
    var tempDiscount = [];
    var price = Object.keys(sites_config.pricing).map(function (key) {
      tempDiscount.push(sites_config.pricing[key]);
      // sites_config.pricing[key] = $('.plan'+key)-((discount/100)*$('.plan'+key));
      //sites_config.pricing[key] = $('.plan'+key).toFixed(2);
      sites_config.pricing[key] = sites_config.pricing[key] - ((discount / 100) * sites_config.pricing[key]);
      sites_config.pricing[key] = sites_config.pricing[key].toFixed(2);

    });
  }
  $('.page-alert .close').click(function (e) {
    e.preventDefault();
    $(this).closest('.page-alert').slideUp();
  });

  $(".home_collection_form").click(function (event) {
    var discount = sessionStorage.getItem("discount");
    event.preventDefault();
    $('.error-user-vin').html("");
    $('.error-user-email').html("");
    $('#wpforms-field-limit-text-98878-3').remove();
    var email = $('.iemail input').val();

    var vin = $('.ivin input').val().toUpperCase();
    var mobile = $('.iphone input').val().split(" ").join("");
    var validate_email = IsEmail(email);
    var validate_vin = IsVin(vin);
    //discount = "CHRISTMAS50";
    if (validate_email == true && validate_vin == true) {
      $(".home_collection_form").html('Please wait...');
      //               $.ajax({
      //               type: "GET",
      //               url: sites_config.URL+"/landing/decode_data?vin="+vin,
      //               dataType: 'json',
      //               async:true,
      //               success: function (result) {
      //                 setCookie("decode", JSON.stringify(result),365);
      //               },
      //             });

      const state = { 'page': "home" }
      const title = ''
      const url = "https://" + domainName
      history.pushState(state, title, url)

      if (memberAreaPreview == "cwampv_proxy") {
        if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
          window.location.replace('https://' + domainName + "/vin-check/preview?vin=" + vin + "&email=" + email + "&mobile=" + mobile);
        } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
          window.location.replace('https://' + domainName + "/vin-check/preview?offer=" + discount + "&vin=" + vin + "&email=" + email + "&mobile=" + mobile);
        }
      } else if (memberAreaPreview == "cwampv") {
        if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
          window.location.replace('https://' + domainName + "/members/preview?vin=" + vin + "&email=" + email + "&mobile=" + mobile);
        } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
          window.location.replace('https://' + domainName + "/members/preview?offer=" + discount + "&vin=" + vin + "&email=" + email + "&mobile=" + mobile);
        }

      } else {

        if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
          window.location.replace(sites_config.URL + "/vin-check/preview?vin=" + vin + "&email=" + email + "&mobile=" + mobile);
          // window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
        } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
          window.location.replace(sites_config.URL + "/vin-check/preview?offer=" + discount + "&vin=" + vin + "&email=" + email + "&mobile=" + mobile);
          // window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
        } else if (sites_config.PROCESSING_PAGE == "enabled" && discount != null) {
          window.location.replace(sites_config.URL + "/vin-check/processing?offer=" + discount + "&vin=" + vin + "&email=" + email);
          // window.location.replace(sites_config.URL+"/vin-check/processing?offer=CHRISTMAS50&vin="+vin+"&email="+email);
        } else if (sites_config.PROCESSING_PAGE == "enabled" && discount == null) {
          window.location.replace(sites_config.URL + "/vin-check/processing?vin=" + vin + "&email=" + email);
          // window.location.replace(sites_config.URL+"/vin-check/processing?offer=CHRISTMAS50&vin="+vin+"&email="+email);
        }
      }

    } else {
      if (!IsEmail(email)) {
        $("#wpforms-98878-field_1-error").show();
        $("#wpforms-98878-field_1-error").html("<label style='color:red;'>Please Enter Valid Email</label>");
        //           		$(".iemail").after('<p style="color:red;" class="error-user-email">Please Enter Valid Email</p>');   
      } else if (!IsVin(vin)) {
        $(".ivin").after('<p style="color:red;" class="error-user-vin">Please Enter VIN number</p>');
      }

    }
  });


  $("#vin_ocr_form").on('submit', (function (event) {
    var discount = sessionStorage.getItem("discount");
    event.preventDefault();
    $("#email_error").remove();
    $("#other_error").remove();
    var email = $('#email').val();
    var vin = $('#vin').val().toUpperCase();
    var mobile = $('#phone').val(); //.split(" ").join("")
    var filename = $('input[type=file]').val(); //.replace(/C:\\fakepath\\/i, '')
    var validate_email = IsEmail(email);
    var validate_vin = IsVin(vin);
    var validate_file = IsFile(filename);
    // 		console.log(validate_email);
    // 		console.log(validate_vin);
    // 		console.log(validate_file);
    if (validate_email == true && (validate_vin == true || validate_file == true)) {
      $("#check_vin").html('Please wait...');

      // Check file selected or not
      if (validate_file == true) {

        $.ajax({
          type: "POST",
          url: "https://miocicvscormier.com/landing/get-vin-ocr",
          data: new FormData(this),
          dataType: 'json',
          contentType: false,
          cache: false,
          processData: false,
          success: function (response) {
            // 					  console.log(response.status);
            const state = { 'page': "home" }
            const title = ''
            const url = "https://" + domainName
            history.pushState(state, title, url)

            if (response.status == "success") {
              $('#vin').val(response.vin);
              if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
                window.location.replace(sites_config.URL + "/vin-check/preview?vin=" + response.vin + "&email=" + email + "&mobile=" + mobile);
                //window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
              } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
                window.location.replace(sites_config.URL + "/vin-check/preview?offer=VHR" + discount + "&vin=" + response.vin + "&email=" + email + "&mobile=" + mobile);
                //window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
              } else if (sites_config.PROCESSING_PAGE == "enabled" && discount != null) {
                window.location.replace(sites_config.URL + "/vin-check/processing?offer=VHR" + discount + "&vin=" + response.vin + "&email=" + email);
                //	  window.location.replace(sites_config.URL+"/vin-check/processing?offer=CHRISTMAS50&vin="+vin+"&email="+email);
              } else if (sites_config.PROCESSING_PAGE == "enabled" && discount == null) {
                window.location.replace(sites_config.URL + "/vin-check/processing?vin=" + response.vin + "&email=" + email);
                //		  window.location.replace(sites_config.URL+"/vin-check/processing?offer=CHRISTMAS50&vin="+vin+"&email="+email);
              }
            } else {
              $("#other_error").show();
              $("#captureimage").after('<span style="color:red;" id="other_error">Please Upload/Scan Valid VIN</span>');
            }

          },
        });

      } else {

        const state = { 'page': "home" }
        const title = ''
        const url = "https://" + domainName
        history.pushState(state, title, url)
        if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
          window.location.replace(sites_config.URL + "/vin-check/preview?vin=" + vin + "&email=" + email + "&mobile=" + mobile);
          //window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
        } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
          window.location.replace(sites_config.URL + "/vin-check/preview?offer=VHR" + discount + "&vin=" + vin + "&email=" + email + "&mobile=" + mobile);
          //   window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
        } else if (sites_config.PROCESSING_PAGE == "enabled" && discount != null) {
          window.location.replace(sites_config.URL + "/vin-check/processing?offer=VHR" + discount + "&vin=" + vin + "&email=" + email);
          //	   window.location.replace(sites_config.URL+"/vin-check/processing?offer=CHRISTMAS50&vin="+vin+"&email="+email);
        } else if (sites_config.PROCESSING_PAGE == "enabled" && discount == null) {
          window.location.replace(sites_config.URL + "/vin-check/processing?vin=" + vin + "&email=" + email);
          //		   window.location.replace(sites_config.URL+"/vin-check/processing?offer=CHRISTMAS50&vin="+vin+"&email="+email);
        }

      }

    } else {
      if (validate_email == false) {
        $("#email_error").show();
        $("#email").after('<span style="color:red;" id="email_error">Please Enter Valid Email</span>');
      } else if (validate_vin == false && validate_file == false) {
        $("#other_error").show();
        $("#captureimage").after('<span style="color:red;" id="other_error">Please Enter Valid VIN or Upload/Scan VIN</span>');
      }
    }

  }));

  // ----------------------------------------------------- start of vhr.Eu site ----------------------------------------------------- 
  // For EU Site vehiclehistory.eu

  // solution
//   jQuery("#eu-vin-decode").click(function (event) {
//     console.log('enterd.vhr.Eu redirect.js222');
//     // var discount = sessionStorage.getItem("discount");

//     // element data 
//     var email = jQuery('#form-field-email').val();
//     var vin = jQuery('#form-field-name').val().toUpperCase();
//     var mobile = jQuery('#form-field-phone').val();

//     // error element 
//     jQuery('#form-field-name2-error').html(""); //vin error
//     jQuery('#form-field-email2-error').html(""); //email error

//     // validate
//     // var validate_email = IsEmail(email);
//     // var validate_vin = IsVin(vin);
//     validate_email=true;
//     validate_vin=true;

//     if (validate_email == true && validate_vin == true) {
//         console.log('validate success vhr.Eu');
//         jQuery("#eu-vin-decode").html('Please wait...');
//         console.log('300');
//         window.location.replace(sites_config.URL+"/vin-check/preview?vin="+vin+"&email="+email+"&mobile="+mobile);
//         console.log('301');
//     }
// });


  // jQuery("#eu-vin-decode").click(function (event) {
  //   console.log('enterd.vhr.Eu');
  //   event.preventDefault();
  //   // var discount = getCookie('discount');
  //   var discount = sessionStorage.getItem("discount");
  //   jQuery('#form-field-name2-error').html(""); //vin error
  //   jQuery('#form-field-email2-error').html(""); //email error
  //   var email = jQuery('#form-field-email').val();
  //   //var email= jQuery('#wpforms-1853-field_2').val();
  //   var vin = jQuery('#form-field-name').val().toUpperCase();
  //   //var vin= jQuery('#wpforms-1853-field_1').val().toUpperCase();
  //   //  var mobile= jQuery('#form-field-field_5483cfa').val(); //.split(" ").join("");
  //   var mobile = jQuery('#form-field-phone').val();
  //   //var mobile= jQuery('#wpforms-1853-field_3').val().split(" ").join("");
  //   var validate_email = IsEmail(email);
  //   var validate_vin = IsVin(vin);
  //   //discount = "CHRISTMAS50";
  //   if (validate_email == true && validate_vin == true && vin.length == 17) {
  //     console.log('validate success vhr.Eu');
  //     jQuery("#eu-vin-decode").html('Please wait...');
  //     console.log('send get data...');
  //     jQuery.ajax({
  //       type: "GET",
  //       url: sites_config.URL + "/landing/decode_data?vin=" + vin,
  //       dataType: 'json',
  //       async: true,
  //       success: function (result) {
  //         setCookie("decode", JSON.stringify(result), 365);
  //       },
  //     });
  //     console.log('get data success vhr.Eu');
      
  //     const state = { 'page': "home" }
  //     const title = ''
  //     const url = "https://" + domainName
  //     history.pushState(state, title, url)
  //     mappedvin = CheckMappedVINForReport(vin);
  //     console.log('check mapped vin done vhr.Eu: ', mappedvin);
  //     console.log('entering If maze vhr.Eu');
  //     if (memberAreaPreview == "cwampv_proxy") {
  //       console.log('cwampv_proxy if');
  //       if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
  //         window.location.replace('https://'+domainName+"/vin-check/preview?vin=" + vin + "&email=" + email + "&mobile=" + mobile);
  //       } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
  //         window.location.replace('https://'+domainName+"/vin-check/preview?offer=" + discount + "&vin=" + vin + "&email=" + email + "&mobile=" + mobile);
  //       }
        
  //     } else if (memberAreaPreview == "cwampv") {
  //       console.log('cwampv if');
  //       if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
  //         window.location.replace('https://' + domainName + "/members/preview?vin=" + vin + "&email=" + email + "&mobile=" + mobile);
  //         // 			   window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
  //       } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
  //         window.location.replace('https://' + domainName + "/members/preview?offer=" + discount + "&vin=" + vin + "&email=" + email + "&mobile=" + mobile);
  //         // 			   window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
  //       }
  //     } else {
  //       console.log('else if');
  //       if (vin.trim().length > 15 || vin.trim().length <= 15) {
  //         console.log('0');
  //         if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
  //           console.log('1');
  //           window.location.href="https://app.vehiclehistory.eu/vin-check/preview?vin=" + vin + "&email=" + email + "&mobile=" + mobile;
  //           console.log('1 done1');
  //           console.log("redirection done")
  //         } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
  //           console.log('2');
  //           window.location.href="https://app.vehiclehistory.eu/vin-check/preview?offer=" + discount + "&vin=" + vin + "&email=" + email + "&mobile=" + mobile;
  //           console.log('2 done2');
  //           // 			   window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
  //         } else if (sites_config.PROCESSING_PAGE == "enabled" && discount != null) {
  //           console.log('3');
  //           window.location.href="https://app.vehiclehistory.eu/vin-check/processing?offer=" + discount + "&vin=" + vin + "&email=" + email;
  //           console.log('3 done3');
  //           // 			   window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
  //         } else if (sites_config.PROCESSING_PAGE == "enabled" && discount == null) {
  //           console.log('4');
  //           window.location.href="https://app.vehiclehistory.eu/vin-check/preview?vin=" + vin + "&email=" + email + "&mobile=" + mobile;
  //           console.log('4 done4');
  //         }
  //       } else {
  //         console.log('5');
  //         if (discount == null) {
  //           console.log('6');
  //           window.location.replace(sites_config.URL + "/confirm?vin=" + vin + "&email=" + email + "&mobile=" + mobile + "&type=vhr");
  //         } else {
  //           console.log('7');
  //           window.location.replace(sites_config.URL + "/confirm?offer=" + discount + "&vin=" + vin + "&email=" + email + "&mobile=" + mobile + "&type=vhr");
  //         }
  //       }
  //     }
  //   } else {
  //     if (!IsEmail(email)) {
  //       jQuery("#form-field-email").after('<div style="color:red;" id="form-field-email2-error">Please Enter Valid Email</div>');
  //       jQuery("#form-field-email").removeAttr('disabled');
  //     }
  //     else if (!IsVin(vin) || vin.length < 17) {
  //       if (vin == "") {
  //         jQuery("#form-field-name").after('<div style="color:red;" id="form-field-name2-error">Please Enter VIN number</div>');
  //       }
  //       else if (vin.length < 17) {
  //         jQuery("#form-field-name").after('<div style="color:red;" id="form-field-name2-error">Please Enter 17 character VIN</div>');
  //       }
  //       jQuery("#form-field-name").removeAttr('disabled');
  //     }
  //   }
  //   console.log('done If maze vhr.Eu');
  // });
  
  // For EU Site vehiclehistory.eu

  $("#search-btn").click(function (event) {
    console.log('enterd2');
    event.preventDefault();
    // var discount = getCookie('discount');
    var discount = sessionStorage.getItem("discount");
    jQuery('#form-field-vin-error').html(""); //vin error
    jQuery('#form-field-email1-error').html(""); //email error
    var email = $('#form-field-email1').val();
    var vin = $('#form-field-vin').val().toUpperCase();
    var mobile = $('#form-field-form_field_phone').val(); //$('#form-field-field_6f6cd8c').val(); //.split(" ").join("");
    var validate_email = IsEmail(email);
    var validate_vin = IsVin(vin);
    //discount = "CHRISTMAS50";
    if (validate_email == true && validate_vin == true && vin.length < 17) {
      jQuery("#search-btn").html('Please wait...');
      $.ajax({
        type: "GET",
        url: sites_config.URL + "/landing/decode_data?vin=" + vin,
        dataType: 'json',
        async: true,
        success: function (result) {
          setCookie("decode", JSON.stringify(result), 365);
        },
      });

      const state = { 'page': "home" }
      const title = ''
      const url = "https://" + domainName
      history.pushState(state, title, url)
      CheckMappedVINForReport(vin);
      if (memberAreaPreview == "cwampv_proxy"){

        if (vin.trim().length > 15 || (vin.trim().length <= 15 && mappedvin != "error")) {
          if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
            window.location.replace('https://'+domainName+"/vin-check/preview?vin=" + vin + "&email=" + email + "&mobile=" + mobile);
          } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
            window.location.replace('https://'+ domainName+"/vin-check/preview?offer=" + discount + "&vin=" + vin + "&email=" + email + "&mobile=" + mobile);

          }
        } else {
          if (discount == null) {
            window.location.replace('https://'+domainName+ "/confirm?vin=" + vin + "&email=" + email + "&mobile=" + mobile + "&type=vhr");
          } else {
            window.location.replace('https://'+domainName+ "/confirm?offer=" + discount + "&vin=" + vin + "&email=" + email + "&mobile=" + mobile + "&type=vhr");
          }
        }

      }else if(memberAreaPreview == "cwampv"){

        if (vin.trim().length > 15 || (vin.trim().length <= 15 && mappedvin != "error")) {
          if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
            window.location.replace('https://'+domainName+"/members/preview?vin=" + vin + "&email=" + email + "&mobile=" + mobile);
          } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
            window.location.replace('https://'+ domainName+"/members/preview?offer=" + discount + "&vin=" + vin + "&email=" + email + "&mobile=" + mobile);

          }
        } else {
          if (discount == null) {
            window.location.replace('https://'+domainName+ "/confirm?vin=" + vin + "&email=" + email + "&mobile=" + mobile + "&type=vhr");
          } else {
            window.location.replace('https://'+domainName+ "/confirm?offer=" + discount + "&vin=" + vin + "&email=" + email + "&mobile=" + mobile + "&type=vhr");
          }
        }

      }else{

        if (vin.trim().length > 15 || (vin.trim().length <= 15 && mappedvin != "error")) {
          if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
            window.location.replace(sites_config.URL + "/vin-check/preview?vin=" + vin + "&email=" + email + "&mobile=" + mobile);
            // 			   window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
          } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
            window.location.replace(sites_config.URL + "/vin-check/preview?offer=" + discount + "&vin=" + vin + "&email=" + email + "&mobile=" + mobile);
            // 			   window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
          } else if (sites_config.PROCESSING_PAGE == "enabled" && discount != null) {
            window.location.replace(sites_config.URL + "/vin-check/processing?offer=" + discount + "&vin=" + vin + "&email=" + email);
            // 			   window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
          } else if (sites_config.PROCESSING_PAGE == "enabled" && discount == null) {
            window.location.replace(sites_config.URL + "/vin-check/preview?vin=" + vin + "&email=" + email + "&mobile=" + mobile);
          }
        } else {
          if (discount == null) {
            window.location.replace(sites_config.URL + "/confirm?vin=" + vin + "&email=" + email + "&mobile=" + mobile + "&type=vhr");
          } else {
            window.location.replace(sites_config.URL + "/confirm?offer=" + discount + "&vin=" + vin + "&email=" + email + "&mobile=" + mobile + "&type=vhr");
          }
        }
      }
    }else {
      if (!IsEmail(email)) {
        jQuery("#form-field-email1").after('<p style="color:red;" id="form-field-email1-error">Please Enter Valid Email</p>');
        jQuery("#form-field-email1").removeAttr('disabled');
      }
      else if (!IsVin(vin) || vin.length < 17) {
        if (vin == "") {
          jQuery("#form-field-vin").after('<p style="color:red;" id="form-field-vin-error">Please Enter VIN number</p>');
        }
        else if (vin.length < 17) {
          jQuery("#form-field-vin").after('<p style="color:red;" id="form-field-vin-error">Please Enter 17 character VIN</p>');
        }
        jQuery("#form-field-vin").removeAttr('disabled');
      }
    }
  });
  // ----------------------------------------------------- end of vhr.Eu site ----------------------------------------------------- 

  // ----------------------------------------------------- start of CD site ----------------------------------------------------- 

  if(window.location.hostname == "pintonaturals.com"){
    var cdDomainName = "pintonaturals.com"; //window.location.hostname;
    var cdVOneDomainName = "https://app.pintonaturals.com";
    var site_id = 23;
  }else{
    var cdDomainName = "classicdecoder.com"; //window.location.hostname;
    var cdVOneDomainName = "https://app.classicdecoder.com";
    var site_id = 91;
  }

  $(".home_collection_form_cd").click(function (event) {
    console.log('enterd1');
    var discount = sessionStorage.getItem("discount");
    event.preventDefault();
    jQuery('#wpforms-1853-field_1-error').html(""); //vin error
    jQuery('#wpforms-1853-field_2-error').html(""); //email error
    var email = $('.iemail input').val();
    //var email= jQuery('#wpforms-1853-field_2').val();
    console.log(email);
    var vin = $('.ivin input').val().toUpperCase();
    //var vin= jQuery('#wpforms-1853-field_1').val().toUpperCase();
    var mobile = $('.iphone input').val().split(" ").join("");
    //var mobile= jQuery('#wpforms-1853-field_3').val().split(" ").join("");
    var validate_email = IsEmail(email);
    var validate_vin = IsVin(vin);

    //discount = "CHRISTMAS50";
    if (validate_email == true && validate_vin == true) {
      jQuery(".home_collection_form_cd").html('Please wait...');

      //manage browser state on page
      const state = { 'page': "home" }
      const title = ''
      const url = "https://" + cdDomainName
      history.pushState(state, title, url)

      //Check User Type on V1
      $.ajax({
        type: "POST",
        url: cdVOneDomainName+"/landing/check-usertype",
        data: {
          email: email,
          site_id: site_id
        },
        dataType: 'json',
        success: function (result) {
          // var getmemberarea = memberareaprev ?? "none";
          // console.log(memberarea);
          //Check vin digits
          if(vin.length > 15){
            //check member area in site settings
            if(memberAreaPreview != "" && memberAreaPreview == "cwampv"){
              //redirect to cwa preview page
              if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
                  window.location.replace("https://members."+cdDomainName+"/members/preview?vin="+vin+"&email="+email+"&mobile="+mobile+"&source=vhr");
              } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
                  window.location.replace("https://members."+cdDomainName+"/members/preview?offer="+discount+"&vin="+vin+"&email="+email+"&mobile="+mobile+"&source=vhr");
              }
            }else if(memberAreaPreview == "cwampv_proxy"){
              if(discount == null) {
                window.location.replace("https://"+cdDomainName+"/vin-check/preview?vin="+vin+"&email="+email+"&mobile="+mobile);    
              }else{
                window.location.replace("https://"+cdDomainName+"/vin-check/preview?offer="+discount+"&vin="+vin+"&email="+email+"&mobile="+mobile);    
              }         
            }else{
              //redirect to v1 app. preview page
              if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
                window.location.replace(cdVOneDomainName+"/vin-check/preview?vin="+vin+"&email="+email+"&mobile="+mobile);           
              } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
                window.location.replace(cdVOneDomainName+"/vin-check/preview?offer="+discount+"&vin="+vin+"&email="+email+"&mobile="+mobile);
              }
            }
          }else{
            //check usertype in v1
            if(result.data != null && result.data != false && result.data.utype == 'cwa'){
              //check member area in site settings
              if(memberAreaPreview != "" && memberAreaPreview == "cwampv"){
                //redirect to cwa preview page
                if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
                  window.location.replace("https://members."+cdDomainName+"/members/preview?vin="+vin+"&email="+email+"&mobile="+mobile+"&source=vhr");           
                } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
                  window.location.replace("https://members."+cdDomainName+"/members/preview?offer="+discount+"&vin="+vin+"&email="+email+"&mobile="+mobile+"&source=vhr");
                }
              }else if(memberAreaPreview == "cwampv_proxy"){
                if(discount == null) {
                  window.location.replace("https://"+cdDomainName+"/vin-check/preview?vin="+vin+"&email="+email+"&mobile="+mobile);    
                }else{
                  window.location.replace("https://"+cdDomainName+"/vin-check/preview?offer="+discount+"&vin="+vin+"&email="+email+"&mobile="+mobile);    
                }         
              }else{
                //redirect to v1 app. preview page
                if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
                  window.location.replace(cdVOneDomainName+"/vin-check/preview?vin="+vin+"&email="+email+"&mobile="+mobile);           
                } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
                  window.location.replace(cdVOneDomainName+"/vin-check/preview?offer="+discount+"&vin="+vin+"&email="+email+"&mobile="+mobile);
                }
              }                            
            }else{
              //redirect to cd preview page
              if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
                window.location.replace("https://"+cdDomainName+"/vehicle/preview?vin=" + vin + "&email=" + email + "&type=vhr&phone=" + mobile);                
              } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
                window.location.replace("https://"+cdDomainName+"/vehicle/preview?offer=" + discount + "&vin=" + vin + "&email=" + email + "&type=vhr&phone=" + mobile);                
              }
            }
          }
        },
      });
      //               $.ajax({
      //               type: "GET",
      //               url: sites_config.URL+"/landing/decode_data?vin="+vin,
      //               dataType: 'json',
      //               async:true,
      //               success: function (result) {
      //                 setCookie("decode", JSON.stringify(result),365);
      //               },
      //             });

      // const state = { 'page': "home" }
      // const title = ''
      // const url = "https://" + cdDomainName //"https://members."+domainName
      // if (cdDomainName == "classicdecoder.com") {
        // history.pushState(state, title, url)
      // }else{
      //   history.pushState(state, title, url)
      // };

      // if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
      //   // window.location.replace("/vehicle/preview?vin="+vin+"&email="+email+"&type=vhr&phone="+mobile);
      //   window.location.replace("https://classicdecoder.com/vehicle/preview?vin=" + vin + "&email=" + email + "&type=vhr&phone=" + mobile); //for testing site
      // } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
      //   // window.location.replace("/vehicle/preview?offer="+discount+"&vin="+vin+"&email="+email+"&type=vhr&phone="+mobile);
      //   window.location.replace("https://classicdecoder.com/vehicle/preview?offer=" + discount + "&vin=" + vin + "&email=" + email + "&type=vhr&phone=" + mobile); //for testing site
      // };
    } else {
      if (!IsVin(vin)) {
        //if(validate_vin != true){
        jQuery("#wpforms-1853-field_1").after('<p style="color:red;" id="wpforms-1853-field_1-error">Please Enter VIN number</p>');
      } else if (!IsEmail(email)) {
        //}else if(validate_email != true){
        jQuery("#wpforms-1853-field_2").after('<p style="color:red;" id="wpforms-1853-field_2-error">Please Enter Valid Email</p>');
      }
    }
  });

  $(".btn-classic-sticker").click(function (event) {

    console.log('enterd3');
    var discount = sessionStorage.getItem("discount");
    event.preventDefault();
    jQuery('#wpforms-4033-field_2-error').html(""); //vin error
    jQuery('#wpforms-4033-field_1-error').html(""); //email error
    var email = $('.iemail input').val();
    //var email= jQuery('#wpforms-1853-field_2').val();
    console.log(email);
    var vin = $('.ivin input').val().toUpperCase();
    //var vin= jQuery('#wpforms-1853-field_1').val().toUpperCase();
    var mobile = $('.iphone input').val().split(" ").join("");
    //var mobile= jQuery('#wpforms-1853-field_3').val().split(" ").join("");
    var validate_email = IsEmail(email);
    var validate_vin = IsVin(vin);
    //discount = "CHRISTMAS50";
    if (validate_email == true && validate_vin == true) {
      jQuery(".btn-classic-sticker").html('Please wait...');

      //manage browser state on page
      const state = { 'page': "home" }
      const title = ''
      const url = "https://" + cdDomainName
      history.pushState(state, title, url)

      //Check User Type on V1
      $.ajax({
        type: "POST",
        url: sites_config.vOneURL+"/landing/check-usertype",
        data: {
          email: email,
          site_id: site_id
        },
        dataType: 'json',
        success: function (result) {
          // var getmemberarea = memberareaprev ?? "none";
          // console.log(memberarea);
          //Check vin digits
          if(vin.length > 15){
            //check member area in site settings
            if(memberAreaPreview != "" && memberAreaPreview == "cwampv"){
              //redirect to v1 preview page
              if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
                window.location.replace("https://members."+cdDomainName+"/members/preview?vin="+vin+"&email="+email+"&mobile="+mobile+"&source=sticker");           
              } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
                window.location.replace("https://members."+cdDomainName+"/members/preview?offer="+discount+"&vin="+vin+"&email="+email+"&mobile="+mobile+"&source=sticker");
              }
            }else if(memberAreaPreview == "cwampv_proxy"){
              if(discount == null) {
                window.location.replace("https://"+cdDomainName+"/vin-check/ws-preview?vin="+vin+"&email="+email+"&mobile="+mobile);    
              }else{
                window.location.replace("https://"+cdDomainName+"/vin-check/ws-preview?offer="+discount+"&vin="+vin+"&email="+email+"&mobile="+mobile);    
              }         
            }else{
              //redirect to v1 app. preview page
              if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
                window.location.replace(cdVOneDomainName+"/vin-check/ws-preview?vin="+vin+"&email="+email+"&mobile="+mobile);           
              } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
                window.location.replace(cdVOneDomainName+"/vin-check/ws-preview?offer="+discount+"&vin="+vin+"&email="+email+"&mobile="+mobile);
              }
            }
          }else{
            //check usertype in v1
            if(result.data != null && result.data != false && result.data.utype == 'cwa'){
              if(memberAreaPreview != "" && memberAreaPreview == "cwampv"){
                //redirect to v1 preview page
                if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
                  window.location.replace("https://members."+cdDomainName+"/members/preview?vin="+vin+"&email="+email+"&mobile="+mobile+"&source=sticker");           
                } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
                  window.location.replace("https://members."+cdDomainName+"/members/preview?offer="+discount+"&vin="+vin+"&email="+email+"&mobile="+mobile+"&source=sticker");
                }
              }else if(memberAreaPreview == "cwampv_proxy"){
                if(discount == null) {
                  window.location.replace("https://"+cdDomainName+"/vin-check/ws-preview?vin="+vin+"&email="+email+"&mobile="+mobile);    
                }else{
                  window.location.replace("https://"+cdDomainName+"/vin-check/ws-preview?offer="+discount+"&vin="+vin+"&email="+email+"&mobile="+mobile);    
                }         
              }else{
                //redirect to v1 preview page
                if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
                  window.location.replace(cdVOneDomainName+"/vin-check/ws-preview?vin="+vin+"&email="+email+"&mobile="+mobile);           
                } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
                  window.location.replace(cdVOneDomainName+"/vin-check/ws-preview?offer="+discount+"&vin="+vin+"&email="+email+"&mobile="+mobile);
                }
              }
            }else{
              //redirect to cd preview page
              if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
                window.location.replace("https://"+cdDomainName+"/vehicle/preview?vin=" + vin + "&email=" + email + "&type=sticker&phone=" + mobile);                
              } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
                window.location.replace("https://"+cdDomainName+"/vehicle/preview?offer=" + discount + "&vin=" + vin + "&email=" + email + "&type=sticker&phone=" + mobile);                
              }
            }
          }
        },
      });

      //               $.ajax({
      //               type: "GET",
      //               url: sites_config.URL+"/landing/decode_data?vin="+vin,
      //               dataType: 'json',
      //               async:true,
      //               success: function (result) {
      //                 setCookie("decode", JSON.stringify(result),365);
      //               },
      //             });

      // const state = { 'page': "home" }
      // const title = ''
      // const url = "https://" + domainName //"https://members."+domainName
      // history.pushState(state, title, url)
      // if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
      //   window.location.replace("/vehicle/preview?vin=" + vin + "&email=" + email + "&type=sticker&phone=" + mobile);

      //   // 			   window.location.replace(sites_config.URL+"/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
      // } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
      //   window.location.replace("/vehicle/preview?offer=" + discount + "&vin=" + vin + "&email=" + email + "&type=sticker&phone=" + mobile);

      //   // 			   window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
      // }
    } else {
      if (!IsVin(vin)) {
        jQuery("#wpforms-4033-field_2").after('<p style="color:red;" id="wpforms-4033-field_2-error">Please Enter VIN number</p>');
      } else if (!IsEmail(email)) {
        jQuery("#wpforms-4033-field_1").after('<p style="color:red;" id="wpforms-4033-field_1-error">Please Enter Valid Email</p>');
      }

    }
  });

  // ----------------------------------------------------- end of CD site ----------------------------------------------------- 
  // ----------------------------------------------------- Start of SCC site -----------------------------------------------------

  $(".home_collection_form_scc").click(function (event) {
    console.log("Scc")
    var discount = sessionStorage.getItem("discount");
    event.preventDefault();
    $(".forminator-error-message1").html("");
    $(".forminator-error-message2").html("");
    var email = $('#forminator-field-email-1').val();
    var vin = $('#forminator-field-text-1').val(); //.toUpperCase();
    var mobile = $('#forminator-field-phone-1').val(); //.split(" ").join("");
    console.log(vin);
    var validate_email = IsEmail(email);
    var validate_vin = IsVin(vin);
    // 			console.log(validate_vin);
    if (validate_email == true && validate_vin == true) {
      $(".forminator-error-message1").html("");
      $('.forminator-error-message2').html("");
      //$(".wpforms-2497-field_3-error").html("");
      $(".home_collection_form_scc").html('Please wait...');
      if (vin.length <= 7) {
        $.ajax({
          type: "POST",
          data: {
            regno: vin
          },
          url: sites_config.URL + "/landing/get_uklicense",
          dataType: 'json',
          // 			async:false,
          success: function (result) {
            if (result.status != 'error') {
              setCookie("decode", JSON.stringify(result), 365);
              console.log('entered');
              const state = { 'page': "home" }
              const title = ''
              const url = "https://" + domainName
              history.pushState(state, title, url);
              console.log(memberAreaPreview)
              console.log(domainName)
              if(memberAreaPreview == "cwampv_proxy"){
                if (sites_config.PROCESSING_PAGE == "disabled" && discount == null  ) {
                  window.location.replace('https://'+domainName + "/landing/preview?regNo=" + vin + "&email=" + email + "&mobile=" + mobile);
                } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
                  window.location.replace('https://'+domainName+ "/landing/preview?regNo=" + vin + "&offer=" + discount + "&email=" + email + "&mobile=" + mobile);
                } else if (sites_config.PROCESSING_PAGE == "enabled" && discount != null) {
                  window.location.replace('https://'+domainName+"/landing/processing?regNo=" + vin + "&offer=" + discount + "&email=" + email);
                } else if (sites_config.PROCESSING_PAGE == "enabled" && discount == null) {
                  window.location.replace('https://'+domainName+ "/landing/processing?regNo=" + vin + "&email=" + email);
                }
              }else{
                if (sites_config.PROCESSING_PAGE == "disabled" && discount == null  ) {
                  window.location.replace(sites_config.URL + "/landing/preview?regNo=" + vin + "&email=" + email + "&mobile=" + mobile);
                } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
                  window.location.replace(sites_config.URL + "/landing/preview?regNo=" + vin + "&offer=" + discount + "&email=" + email + "&mobile=" + mobile);
                } else if (sites_config.PROCESSING_PAGE == "enabled" && discount != null) {
                  window.location.replace(sites_config.URL + "/landing/processing?regNo=" + vin + "&offer=" + discount + "&email=" + email);
                } else if (sites_config.PROCESSING_PAGE == "enabled" && discount == null) {
                  window.location.replace(sites_config.URL + "/landing/processing?regNo=" + vin + "&email=" + email);
                }
              }
            } else {
              $(".forminator-error-message1").html("");
              $('.forminator-error-message2').html("");
              //$(".wpforms-2497-field_3-error").html("");
              $(".home_collection_form_scc").html('CHECK VEHICLE');
              //$('.forminator-error-message').hide();
              $("#forminator-field-text-1").after('<span style="color:red;" class="forminator-error-message2">Opps! Records against this registration number has not been found. Please verify your entry or contact support for assistance.</span>');
              if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
                window.location.replace("https://" + domainName + "/vehicle-not-found/");
              } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
                window.location.replace("https://" + domainName + "/vehicle-not-found/?offer=" + discount);
              }
            }
          }
        });
      } else if (vin.length > 7 && vin.length <= 17) {
        const state = { 'page': "home" }
        const title = ''
        const url = "https://" + domainName
        history.pushState(state, title, url);
        if(memberAreaPreview == "cwampv_proxy"){

          if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
            window.location.replace('https://'+domainName+ "/landing/preview?vin=" + vin + "&email=" + email + "&mobile=" + mobile);
          } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
            window.location.replace('https://'+domainName+ "/landing/preview?vin=" + vin + "&offer=" + discount + "&email=" + email + "&mobile=" + mobile);
          } else if (sites_config.PROCESSING_PAGE == "enabled" && discount != null) {
            window.location.replace('https://'+domainName+ "/landing/processing?vin=" + vin + "&offer=" + discount + "&email=" + email);
          } else if (sites_config.PROCESSING_PAGE == "enabled" && discount == null) {
            window.location.replace('https://'+domainName+ "/landing/processing?vin=" + vin + "&email=" + email);
          }
        }else{
          if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
            window.location.replace(sites_config.URL + "/landing/preview?vin=" + vin + "&email=" + email + "&mobile=" + mobile);
          } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
            window.location.replace(sites_config.URL + "/landing/preview?vin=" + vin + "&offer=" + discount + "&email=" + email + "&mobile=" + mobile);
          } else if (sites_config.PROCESSING_PAGE == "enabled" && discount != null) {
            window.location.replace(sites_config.URL + "/landing/processing?vin=" + vin + "&offer=" + discount + "&email=" + email);
          } else if (sites_config.PROCESSING_PAGE == "enabled" && discount == null) {
            window.location.replace(sites_config.URL + "/landing/processing?vin=" + vin + "&email=" + email);
          }
        }
      }
    } else {
      if (!IsEmail(email)) {
        $(".forminator-error-message2").html("");
        //$('.forminator-error-message').show();
        $("#forminator-field-email-1").after('<span style="color:red;" class="forminator-error-message1">Please Enter Valid Email</span>');
      } else if (!IsVin(vin)) {
        $(".forminator-error-message1").html("");
        //$('.forminator-error-message').hide();
        $("#forminator-field-text-1").after('<span style="color:red;" class="forminator-error-message2">Please Enter Valid Reg Number</span>');
      }
    }
    //console.log(email +" "+ vin +" "+mobile);
  });

  $(".forminator-button-submit.pricing_code_btn_scc").click(function (eve) {
    console.log(eve);
    // 		  var pricing_email = $('#wpforms-2499-field_1').val();
    //           var pricing_vin = $('#wpforms-2499-field_2').val();
    // 		  var pricing_phone = $('#wpforms-2499-field_3').val();
    // 		  var pricing_code = $('#pcode').val(); //'DVH1'
    eve.preventDefault();
    // 		  console.log(pricing_email);
    // 		  console.log(pricing_vin);
    // 		  console.log(pricing_phone);
    // 		  console.log($('.code').val());
    //paoc-popup-2498-7
    var pricing_email = $('#wpforms-2499-field_1').val();
    var pricing_vin = $('#wpforms-2499-field_2').val();

    if ($('#paoc-popup-2498-7 .pricingemail input').val() != '' && $('#paoc-popup-2498-7 .regnumber input').val() != '') {
      var pricing_email = $('#paoc-popup-2498-7 .pricingemail input').val();
      var pricing_vin = $('#paoc-popup-2498-7 .regnumber input').val();
      var pricing_code = 'UKB1'
    }

    if ($('#paoc-popup-2930-8 .pricingemail input').val() != '' && $('#paoc-popup-2930-8 .regnumber input').val() != '') {
      var pricing_email = $('#paoc-popup-2930-8 .pricingemail input').val();
      var pricing_vin = $('#paoc-popup-2930-8 .regnumber input').val();
      var pricing_code = 'UKB2'
    }

    if ($('#paoc-popup-2931-9 .pricingemail input').val() != '' && $('#paoc-popup-2931-9 .regnumber input').val() != '') {
      var pricing_email = $('#paoc-popup-2931-9 .pricingemail input').val();
      var pricing_vin = $('#paoc-popup-2931-9 .regnumber input').val();
      var pricing_code = 'UKB3'
    }

    if ($('#paoc-popup-2932-10 .pricingemail input').val() != '' && $('#paoc-popup-2932-10 .regnumber input').val() != '') {
      var pricing_email = $('#paoc-popup-2932-10 .pricingemail input').val();
      var pricing_vin = $('#paoc-popup-2932-10 .regnumber input').val();
      var pricing_code = 'UKP1'
    }

    if ($('#paoc-popup-2933-11 .pricingemail input').val() != '' && $('#paoc-popup-2933-11 .regnumber input').val() != '') {
      var pricing_email = $('#paoc-popup-2933-11 .pricingemail input').val();
      var pricing_vin = $('#paoc-popup-2933-11 .regnumber input').val();
      var pricing_code = 'UKP2'
    }

    if ($('#paoc-popup-2934-12 .pricingemail input').val() != '' && $('#paoc-popup-2934-12 .regnumber input').val() != '') {
      var pricing_email = $('#paoc-popup-2934-12 .pricingemail input').val();
      var pricing_vin = $('#paoc-popup-2934-12 .regnumber input').val();
      var pricing_code = 'UKP3'
    }

    //         	var pricing_code = $('.code input').val();
    var domainName = window.location.hostname;
    document.cookie = "cart_plan=" + pricing_code + "; expires=365; path=/; secure; domain=." + domainName;
    //alert( document.cookie );

    // var discount = getCookie('discount');
    var discount = sessionStorage.getItem("discount");
    console.log(pricing_email);
    console.log(pricing_vin);
    if (pricing_email == '') {
      $(".error-pricing-email").html('');
      $(".error-pricing-vin").html('');
      $(".pricingemail").after('<p style="color:red;" class="error-pricing-email">Please Enter Valid Email</p>');

    }
    else if (pricing_vin == '') {
      $(".error-pricing-vin").html('');
      $(".error-pricing-email").html('');
      $(".pricing_vin").after('<p style="color:red;" class="error-pricing-vin">Please Enter Valid Reg Number</p>');
    } else {
      $(".forminator-button-submit.pricing_code_btn").html("Please Wait...")
      $.ajax({
        type: "POST",
        data: {
          regno: pricing_vin
        },
        url: sites_config.URL + "/landing/get_uklicense",
        dataType: 'json',
        // 			async:false,
        success: function (result) {
          // 						console.log(result);
          const state = { 'page': "home" }
          const title = ''
          const url = "https://" + domainName
          history.pushState(state, title, url);
          if (result.status != 'error') {
            if(memberAreaPreview == "cwampv_proxy"){

              if (discount != null) {
                window.location.replace("https://" + domainName + "/vin-check/preview?offer=" + discount + "&vin=" + pricing_vin + "&email=" + pricing_email);
              } else if (discount == null) {
                window.location.replace("https://" + domainName + "/vin-check/preview?vin=" + pricing_vin + "&email=" + pricing_email);
              }
            }else{
              if (discount != null) {
                window.location.replace(sites_config.URL + "/vin-check/preview?offer=" + discount + "&vin=" + pricing_vin + "&email=" + pricing_email);
              } else if (discount == null) {
                window.location.replace(sites_config.URL + "/vin-check/preview?vin=" + pricing_vin + "&email=" + pricing_email);
              }
            }
          } else {
            $(".error-pricing-vin").html('');
            $(".error-pricing-email").html('');
            // 						    $(".pricing_vin").after('<p style="color:red;" class="error-pricing-vin">Opps! No record found, please try again later</p>');
            $(".pricing_vin").after('<span style="color:red;" class="error-pricing-vin">Opps! Records against this registration number has not been found. Please verify your entry or contact support for assistance.</span>');
            if(memberAreaPreview == "cwampv_proxy"){

              if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
                window.location.replace("https://" + domainName + "/vehicle-not-found/");
              } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
                window.location.replace("https://" + domainName + "/vehicle-not-found/?offer=" + discount);
              }

            }else{
               if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
                window.location.replace("https://" + domainName + "/vehicle-not-found/");
              } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
                window.location.replace("https://" + domainName + "/vehicle-not-found/?offer=" + discount);
              }
            }
            // 							setTimeout(function(){
            // 								if(sites_config.PROCESSING_PAGE == "disabled" && discount == null){
            // 									window.location.replace("https://"+domainName+"/vehicle-not-found/");
            // 								}else if(sites_config.PROCESSING_PAGE == "disabled" && discount != null){
            // 									window.location.replace("https://"+domainName+"/vehicle-not-found/?offer=VHR"+discount);
            // 								}
            // 							}, 5000);
          }
        }
      });
    }
    //         console.log(pricing_code);
  });

  // ----------------------------------------------------- End of SCC site ----------------------------------------------------- 


  // 	$("#lp_ocr_form").on('submit',(function(event) {
  //         event.preventDefault();
  // 		$("#lpemail_error").remove();
  // 		$("#lpother_error").remove();
  // 		const state = { 'page':"home"}
  //         const title = ''
  //         const url =window.location.href;
  // 		history.pushState(state, title, url);

  //         var email= $('#lpemail').val();
  // 		var license_plate= $('#lplate').val().split(" ").join("");
  //         var license_state= $('#lpstate').find(":selected").text().split("-")[0].trim();
  //         var mobile= $('#lphone').val(); //.split(" ").join("")
  // 		var filename = $('input[type=file]').val(); //.replace(/C:\\fakepath\\/i, '')
  //         var validate_email = IsEmail(email);
  // 		var validate_file = IsFile(filename);
  // // 		console.log(validate_email);
  // // 		console.log(validate_vin);
  // // 		console.log(validate_file);
  // 		var discount = sessionStorage.getItem("discount");
  //         if(repeat == 2){
  // 			var license_vin = $('#lvin').val().toUpperCase();;
  // 		  	var validate_lvin = IsVin(license_vin);

  // 		}else{
  // 			if(validate_email == false){
  // 				$("#lpemail_error").show();
  // 				$("#lpemail").after('<span style="color:red;" id="lpemail_error">Please Enter Valid Email</span>');
  // 			}else if(license_plate == ''){
  // 				$("#lpother_error").show();
  // 				$("#captureimage").after('<span style="color:red;" id="lpother_error">Please Enter Valid License Plate or Upload/Scan License Plate</span>');
  // 			}else{

  // 			}
  // 		}

  //  		if(validate_email == true && (validate_vin == true || validate_file == true)){
  //           	$("#check_vin").html('Please wait...');

  //           	// Check file selected or not
  //           	if(validate_file == true){

  //             	$.ajax({
  // 				  type: "POST",
  // 				  url: "https://miocicvscormier.com/landing/get-vin-ocr",
  // 				  data:  new FormData(this),
  // 				  dataType: 'json',
  // 				  contentType: false,
  // 				  cache: false,
  // 				  processData:false,
  // 				  success:function(response){
  // // 					  console.log(response.status);
  // 					  const state = { 'page':"home"}
  // 					  const title = ''
  // 					  const url = "https://"+domainName
  // 					  history.pushState(state, title, url)

  // 					  if(response.status == "success"){
  // 						  $('#vin').val(response.vin);
  // 						  if(sites_config.PROCESSING_PAGE == "disabled" && discount == null){
  // 							  window.location.replace(sites_config.URL+"/vin-check/preview?vin="+response.vin+"&email="+email+"&mobile="+mobile);
  // 							  //window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
  // 						   }else if(sites_config.PROCESSING_PAGE == "disabled" && discount != null){
  // 							  window.location.replace(sites_config.URL+"/vin-check/preview?offer=VHR"+discount+"&vin="+response.vin+"&email="+email+"&mobile="+mobile);
  // 							//window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
  // 						   }else if(sites_config.PROCESSING_PAGE == "enabled" && discount != null){
  // 							  window.location.replace(sites_config.URL+"/vin-check/processing?offer=VHR"+discount+"&vin="+response.vin+"&email="+email);
  // 						//	  window.location.replace(sites_config.URL+"/vin-check/processing?offer=CHRISTMAS50&vin="+vin+"&email="+email);
  // 						   }else if(sites_config.PROCESSING_PAGE == "enabled" && discount == null){
  // 							  window.location.replace(sites_config.URL+"/vin-check/processing?vin="+response.vin+"&email="+email);
  // 					//		  window.location.replace(sites_config.URL+"/vin-check/processing?offer=CHRISTMAS50&vin="+vin+"&email="+email);
  // 						   }
  // 					  }else{
  // 						  $("#other_error").show();
  // 						  $("#captureimage").after('<span style="color:red;" id="other_error">Please Upload/Scan Valid VIN</span>');
  // 					  }

  // 				  },
  // 				});

  // 			}else{

  // 				const state = { 'page':"home"}
  // 				const title = ''
  // 				const url = "https://"+domainName
  // 				history.pushState(state, title, url)
  // 			   if(sites_config.PROCESSING_PAGE == "disabled" && discount == null){
  // 					  window.location.replace(sites_config.URL+"/vin-check/preview?vin="+vin+"&email="+email+"&mobile="+mobile);
  // 				   //window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
  // 			   }else if(sites_config.PROCESSING_PAGE == "disabled" && discount != null){
  // 						 window.location.replace(sites_config.URL+"/vin-check/preview?offer=VHR"+discount+"&vin="+vin+"&email="+email+"&mobile="+mobile);
  // 				//   window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
  // 			   }else if(sites_config.PROCESSING_PAGE == "enabled" && discount != null){
  // 						 window.location.replace(sites_config.URL+"/vin-check/processing?offer=VHR"+discount+"&vin="+vin+"&email="+email);
  // 			//	   window.location.replace(sites_config.URL+"/vin-check/processing?offer=CHRISTMAS50&vin="+vin+"&email="+email);
  // 			   }else if(sites_config.PROCESSING_PAGE == "enabled" && discount == null){
  // 				window.location.replace(sites_config.URL+"/vin-check/processing?vin="+vin+"&email="+email);
  // 		//		   window.location.replace(sites_config.URL+"/vin-check/processing?offer=CHRISTMAS50&vin="+vin+"&email="+email);
  // 			   }

  // 			}

  // 		}else {
  // 			if(validate_email == false){
  // 				$("#email_error").show();
  // 				$("#email").after('<span style="color:red;" id="email_error">Please Enter Valid Email</span>');
  // 			}else if(validate_vin == false && validate_file == false){
  // 				$("#other_error").show();
  // 				$("#captureimage").after('<span style="color:red;" id="other_error">Please Enter Valid VIN or Upload/Scan VIN</span>');
  // 			}
  // 		}

  // 	}));


  // 		$(".veteran_home_collection_form").click(function(event){
  //         event.preventDefault();
  //         $('.error-user-vin').html("");
  //         $('.error-user-email').html("");
  //         var email= $("#wpforms-108027-field_2").val(); 
  // // 			$('.iemail input').val();
  //         var vin= $('#wpforms-108027-field_4').val(); 
  // // 			$('.ivin input').val().toUpperCase();
  //         var mobile= $('.iphone input').val().split(" ").join("");
  //         var validate_email = IsEmail($("#wpforms-108027-field_2").val());
  //         var validate_vin = IsVin($("#wpforms-108027-field_4").val());
  //         if(validate_email == true && validate_vin == true){
  // // 		if(validate_email == true && vin == true){
  //           	$(".veteran_home_collection_form").html('Please wait...');
  //               $.ajax({
  //               type: "GET",
  //               url: sites_config.URL+"/landing/decode_data?vin="+vin,
  //               dataType: 'json',
  //               async:true,
  //               success: function (result) {
  //                 setCookie("decode", JSON.stringify(result),365);
  //               },
  //             });

  //             const state = { 'page':"home"}
  //             const title = ''
  //             const url = "https://"+domainName
  //             history.pushState(state, title, url)
  // 			window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+vin+"&email="+email+"&mobile="+mobile);
  // //            if(sites_config.PROCESSING_PAGE == "disabled" && discount == null){
  // //                     window.location.replace(sites_config.URL+"/vin-check/preview?vin="+vin+"&email="+email+"&mobile="+mobile);
  // //            }else if(sites_config.PROCESSING_PAGE == "disabled" && discount != null){
  // //                       window.location.replace(sites_config.URL+"/vin-check/preview?offer=VHR"+discount+"&vin="+vin+"&email="+email+"&mobile="+mobile);
  // //            }else if(sites_config.PROCESSING_PAGE == "enabled" && discount != null){
  // //                     window.location.replace(sites_config.URL+"/vin-check/processing?offer=VHR"+discount+"&vin="+vin+"&email="+email);
  // //            }else if(sites_config.PROCESSING_PAGE == "enabled" && discount == null){
  // //               window.location.replace(sites_config.URL+"/vin-check/processing?vin="+vin+"&email="+email);
  // //            }
  //         }else{
  //           if(!IsEmail($("#wpforms-108027-field_2").val())){
  // // 		  if(email == ""){
  //           		$("#wpforms-108027-field_2").after('<p style="color:red;" class="error-user-email">Please Enter Valid Email</p>');   
  //           }else if(!IsVin($("#wpforms-108027-field_4").val())){
  // // 		  }else if(vin != ""){
  //             	$("#wpforms-108027-field_4").after('<p style="color:red;" class="error-user-vin">Please Enter VIN number</p>');
  //           }

  //         }
  //      });


  $(".auction-vin-btn").click(function (event) {
    event.preventDefault();
    $(".auction-vin-btn").html('Please wait...');
    var uemail = $('.auction-vin-email input').val();
    var upass = $('.auction-vin-pass input').val();

    $("form").attr("action", sites_config.URL + "/landing/wp_confirm");
    $('#forminator-module-59604').append('<input type="hidden" name = "pass" value="' + upass + '" />');
    $('#forminator-module-59604').append('<input type="hidden" name = "email" value="' + uemail + '" />');
    $("#forminator-module-59604").submit();
  });

  $(".plan0").html("$" + sites_config.pricing['plan0']);
  if (discount != null) {
    $(".deletedplan1").html("<del>$" + tempDiscount[0] + "</del>");
  } else {
    // $(".deletedplan1").html("");
  }
  $(".plan1").html("$" + sites_config.pricing['plan1']);
  if (discount != null) {
    $(".deletedplan2").html("<del>$" + tempDiscount[1] + "</del>");
  } else {
    $(".deletedplan2").html("");
  }
  $(".plan2").html("$" + sites_config.pricing['plan2']);
  if (discount != null) {
    $(".deletedplan3").html("<del>$" + tempDiscount[2] + "</del>");
  } else {
    $(".deletedplan3").html("");
  }
  $(".plan3").html("$" + sites_config.pricing['plan3']);
  if (discount != null) {
    $(".deletedplan4").html("<del>$" + tempDiscount[3] + "</del>");
  } else {
    $(".deletedplan4").html("");
  }
  $(".plan25").html("$" + sites_config.pricing['plan25']);
  if (discount != null) {
    $(".deletedplan5").html("<del>$" + tempDiscount[4] + "</del>");
  } else {
    $(".deletedplan5").html("");
  }
  $(".plan50").html("$" + sites_config.pricing['plan50']);
  if (discount != null) {
    $(".deletedplan6").html("<del>$" + tempDiscount[5] + "</del>");
  } else {
    $(".deletedplan6").html("");
  }
  var plan1code = "'MPP1'";

  var reminderMsg = getCookie('decode');
  if (reminderMsg != null && reminderMsg != "null") {
    console.log(reminderMsg);
    reminderMsg = JSON.parse(reminderMsg);

    var msg = '<div class="msg_container">' +
      '<div class="msg">Your report for your ' + reminderMsg.year + ' ' + reminderMsg.make + ' ' + reminderMsg.model + ' (' + reminderMsg.vin + ') is ready.<br>' +
      'We have found ' + reminderMsg.recordCount + ' records for your vehicle.</div>' +
      '<div class="butn"><a onclick="cartplan(' + plan1code + ')" class ="btn btn-primary"><span class="butn-text">Download Report</span> <br> For $' + sites_config.pricing["plan1"] + '</a></div>';

    $("#reminderMsg").html(msg);
  }


  $(".lookup-vin-number").click(function (event) {
    var discount = sessionStorage.getItem("discount");
    event.preventDefault();
    $(".wpforms-2497-field_1-error").remove();
    $(".wpforms-2497-field_3-error").remove();
    const state = { 'page': "home" }
    const title = ''
    const url = window.location.href;
    history.pushState(state, title, url);
    var lookup_email = $('.lookup-email input').val();
    var lookup_vin = $('.lookup-vin input').val();
    var lookp_phone = $('.lookup-phone input').val().split(" ").join("");
    var validate_email = IsEmail(lookup_email);
    var validate_vin = IsVin(lookup_vin);
    if (validate_email == true && validate_vin == true) {
      $(".wpforms-2497-field_1-error").html("");
      $(".wpforms-2497-field_3-error").html("");
      $(".lookup-vin-number").html("Please Wait.....");
      CheckMappedVINForReport(lookup_vin);

      if (memberAreaPreview == "cwampv_proxy"){
        if (lookup_vin.trim().length > 15 || (lookup_vin.trim().length <= 15 && mappedvin != "error")) {
          if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
            window.location.replace("https://"+domainName + "/vin-check/preview?vin=" + lookup_vin + "&email=" + lookup_email + "&mobile=" + lookp_phone);
          } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
            window.location.replace("https://"+domainName +"/vin-check/preview?offer=" + discount + "&vin=" + lookup_vin + "&email=" + lookup_email + "&mobile=" + lookp_phone);
          }
        }
        else {
          if (discount == null) {
            window.location.replace("https://"+domainName + "/confirm?vin=" + lookup_vin + "&email=" + lookup_email + "&mobile=" + lookp_phone + "&type=vhr");
          } else {
            window.location.replace("https://"+domainName +"/confirm?offer=" + discount + "&vin=" + lookup_vin + "&email=" + lookup_email + "&mobile=" + lookp_phone + "&type=vhr");
          }
        }
      }
      else if (memberAreaPreview == "cwampv"){
        if (lookup_vin.trim().length > 15 || (lookup_vin.trim().length <= 15 && mappedvin != "error")) {
          if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
            window.location.replace("https://"+domainName + "/members/preview?vin=" + lookup_vin + "&email=" + lookup_email + "&mobile=" + lookp_phone);
          } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
            window.location.replace("https://"+domainName + "/members/preview?offer=" + discount + "&vin=" + lookup_vin + "&email=" + lookup_email + "&mobile=" + lookp_phone);
          }
        } else {
          if (discount == null) {
            window.location.replace(sites_config.URL + "/confirm?vin=" + lookup_vin + "&email=" + lookup_email + "&mobile=" + lookp_phone + "&type=vhr");
          } else {
            window.location.replace(sites_config.URL + "/confirm?offer=" + discount + "&vin=" + lookup_vin + "&email=" + lookup_email + "&mobile=" + lookp_phone + "&type=vhr");
          }
        }
      }
      else{
        if (lookup_vin.trim().length > 15 || (lookup_vin.trim().length <= 15 && mappedvin != "error")) {
          if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {
            window.location.replace(sites_config.URL + "/vin-check/preview?vin=" + lookup_vin + "&email=" + lookup_email + "&mobile=" + lookp_phone);
          } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {
            window.location.replace(sites_config.URL + "/vin-check/preview?offer=" + discount + "&vin=" + lookup_vin + "&email=" + lookup_email + "&mobile=" + lookp_phone);
          }
        } else {
          if (discount == null) {
            window.location.replace(sites_config.URL + "/confirm?vin=" + lookup_vin + "&email=" + lookup_email + "&mobile=" + lookp_phone + "&type=vhr");
          } else {
            window.location.replace(sites_config.URL + "/confirm?offer=" + discount + "&vin=" + lookup_vin + "&email=" + lookup_email + "&mobile=" + lookp_phone + "&type=vhr");
          }
        }
      }

    } else {
      if (!IsEmail(lookup_email)) {
        $(".wpforms-2497-field_3-error").html("");
        $(".lookup-email").after('<span style="color:red;" class="wpforms-2497-field_1-error">Please Enter Valid Email</span>');
      } else if (!IsVin(lookup_vin)) {
        $(".wpforms-2497-field_1-error").html("");
        $(".lookup-vin").after('<span style="color:red;" class="wpforms-2497-field_3-error">Please Enter VIN number</span>');
      }
    }
  });


  //       $(".pricing_code_btn").click(function(eve){
  // 		  //console.log(eve);
  // // 		  var pricing_email = $('#wpforms-3375-field_1').val();
  // //           var pricing_vin = $('#wpforms-3375-field_5').val();
  // // 		  //var pricing_phone = $('#wpforms-3375-field_4').val();
  // // 		  var pricing_code = $('.code').val(); //'DVH1'
  // // 		  var pricing_email = $('#paoc-popup-96354-8 .pricingemail input').val();
  // //           var pricing_vin = $('#paoc-popup-96354-8 .pricing_vin input').val();
  // 		  //var pricing_phone = $('#wpforms-3375-field_4').val();
  // // 		  var pricing_code = $('#paoc-popup-96354-8 .code input').val(); //'DVH1'
  //         	eve.preventDefault();
  //         	if($('#paoc-popup-3374-7 .pricingemail input').val() != '' && $('#paoc-popup-3374-7 .pricing_vin input').val() != ''){
  //               	 var pricing_email = $('#paoc-popup-3374-7 .pricingemail input').val();
  //               	 var pricing_vin = $('#paoc-popup-3374-7 .pricing_vin input').val();
  //                  var pricing_code = "DVH1";
  //             }
  //         	if($('#paoc-popup-96354-8 .pricingemail input').val() != '' && $('#paoc-popup-96354-8 .pricing_vin input').val() != ''){
  //               	 var pricing_email = $('#paoc-popup-96354-8 .pricingemail input').val();
  //               	 var pricing_vin = $('#paoc-popup-96354-8 .pricing_vin input').val();
  //               	 var pricing_code = "DVH5";
  //             }
  //         	if($('#paoc-popup-96356-9 .pricingemail input').val() != '' && $('#paoc-popup-96356-9 .pricing_vin input').val() != ''){
  //               	 var pricing_email = $('#paoc-popup-96356-9 .pricingemail input').val();
  //               	 var pricing_vin = $('#paoc-popup-96356-9 .pricing_vin input').val();
  //           		 var pricing_code = "DVH10";
  //             }
  // //         	if($('#paoc-popup-96357-10 .pricingemail input').val() != '' && $('#paoc-popup-96357-10 .pricing_vin input').val() != ''){
  // //               	 var pricing_email = $('#paoc-popup-96357-10 .pricingemail input').val();
  // //               	 var pricing_vin = $('#paoc-popup-96357-10 .pricing_vin input').val();
  // //                  var pricing_code = "DVH50"
  // //             }

  // 		  	console.log(pricing_email);
  // 			console.log(pricing_vin);
  // 			console.log(pricing_code);
  // //         	var pricing_code = $('.code input').val();
  //         	var domainName = window.location.hostname;
  //         	document.cookie = "cart_plan="+pricing_code+"; expires=365; path=/; secure; domain=." + domainName;

  //         	var discount = sessionStorage.getItem("discount");
  //          	console.log(pricing_email);
  // 			if(pricing_email == '' ){
  // 				$(".error-pricing-email").html('');
  // 				$(".error-pricing-vin").html('');
  // 			   $(".pricingemail").after('<p style="color:red;" class="error-pricing-email">Please Enter Valid Email</p>');

  // 			 }
  // 			else if(pricing_vin == ''){
  // 			   $(".error-pricing-vin").html('');
  // 			   $(".error-pricing-email").html('');
  // 			   $(".pricing_vin").after('<p style="color:red;" class="error-pricing-vin">Please Enter Valid Vin Number</p>');
  // 			 }else{
  //             if(discount != null ){
  //                   window.location.replace(sites_config.URL+"/vin-check/preview?offer="+discount+"&vin="+pricing_vin+"&email="+pricing_email);
  //             }else if(discount == null){
  //                  window.location.replace(sites_config.URL+"/vin-check/preview?vin="+pricing_vin+"&email="+pricing_email);
  //             }
  //       }

  // //         console.log(pricing_code);
  //       });



  function getplancode() {
    if (domainName == "miocicvscormier.com") {
      price_code_plan1 = "MVC1";
      price_code_plan2 = "MVC2";
      price_code_plan3 = "MVC5";
      console.log("You are in: ", domainName);
    }
    else if (domainName == "detailedvehiclehistory.com") {
      price_code_plan1 = "DVH1";
      price_code_plan2 = "DVH2";
      price_code_plan3 = "DVH5";
      console.log("You are in: ", domainName);
    }
    else if (domainName == "premiumvin.com") {
      price_code_plan1 = "PV1";
      price_code_plan2 = "PV5";
      price_code_plan3 = "PV10";
      console.log("You are in: ", domainName);
    }
    else if (domainName == "instantvinreports.com") {
      price_code_plan1 = "IVR1";
      price_code_plan2 = "IVR2";
      price_code_plan3 = "IVR5";
      console.log("You are in: ", domainName);
    }
    else if (domainName == "consultadevin.com") {
      price_code_plan1 = "CNV1";
      price_code_plan2 = "CNV2";
      price_code_plan3 = "CNV5";
      console.log("You are in: ", domainName);
    }
    else if (domainName == "vehiclehistory.eu") {
      price_code_plan1 = "VHREU2";
      price_code_plan2 = "VHREU5";
      price_code_plan3 = "VHREU10";
      console.log("You are in: ", domainName);
    }
    else if (domainName == "vehiclesreport.com") {
      price_code_plan1 = "VSR1";
      price_code_plan2 = "VSR2";
      price_code_plan3 = "VSR5";
      console.log("You are in: ", domainName);
    }
  }



  $(".pricing_code_btn").click(function (eve) {
    console.log("CLickec")
    console.log(eve);
    console.log("if")
    getplancode();
    eve.preventDefault();
    if (
      (jQuery('#paoc-popup-3374-7 .pricingemail input').val() !== '' && jQuery('#paoc-popup-3374-7 .pricingemail input').val() !== undefined) || //DVH
      (jQuery('#paoc-popup-151803-4 .pricingemail input').val() !== '' && jQuery('#paoc-popup-151803-4 .pricingemail input').val() !== undefined) || //test site
      (jQuery('#paoc-popup-4765-7 .pricingemail input').val() !== '' && jQuery('#paoc-popup-4765-7 .pricingemail input').val() !== undefined) || //PremiumVin
      (jQuery('#paoc-popup-16264-4 .pricingemail input').val() !== '' && jQuery('#paoc-popup-16264-4 .pricingemail input').val() !== undefined) || // InstanVinReports
      (jQuery('#paoc-popup-16698-4 .pricingemail input').val() !== '' && jQuery('#paoc-popup-16698-4 .pricingemail input').val() !== undefined) || // ConsultaDevin
      (jQuery('#paoc-popup-3781-4 .pricingemail input').val() !== '' && jQuery('#paoc-popup-3781-4 .pricingemail input').val() !== undefined) || // VehicleHistoryEu
      (jQuery('#paoc-popup-307-4 .pricingemail input').val() !== '' && jQuery('#paoc-popup-307-4 .pricingemail input').val() !== undefined) // VehiclesReport
    ) {
      var pricing_email = jQuery('#paoc-popup-3374-7 .pricingemail input').val();
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-151803-4 .pricingemail input').val();
      }
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-4765-7 .pricingemail input').val();
      }
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-16264-4 .pricingemail input').val();
      }
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-16698-4 .pricingemail input').val();
      }
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-3781-4 .pricingemail input').val();
      }
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-307-4 .pricingemail input').val();
      }
      var pricing_code = price_code_plan1;
    } else if (
      (jQuery('#paoc-popup-96354-8 .pricingemail input').val() !== '' && jQuery('#paoc-popup-96354-8 .pricingemail input').val() !== undefined) ||
      (jQuery('#paoc-popup-151847-5 .pricingemail input').val() !== '' && jQuery('#paoc-popup-151847-5 .pricingemail input').val() !== undefined) ||
      (jQuery('#paoc-popup-45557-8 .pricingemail input').val() !== '' && jQuery('#paoc-popup-45557-8 .pricingemail input').val() !== undefined) ||
      (jQuery('#paoc-popup-21869-5 .pricingemail input').val() !== '' && jQuery('#paoc-popup-21869-5 .pricingemail input').val() !== undefined) ||
      (jQuery('#paoc-popup-16699-5 .pricingemail input').val() !== '' && jQuery('#paoc-popup-16699-5 .pricingemail input').val() !== undefined) ||
      (jQuery('#paoc-popup-5883-5 .pricingemail input').val() !== '' && jQuery('#paoc-popup-5883-5 .pricingemail input').val() !== undefined) ||
      (jQuery('#paoc-popup-19733-5 .pricingemail input').val() !== '' && jQuery('#paoc-popup-19733-5 .pricingemail input').val() !== undefined)
    ) {
      // 		 console.log("hi-2");
      var pricing_email = jQuery('#paoc-popup-96354-8 .pricingemail input').val();
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-151847-5 .pricingemail input').val();
      }
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-45557-8 .pricingemail input').val();
      }
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-21869-5 .pricingemail input').val();
      }
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-16699-5 .pricingemail input').val();
      }
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-5883-5 .pricingemail input').val();
      }
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-19733-5 .pricingemail input').val();
      }
      var pricing_code = price_code_plan2;
    } else if (
      (jQuery('#paoc-popup-96356-9 .pricingemail input').val() !== '' && jQuery('#paoc-popup-96356-9 .pricingemail input').val() !== undefined) ||
      (jQuery('#paoc-popup-151849-6 .pricingemail input').val() !== '' && jQuery('#paoc-popup-151849-6 .pricingemail input').val() !== undefined) ||
      (jQuery('#paoc-popup-45558-9 .pricingemail input').val() !== '' && jQuery('#paoc-popup-45558-9 .pricingemail input').val() !== undefined) ||
      (jQuery('#paoc-popup-21873-6 .pricingemail input').val() !== '' && jQuery('#paoc-popup-21873-6 .pricingemail input').val() !== undefined) ||
      (jQuery('#paoc-popup-16700-6 .pricingemail input').val() !== '' && jQuery('#paoc-popup-16700-6 .pricingemail input').val() !== undefined) ||
      (jQuery('#paoc-popup-5884-6 .pricingemail input').val() !== '' && jQuery('#paoc-popup-5884-6 .pricingemail input').val() !== undefined) ||
      (jQuery('#paoc-popup-19734-6 .pricingemail input').val() !== '' && jQuery('#paoc-popup-19734-6 .pricingemail input').val() !== undefined)
    ) {
      var pricing_email = jQuery('#paoc-popup-96356-9 .pricingemail input').val();
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-151849-6 .pricingemail input').val();
      }
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-45558-9 .pricingemail input').val();
      }
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-21873-6 .pricingemail input').val();
      }
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-16700-6 .pricingemail input').val();
      }
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-5884-6 .pricingemail input').val();
      }
      if (pricing_email == undefined) {
        pricing_email = jQuery('#paoc-popup-19734-6 .pricingemail input').val();
      }
      var pricing_code = price_code_plan3;
    } else {
      console.log("masuk else")
      $(".error-pricing-email").html('');
      $(".pricingemail").after('<p style="color:red;" class="error-pricing-email">Please Enter Valid Email</p>');
      return
    }

    // 		  	console.log(pricing_email);
    // 			console.log(pricing_code);

    var domainName = window.location.hostname;
    document.cookie = "cart_plan=" + pricing_code + "; expires=365; path=/; secure; domain=." + domainName;

    var discount = sessionStorage.getItem("discount");
    if (IsEmail(pricing_email) == true) {
      $(".error-pricing-email").html('');
      $.ajax({
        type: "GET",
        url: sites_config.URL + "/wp/report_plans",
        dataType: 'json',
        //     async:false,
        beforeSend: function () {
          console.log("Getting PLfans...");
        },
        success: function (e) {
          if (e.status != 'error') {
            var rplans = e.plans[pricing_code];
            var report_price = rplans.price;
            var report_nos = rplans.nos;
            // 					  console.log(rplans);
            // 					  console.log(report_price);
            var calcPrice = (discount != '') ? (report_price - ((discount / 100) * report_price)).toFixed(2) : report_price;
            // 					  var pvin = "CREDIT";
            var pass = create_password(6);
            console.log(pricing_email);

            $("#email").val(pricing_email);
            $("#phone").val('');
            $("#pass").val(pass);
            $("#cart_plan").val(pricing_code);
            $("#vin").val("CREDIT");
            $("#pprice").val(calcPrice);
            direct_request("default", "none", "preview", pricing_email, pricing_code, pass);
          }
        }
      });
    }
  });

  var repeat = 0;
  $(".license-plate-search").click(function (event) {
    console.log('fired');
    event.preventDefault();

    $("error-lic-vin").remove();
    $(".error-lic").remove();
    $(".error-lic").html('');
    const state = { 'page': "home" }
    const title = ''
    const url = window.location.href;
    history.pushState(state, title, url);

    var license_email = $('.license-email input').val();
    var license_plate = $('.license-plate input').val().split(" ").join("");
    console.log(license_email);
    console.log(license_plate);
    var license_state = $('.license-state select').find(":selected").text().split("-")[0].trim();
    var license_phone = $('.license-phone input').val();
    var discount = sessionStorage.getItem("discount");
    if (repeat == 2) {
      var license_vin = $('.license-vin input').val();
      if (license_vin != '' && license_vin != 'novin') {
        if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {

          window.location.replace(sites_config.URL + "/vin-check/preview?vin=" + license_vin + "&email=" + license_email + license_phone);

          //		window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+license_vin+"&email="+license_email+"&mobile="+license_phone);

        } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {

          window.location.replace(sites_config.URL + "/vin-check/preview?offer=" + discount + "&vin=" + license_vin + "&email=" + license_email + license_phone);

          //  window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+license_vin+"&email="+license_email+"&mobile="+license_phone);

        }
      } else {
        $(".error-lic-vin").html('');
        $(".license-vin").after('<p style="color:red;" class="error-lic-vin">Please Enter Vin Number</p>');
      }
    } else {
      if (license_email == '') {
        $(".error-lic-email").html('');
        $(".license-email").after('<p style="color:red;" class="error-lic-vin error-lic-email">Please Enter Valid Email</p>');

      } else if (license_plate == '') {
        $(".error-lic-plate").html('');
        $(".license-plate").after('<p style="color:red;" class="error-lic-vin error-lic-plate">Please Enter Valid License Plate</p>');
      } else {
        $.ajax({
          type: "POST",
          beforeSend: function () {
            $(".license-plate-search").html("Please Wait...");
          },
          data: {
            'state': license_state,
            'plate': license_plate
          },
          url: sites_config.URL + "/landing/get_license",
          dataType: 'json',
          //async:false,
          success: function (result) {
            console.log(result);
            if (result.status != 'Error' && result.status != 'error') {
              if (result.data.hasOwnProperty("VIN")) {
                result.data.vin = result.data.VIN;
              } else {
                result.data.vin = result.vin;
              }
            }
            $(".license-plate-search").html("License Plate Check");
            if (result.status == 'success' && result.data.vin != '' && result.data.vin != 'novin' && result.data.vin != 'undefined' && result.data.vin != 'UNDEFINED') {
              if (sites_config.PROCESSING_PAGE == "disabled" && discount == null) {

                window.location.replace(sites_config.URL + "/vin-check/preview?vin=" + result.data.vin + "&email=" + license_email + license_phone);

                //			   window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+result.data.vin+"&email="+license_email+"&mobile="+license_phone);

              } else if (sites_config.PROCESSING_PAGE == "disabled" && discount != null) {

                window.location.replace(sites_config.URL + "/vin-check/preview?offer=" + discount + "&vin=" + result.data.vin + "&email=" + license_email + license_phone);

                //			   window.location.replace(sites_config.URL+"/vin-check/preview?offer=CHRISTMAS50&vin="+result.data.vin+"&email="+license_email+"&mobile="+license_phone);

              }

            } else {
              if (repeat == 1) {
                $(".license-plate").remove();
                $(".license-state").remove();
                $(".error-lic").remove();
                $(".error-lic-plate").html('');
                $(".error-lic-email").html('');
                $(".license-vin").show();
                repeat = 2;
              } else {
                $(".error-lic-email").html('');
                $("#wpforms-2498-field_3").after('<div style="color:red;" class="error-lic">Whoops! Records not found. Try again with VIN number</div>');
                $("#wpforms-2498-field_1-container").remove();
                $("#wpforms-2498-field_2-container").remove();
                $("#wpforms-2498-field_1").remove();
                $("#wpforms-2498-field_2").remove();
                $(".license-vin").show();

                repeat = 1;
              }

            }
          }
        });
      }

    }

  });

});

// Optimized Function by Basurah, contact basurah for question if any...
function redirect(vin){
  var discount = sessionStorage.getItem("discount");
  domainName = "developtestsite.com";
  if (!discount) {
    console.log("no discount")
    window.location.replace('https://app.' + domainName + "/vin-check/ws-preview?vin=" + vin);
  }
  else {
    console.log("discount")
    window.location.replace('https://app.' + domainName + "/vin-check/ws-preview?offer=" + discount + "&vin=" + vin);
  };

}
function removeErrorText(){
  // remove error text
  var errorTexts = document.querySelectorAll('.errorText');
  errorTexts.forEach(function(errorText) {
    errorText.innerText="";
  });
}
function errorText(text){
  document.getElementById('errorText').innerText = text;
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
              redirect(vin);
          },
          error: function(xhr, status, error) {
              reject(error);
              disable(false);
              buttonText(true);
              errorText("Whoops! Records not found, please try again.");
          }
      });
  });
}
function disable(boolean) {
  var mainForm = document.getElementById("mainForm");
  var elements = mainForm.querySelectorAll("input, select, button");
  
  elements.forEach(function(element) {
      element.disabled = boolean;
  });
}
function buttonText(boolean){
  var button = document.getElementById('mainFormBtn'); 
  var ariaLabelBtn = button.getAttribute('aria-label');
  if (!boolean){
      button.innerText="Please wait..."
  }
  else{
      button.innerText = ariaLabelBtn;
  }
}
// end of licenseplate fetching function

function vinLpYmmtForm(tabs){
  event.preventDefault();
  console.log("Main Form!");
  removeErrorText();
  disable(true);
  buttonText(false);
  if (tabs=="vin"){
      console.log("VIN!");
      var vin = document.getElementById('vin_field').value;
      if (IsVin(vin)){
          redirect(vin);
      }else {
          removeErrorText();
          errorText("Please enter valid VIN number");
          buttonText(true);
          disable(false);
      };
  }
  else if (tabs=="lp"){
      console.log("LP!");
      state = document.getElementById('state_select').value;
      plate = document.getElementById('lp_field').value;
      if (isLp(state, plate)){
          fetchVinData(state, plate);
      }else {
          removeErrorText();
          errorText("Please enter valid plate number");
          buttonText(true);
          disable(false);
      };
  }
  else if (tabs=="ymmt"){
      console.log("YMMT!");
      year = document.getElementById('year_select').value;
      make = document.getElementById('make_select').value;
      model = document.getElementById('model_select').value;
      // trim = document.getElementById('trim_select').value; //trim removed
      if (year !== "" && make !== "" && model !== "") {
        vin = year + '_' + make + '_' +  model;
        var pass = create_password(6);
        console.log("calling direct_request");
        getCode();
        direct_request("default", "none", "preview", "test@gmail.com", windowSticker_1, pass, vin);
      }
      else{
        removeErrorText();
        errorText("Please input all data");
        buttonText(true);
        disable(false);
      }
  }
  else{
      console.log("No Tab Selected!");
  }
}
function getCode(){
  if (domainName == "miocicvscormier.com"){ // https://miocicvscormier.com/wp/sticker_plans
    windowSticker_1 = "DMVCT1";
  }
}
// end of optimized Function

function cartplan(code) {
  var domainName = window.location.hostname;
  var reminderMsg = getCookie('decode');
  reminderMsg = JSON.parse(reminderMsg);
  document.cookie = "cart_plan=" + code + "; expires=365; path=/; secure; domain=." + domainName;
  var discount = sessionStorage.getItem("discount");
  if (discount != null && reminderMsg != null) {
    window.location.replace(sites_config.URL + "/vin-check/preview?offer=VHR" + discount + "&vin=" + reminderMsg.vin);
  } else if (discount != null && reminderMsg == null) {
    window.location.replace(sites_config.URL + "/vin-check/preview?offer=VHR" + discount);
  } else if (discount == null && reminderMsg != null) {
    window.location.replace(sites_config.URL + "/vin-check/preview?vin=" + reminderMsg.vin);
  } else {
    window.location.replace(sites_config.URL + "/vin-check/preview");
  }
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

function log_consent(response) {
  var consent = response;
  jQuery.ajax({
    type: "post",
    url: sites_config.URL + "/landing/consent_log",
    data: {
      consent: consent,
    },
    dataType: "json",
    success: function (e) {
      console.log(e);
      return { status: e.status };
    },
  });
}

function form_input(name, type, value) {
  input = document.createElement('input');
  input.setAttribute('name', name);
  input.setAttribute('type', type);
  input.setAttribute('value', value);
  return input;
}

function CheckMappedVINForReport(vin) {
  jQuery.ajax({
    type: "post",
    url: sites_config.URL + "/landing/check_mapped_vin",
    data: {
      vin: vin
    },
    dataType: "json",
    async: false,
    success: function (e) {
      // console.log(e);
      mappedvin = e.status;
      console.log(mappedvin);
    },
  });
}

function direct_request(payg = "default", payg_id = "none", rtype = "preview", cemail, code, pw, vin = "CREDIT") {
  // var payg = pick(payg,'default');
  // var payg_id = pick(payg_id,'none');
  log_consent("Yes");
  // var discount = sessionStorage.getItem("discount");
  var discount = sessionStorage.getItem("discount"); //get discount from session
  discount = (discount != null) ? '&offer=' + discount : '';
  jQuery(".pricing_code_btn").html("Please Wait....");
  form = "";
  form = document.createElement("form");
  form.setAttribute("method", "GET");
  form.setAttribute("action", sites_config.URL + "vin-check/confirm");

  email = validate_vars(cemail);
  phone = validate_vars(jQuery("#phone").val());
  pass = validate_vars(pw);
  cart_plan = validate_vars(code);
  // vin = "CREDIT"; //validate_vars(jQuery("#vin").val());
  //pprice=validate_vars($('#pprice').val());
  email = form_input("email", "hidden", email);
  form.appendChild(email);

  phone = form_input("phone", "hidden", phone);
  form.appendChild(phone);

  current_miles = form_input(
    "current_miles",
    "hidden",
    jQuery("#current_miles").val()
  );
  form.appendChild(current_miles);

  pass = form_input("pass", "hidden", pass);
  form.appendChild(pass);

  //pprice = form_input('pprice', 'hidden', pprice);
  //form.appendChild(pprice);
  var lookup_data = "nolookup";
  var mail_data = "nomail";
  var bill_data = "nobill";
  var sms_data = "nosms";
  var billmail_data = "nobillmail";
  var decal_data = "nodecal";
  var decal_single = "no_decal_single";
  var report_subscription = "noreportsubscription";

  var total_product = 0;
  if (jQuery("#landing_bill_lookup").length > 0) {
    if (jQuery("#landing_bill_lookup").is(":checked")) {
      lookup_data = "lookup";
      bill_data = "bill";
      total_product = 2;
    }
  }

  if (jQuery("#landing_bill_mail").length > 0) {
    if (jQuery("#landing_bill_mail").is(":checked")) {
      /*
            var mail_data = 'mail';
            var bill_data = 'bill';
            */
      billmail_data = "billmail";
      total_product = 3;
    }
  }

  if (jQuery("#landing_bill_mail_sms").length > 0) {
    if (jQuery("#landing_bill_mail_sms").is(":checked")) {
      mail_data = "mail";
      bill_data = "bill";
      sms_data = "sms";
      total_product = 4;
    }
  }

  if (jQuery("#landing_decal").length > 0) {
    if (jQuery("#landing_decal").is(":checked")) {
      decal_single = "decal_single";
      total_product = 1;
    }
  }
  if (jQuery("#landing_decal_sub").length > 0) {
    if (jQuery("#landing_decal_sub").is(":checked")) {
      decal_data = "decal";
      total_product = 1;
    }
  }
  if (jQuery("#report_subscription").length > 0) {
    if (jQuery("#report_subscription").is(":checked")) {
      report_subscription = "report_subscription";
      total_product = 1;
    }
  }

  lookup = form_input("lookup", "hidden", lookup_data);
  form.appendChild(lookup);

  report_subscription = form_input(
    "report_subscription",
    "hidden",
    report_subscription
  );
  form.appendChild(report_subscription);

  bill = form_input("bill", "hidden", bill_data);
  form.appendChild(bill);

  mail = form_input("mail", "hidden", mail_data);
  form.appendChild(mail);

  billmail = form_input("billmail", "hidden", billmail_data);
  form.appendChild(billmail);

  sms = form_input("sms", "hidden", sms_data);
  form.appendChild(sms);

  decal = form_input("decal", "hidden", decal_data);
  form.appendChild(decal);
  decal_single = form_input("decal_single", "hidden", decal_single);
  form.appendChild(decal_single);
  payment_gateway = form_input("payment_gateway", "hidden", payg);
  form.appendChild(payment_gateway);
  payg_id = form_input("payg_id", "hidden", payg_id);
  form.appendChild(payg_id);
  cart_plan = form_input("cart_plan", "hidden", cart_plan);
  form.appendChild(cart_plan);

  var total_pro = form_input("total_product", "hidden", total_product);
  form.appendChild(total_pro);

  var vin_data = vin; //.toUpperCase()
  vin = form_input("vin", "hidden", vin_data);
  
  form.appendChild(vin);
  console.log(form);
  // debugger;
  if (localStorage) {
    localStorage.clear();
    localStorage.setItem("email", email);
    localStorage.setItem("phone", jQuery("#phone").val());
    localStorage.setItem("vin", vin);
  }

  //   $.removeCookie("cart_vin");
  //   $.removeCookie("cart_email");
  //   $.removeCookie("cart_mobile");
  //   $.cookie("cart_email", $("#email").val(), { expires: 365, path: "/" });
  //   $.cookie("cart_mobile", $("#phone").val(), { expires: 365, path: "/" });
  //   $.cookie("cart_vin", $("#vin").val().toUpperCase(), {
  //     expires: 365,
  //     path: "/",
  //   });
  document.body.appendChild(form);
  // form.submit();
  if (memberAreaPreview == "cwampv_proxy"){
      window.location = "https://"+domainName + "/vin-check/confirm?new-data=" + btoa(JSON.stringify(jQuery("form").serializeArray())) + discount;
  }else if(memberAreaPreview == "cwampv"){
      window.location = "https://"+domainName + "/members/confirm?new-data=" + btoa(JSON.stringify(jQuery("form").serializeArray())) + discount;
  }else{
      window.location = sites_config.URL + "/vin-check/confirm?new-data=" + btoa(JSON.stringify(jQuery("form").serializeArray())) + discount;
  }
  // window.location = "https://miocicvscormier.com/vin-check/confirm?new-data="+btoa(JSON.stringify(jQuery("form").serializeArray()))+discount;
}
function validate_vars(arg) {
  return (typeof arg == 'undefined' ? "nodata" : arg);
}
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email) || email == "") {
    return false;
  } else {
    return true;
  }
}
function IsVin(vin) {
  if (vin.length < 5 || vin.length > 17) {
      return false;
  } else {
      return true;
  }
}
function isLp(state, plate){
  if (state === "" || plate === "") {
      return false;
  } else {
      return true;
  }
}
function IsFile(filename) {
  if (filename == undefined || filename == null || filename == "") {
    return false;
  } else {
    return true;
  }
}

// ymmt tab form script, this script to support [ocr_vin_lp_ymmt_form] shortcode for YMMT tab

function getYearDropdown(){
  console.log("Get Year Data!");
  endPoint = "https://app.developtestsite.com/api-cwa/get-dropdown";
  year = "";
  make = "";
  elementId = "year_select";
  if (checkData(elementId)){
      calAPI(endPoint, year, make, elementId);
  }
  else {
      console.log("Data already stored.");
  }
}
function getMakeDropdown(){
  console.log("Get Make Data!");
  endPoint = "https://app.developtestsite.com/api/get-wp-makes";
  year = document.getElementById("year_select").value;
  make = "";
  elementId = "make_select";
  if (year != ""){
    if (checkData(elementId)){
        calAPI(endPoint, year, make, elementId);
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
  endPoint = "https://app.developtestsite.com/api/get-wp-models";
  year = document.getElementById("year_select").value;
  // year = "2010";
  make = document.getElementById("make_select").value;
  // make = "acura";
  elementId = "model_select";
  if (make != ""){
    if (checkData(elementId)){
        calAPI(endPoint, year, make, elementId);
    }
    else {
        console.log("Data already stored.");
    }
  }
  else{
    resetDropdown(elementId, "Select Make")
  }
}
function getTrimDropdown(){
  console.log("Get Trim Data!");
  if (trimList){
      console.log(trimList)
      modelSelected = document.getElementById("model_select").value;
      console.log(modelSelected);
      array = trimList[modelSelected]
      reWrite("trim_select", array);
  }
  else {
      console.log("Need Select Model")
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
  if (id == "make_select"){
      option.text = "Make";
  }
  else if (id == "model_select"){
      option.text = "Model";
  }
  else if (id == "trim_select"){
      option.text = "Trim";
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

function calAPI(endPoint, year, make, elementId) {
  console.log(endPoint, year, make, elementId)
  // Endpoint URL
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
          // console.log(data);
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
  console.log(id);
  if (id == "year_select"){
      array=data.years;
      console.log("array year: ", array);
  }
  else if (id == "make_select"){
      array=data.make;
      console.log("array make: ", array);
  }
  else if (id == "model_select"){
      array=[];
      trimList = {};
      // data.model.forEach(function(modelObj) {
      //     var modelName = Object.keys(modelObj)[0];
      //     array.push(modelName);
      //   });
      data.model.forEach(modelObj => {
          var modelName = Object.keys(modelObj)[0];
          array.push(modelName);
          var modelTrim = modelObj[modelName];
          trimList[modelName] = modelTrim;
      });
      console.log("array model: ", array);
      console.log("trimList: ", trimList);
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