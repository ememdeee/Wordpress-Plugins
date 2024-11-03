// // Check if the current URL is child of "/vin-decoder/" or not
// if (window.location.href.indexOf("/vin-decoder/") > -1 || window.location.href.indexOf("preview=true") > -1 || window.location.href.indexOf("action=elementor") > -1) {
    console.log("Run YMMT js!");
    jQuery(document).ready(function(){
        let waranties_count = 0;
        var warranties_directory = {
            "Basic": "Also known as bumper-to-bumper warranty, covers defects in materials or workmanship for a specified period after purchasing a car.",
        "Corrosion perforation": "Protects against rust that causes holes in the car's body panels.",
        "Diesel engine": "Covers repairs related to the diesel engine's components and performance.",
        "Hybrid/electric system componenet": "Warranty covering electrical parts unique to hybrid vehicles.",
        "Maintenance": "Covers routine maintenance services for a set duration or mileage.",
        "Powertrain": "Protects the car's major mechanical components, such as the engine, transmission, and drivetrain.",
        "Roadside assistance coverage": "Service providing help for common roadside issues like flat tires, dead batteries, or lockouts.",
        "Roadside assistance": "Warranty ensuring access to roadside assistance services for a specified period.",
        "Traction battery": "Coverage for the traction battery in hybrid or electric vehicles against defects or performance issues."
    };

    for(let i = 1; i<=15; i++){

    var colordiv = document.getElementById("exsqaurebg"+i);
    var interiordiv = document.getElementById("insquarebg"+i);
    var colortrdiv = document.getElementById("ex-bgtr"+i);
    var interiortrdiv = document.getElementById("in-bgtr"+i);
    var interiormorespan = document.getElementById("r-more");
    var warrantiesdiv = document.getElementById("warranties"+i);
    var warrantiesdiv_new = document.getElementById("warranties_new"+i);
    if(colordiv != undefined){
        var computedStyle = window.getComputedStyle(colordiv,null);
        var backgroundValue = computedStyle.getPropertyValue('background-color');
        var incomputedStyle = window.getComputedStyle(interiordiv,null);
        var inbackgroundValue = incomputedStyle.getPropertyValue('background-color');
        if (backgroundValue == "rgba(0, 0, 0, 0)" ) {
              colordiv.classList.add('b-box');
              colortrdiv.classList.add('b-box');
        }
        if(i==6 && inbackgroundValue == "rgba(0, 0, 0, 0)"){
            let interiorreadmore = findSiblingDivBySpanClass("r-more","color-more");
            if(interiorreadmore != null){
                interiorreadmore.classList.add('b-box');
            }
        }
        if(i==6 && backgroundValue == "rgba(0, 0, 0, 0)"){
            let exteriorreadmore = findSiblingDivBySpanClass("read-more","color-more");
            if(exteriorreadmore != null){
                exteriorreadmore.classList.add('b-box');
            }
        }
    
        if (inbackgroundValue == "rgba(0, 0, 0, 0)" ) {
          interiordiv.classList.add('b-box');
          interiortrdiv.classList.add('b-box');
        }
        }
     if(warrantiesdiv_new != undefined ){
        let warantiesHeading = warrantiesdiv_new.querySelector('.warantiesHeading span'); // title
        let infoText = warrantiesdiv_new.querySelector('.warranties_info_txt'); // info text
        
        // check if data available or not, if not remove the container
        if (warantiesHeading != null){ 
            waranties_count++;     
            // remove (miles and month)
            var newHeading = warantiesHeading.innerText.split('(')[0];
            warantiesHeading.innerText = newHeading;
        
            // add content to info
            if (warantiesHeading.innerText in warranties_directory) {
                infoText.innerHTML = warranties_directory[warantiesHeading.innerText];
            };
        }
        else {
            warrantiesdiv_new.style.display = "none";
        };
        
     }
     else if (warrantiesdiv != null){
        let h4elem = warrantiesdiv.querySelector('p'); // content
        let spanelem = warrantiesdiv.querySelector('span'); //title
        warrantiesdiv.classList.add('gap-box');
        if(h4elem.innerText == "/"){
             warrantiesdiv.classList.add('b-box');
        }else{ //new code
            // Devide the text to month and miles
            var parts = h4elem.innerHTML.split('/');
            var newContent = 'Months: ' + parts[0] + '<br>Miles: ' + parts[1];
            h4elem.innerHTML = newContent;
        };
         
        if(spanelem != null){
            // run only when title available....
            waranties_count++
            // remove the (Miles/month)
            var newText = spanelem.innerText.split('(')[0];
            spanelem.innerText = newText;
            console.log("len "+spanelem.innerText.length)
            console.log("len "+spanelem.innerText)
            if(spanelem.innerText.length>34){
                h4elem.classList.add('merg-box');
            }
            // add Info icon
            var spanElement = document.createElement('span');
            spanElement.id = 'warranties_info' + i;
            spanElement.classList.add('warantiesInfo');
            // create icon
            var imgElement = document.createElement('img');
            imgElement.src = 'https://detailedvehiclehistory.com/wp-content/uploads/sites/3/2024/03/ep_info-filled.svg';
            imgElement.classList.add('infoIcon');
            spanElement.appendChild(imgElement);
            // create text
            var textElement = document.createElement('p');
            textElement.classList.add('warranties_info_txt');
            textElement.id = 'warranties_info_txt' + i;
            if (spanelem.innerText in warranties_directory) {
                textElement.innerHTML = warranties_directory[spanelem.innerText];
            } else {
                textElement.innerHTML = "No info";
                // textElement.classList.add('b-box'); // hide info btn when not available
            }
            spanElement.appendChild(textElement);
            warrantiesdiv.appendChild(spanElement);
        };
     };
       
    };
    // hide waranties row if no data 
    document.querySelectorAll('#all_warranty_section > .e-container > .e-container').forEach(function(element) {
        const height = element.clientHeight;
        if (height === 0) {
          element.style.display = 'none';
        }
    });
    // hide color if not available
    no_color = 0;
    let interiorColorsHeight = jQuery("#interior_colors_section tbody").height();
    let exteriorColorsHeight = jQuery("#exterior_colors_section tbody").height();

    if (interiorColorsHeight==0){
        jQuery("#interior_colors_section").hide();
        no_color++;
    };
    if (exteriorColorsHeight==0){
        jQuery("#exterior_colors_section").hide();
        no_color++;
    };
    if (no_color==2){
        jQuery("#all_colors_section").text("Color data not found");
    };
    
    // hide waranties if null
    console.log("hitung waranties: ", waranties_count)
    if (waranties_count == 0){
        jQuery("#all_warranty_section").text("Warranty data not found").css("border", "none");
        jQuery("#all_warranty_section_new").text("Warranty data not found").css({"font-size": "16px","font-weight": 500,"padding": 0,"border": "none"});
    };

    let safecount = 0;
    
    for(var rat = 1; rat<17; rat++){
        jQuery("#r-hide"+rat+" div.elementor-widget-container:empty").hide();
      var ratingdiv = document.getElementById("r-hide"+rat);
    //   // Get the h3 element inside the div
    if(ratingdiv != undefined){
         const h3Element = ratingdiv.querySelector('p');
       if(h3Element == null){
        //    jQuery(this).parent().hide();
           ratingdiv.classList.add('b-box');
           jQuery('#r-hide'+rat).hide()
           safecount++;
       }
    } }
    console.log(safecount);
    
    if(safecount == 16){
    jQuery("#safetyratingsbox").html("<div class='elementor-element elementor-element-540d2b3c elementor-widget elementor-widget-heading' data-id='540d2b3c' data-element_type='widget' data-widget_type='heading.default'><div class='elementor-widget-container'><h3 class='elementor-heading-title elementor-size-default'>NHTSA Crash Test Overall Ratings</h3></div></div><div class='elementor-element elementor-element-49ca61d4 elementor-widget elementor-widget-text-editor' data-id='49ca61d4' data-element_type='widget' data-widget_type='text-editor.default'><div class='elementor-widget-container'><div class='elementor-text-editor elementor-clearfix'>Safety ratings are not available for this vehicle.</div></div></div>");
     jQuery('.Stars').addClass('hide-stars');
    jQuery(".Stars").html("N/A");
    jQuery("#myBtn").hide();
    jQuery('#sales-listing').nextAll('[data-id="1092e23a"]').hide(); jQuery('[data-id="11f3058c"]').nextAll('[data-id="38aa023e"]').hide(); //remove all section in year page then trim page (For published pages - ford)
    jQuery('.ratings-section').hide(); //remove rating section (Year and Trim)
        
    }
        if(document.getElementById('elementor-tab-content-1481') != undefined){ //dvh
            powerTrainCounter=0;
            function countLength(accordionSpecBoxes){
                const totalLength = accordionSpecBoxes.reduce((acc, specBox) => acc + specBox.textContent.trim().length, 0);
                return totalLength
            };
            const powertrainaccord1 = Array.from(document.querySelectorAll('#elementor-tab-content-1481 .spec-box'));
            const powertrainaccord2 = Array.from(document.querySelectorAll('#elementor-tab-content-1482 .spec-box'));
            const powertrainaccord3 = Array.from(document.querySelectorAll('#elementor-tab-content-1483 .spec-box'));

            if(countLength(powertrainaccord1) == 0){
                // console.log('HIDE 1')
                jQuery("#elementor-tab-content-1481").hide();
                jQuery("#elementor-tab-title-1481").hide();
                powerTrainCounter++;
            };
            if(countLength(powertrainaccord2) == 0){
                // console.log('HIDE 2')
                jQuery("#elementor-tab-content-1482").hide();
                jQuery("#elementor-tab-title-1482").hide();
                powerTrainCounter++;
            };
            if(countLength(powertrainaccord3) == 0){
                // console.log('HIDE 3')
                jQuery("#elementor-tab-content-1483").hide();
                jQuery("#elementor-tab-title-1483").hide();
                powerTrainCounter++;
            };
            if(powerTrainCounter == 3){
                // console.log('HIDE POWERTRAIN')
                jQuery("#powertrainheading").hide();
                jQuery("#powertrainheadingdivider").hide();
                jQuery("#powertrainaccordin").hide();
            };
            
        }
        console.log("accordion");
        // if(document.getElementById('elementor-tab-content-1691') != undefined){ //testing site
        //     let powertrainaccord1 = jQuery("#elementor-tab-content-1691 .d-list #value53").text();
        //     let powertrainaccord2 = jQuery("#elementor-tab-content-1692 .d-list #value68").text();
        //     let powertrainaccord3 = jQuery("#elementor-tab-content-1693 .d-list #value80").text();
        //     if(powertrainaccord1.length == 0){
        //         jQuery("#elementor-tab-content-1691").hide();
        //         jQuery("#elementor-tab-title-1691").hide();
        //     }
        //     if(powertrainaccord2.length == 0){
        //         jQuery("#elementor-tab-content-1692").hide();
        //         jQuery("#elementor-tab-title-1692").hide();
        //     }
        //     if(powertrainaccord3.length == 0){
        //         jQuery("#elementor-tab-content-1693").hide();
        //         jQuery("#elementor-tab-title-1693").hide();
        //     }
        //     if(powertrainaccord1.length == 0 && powertrainaccord3.length == 0 && powertrainaccord2.length == 0){
        //         jQuery("#powertrainheading").hide();
        //         jQuery("#powertrainheadingdivider").hide();
        //         jQuery("#powertrainaccordin").hide();
        //     }
            
        // };

        // Check if the element with ID "Specifications" has class "new"
        var specificationsElement = document.getElementById("Specifications");

        if (specificationsElement && specificationsElement.classList.contains("new")) {
            console.log("This is new spesification!");
            oldSpesification = false;
        } else if (specificationsElement) {
            console.log("Old Spesification, run code to change measurment!");
            oldSpesification = true;
        };

        traileringheading();
        greenscoreheading();
        suspensionheading();
        tiresheading();
        brakingheading();
        steeringheading();
        weightsheading();
        interiordimensionsheading();
        exteriordimensionheading();
        wheelsheading();
        seatingheading();
        doorsheading();
        transmissionheading();
        mileageheading();
        fuelheading();
        engineheading();
        removeLoading();
        
    for(var spec = 53; spec<=100; spec++){
        jQuery("#spec-hide"+spec+" span:empty").each( function () {     jQuery(this).parent().hide(); 
     })};
        let recallcount=0;
        for(var re = 1; re<=15; re++){
            if(document.getElementById("recall"+re) != null ){
                if(jQuery("#recalldate"+re+" em").text().length === 0){
                    jQuery("#recall"+re).hide(); 
                    recallcount++;
                }
                if(recallcount==15){
                    jQuery("#recallslist").html("<h3>Recalls are not available for this vehicle</h3>");
                }
                
            }
        };
    let salestitle_hide=0;
    for(var sa = 1; sa<=10; sa++){
    	if(document.getElementById("sales"+sa) != null ){
    		if(jQuery("#salestitle"+sa+" img").length === 0){
    			// jQuery("#sales"+sa).hide(); 
    			jQuery("#sales"+sa).css("visibility", "hidden");
    			salestitle_hide++;
    		}

    		if(salestitle_hide>=6){
    			jQuery("#saleslist-row2").hide();
    		}


    		if(salestitle_hide==10){
    			jQuery("#saleslist").html("<h3>Cars for sale records are not available</h3>");
    		}
            
    	}  
    };

    // add alt image to listing image
    let salestitle=0;
    for(var sa = 1; sa<=10; sa++){
    	if(document.getElementById("sales"+sa) != null ){

            var imageElement = document.querySelector("#salestitle"+sa+" img");
            if (imageElement) {
                
                // Get the current URL
                var currentURL = window.location.href;

                // Check if the URL contains "vin-decoder"
                if (currentURL.includes("vin-decoder")) {
                // Remove "vin-decoder" from the URL
                currentURL = currentURL.replace("/vin-decoder", "");
                }

                // Extract the desired parts from the URL
                var parts = currentURL.split('/');
                var year = parts[parts.length - 1];
                var make = parts[parts.length - 2];
                var model = parts[parts.length - 3];

                // Create the desired text
                var result = year + '-' + make + '-' + model + '-sales-listing-'+sa;

                imageElement.alt = result;
                salestitle++;
            }             
    	}  
    };
    // change copy of heading in listing image
    var firstH2 = document.querySelector('#sales-listing h2');

    // Check if the element exists before updating its content
    if (firstH2) {
        // Get the current text content
        var currentText = firstH2.textContent;
        // Remove the last two words
        var newText = currentText.split(' ').slice(0, -2).join(' ');
        // Append "Cars for Sale"
        newText += " Cars for Sale";
        // Update the text content
        firstH2.textContent = newText;
    } else {
        console.log("There is no Car listing section");
    };

    // hide Invoice price and Delivery charges if not available
    var counterInvoice_delivery = 0;

    var invoicePriceValue = document.getElementById('invoice-price-value');
    var deliveryValue = document.getElementById('delivery-charges-value');

    if (invoicePriceValue) {
        // You can access the value of the element or perform any other actions here
    } else {
        var invoicePriceContainer = document.getElementById('invoice-price-container');
        if (invoicePriceContainer) {
            invoicePriceContainer.style.display = 'none';
            counterInvoice_delivery++;
        };
    };
    if (deliveryValue) {
        // You can access the value of the element or perform any other actions here
    } else {
        var deliveryContainer = document.getElementById('delivery-charges-container');
        if (deliveryContainer) {
            deliveryContainer.style.display = 'none';
            counterInvoice_delivery++;
        };
    };
    
    // hide Base MSRP and Total price if not available
    var counterMsrp_totalPrice = 0;
    var baseMsrpValue = document.getElementById('base-msrp-value');
    var totalPriceValue = document.getElementById('total-price-value');

    if (baseMsrpValue) {
        // You can access the value of the element or perform any other actions here
    } else {
        var baseMsrpContainer = document.getElementById('base-msrp-container');
        if (baseMsrpContainer) {
            baseMsrpContainer.style.display = 'none';
            counterMsrp_totalPrice++;
        };
    };
    if (totalPriceValue) {
        // You can access the value of the element or perform any other actions here
    } else {
        var totalPriceContainer = document.getElementById('total-price-container');
        if (totalPriceContainer) {
            totalPriceContainer.style.display = 'none';
            counterMsrp_totalPrice++;
        };
    };
    if (counterInvoice_delivery==2){
        document.getElementById('invoice-and-delivery-container').style.display = 'none';
    };
    if (counterMsrp_totalPrice==2){
        document.getElementById('msrp-and-total-container').style.display = 'none';
    };
    if (counterInvoice_delivery == 1 & counterMsrp_totalPrice == 1){
        document.getElementById('invoice-delivery-msrp-total-container').style.flexDirection = 'row';
    }

    // Change MPG Value if not exist
    var MPG_header = document.querySelector('#mpg-header p');
    var MPG_value = document.querySelector('#mpg-value p');

    // Check if the element is found
    if (MPG_value !== undefined && MPG_value !== null && MPG_header !== undefined && MPG_header !== null) {
    // Get the text content and calculate its length
    var textContent = MPG_value.textContent.trim();
    var lengthOfMPG = textContent.length;

    if (lengthOfMPG==1){
        console.log('MPG_value not found');
        // try this
        try {
        var MPG_newHeader= "Seats"; //max seating heading
        var MPG_newValue= document.getElementById('value103').textContent.trim(); //max seating value
        MPG_header.innerHTML = MPG_newHeader;
        MPG_value.innerHTML = MPG_newValue;
        } catch (error) {
        var na_element = document.createElement('span');
        na_element.style.fontWeight = '900';
        na_element.style.fontFamily = 'Montserrat';
        na_element.textContent = 'N/A';
        MPG_value.innerHTML = '';
        MPG_value.appendChild(na_element);
        }
    }
    };


    // Change Safety Ratings Value if not exist
    var rating_value = document.querySelector('#safety-ratings .Stars');
    var rating_header = document.querySelector('[data-id="2734ea85"] p');
    // Check the length of the style attribute
    if (rating_value && rating_value.getAttribute('style').length == 10) {
    console.log('rating_value not found');
    var rating_newHeader = "Transmission"; //transmission type heading
    var rating_newValue = document.getElementById('value33').innerHTML; //transmission type value, both with auto and manual

    rating_header.innerHTML = rating_newHeader;
    jQuery("#safety-ratings .Stars").html(rating_newValue); //new value
    jQuery('#safety-ratings .Stars').css({color: '#000000', fontFamily: 'Montserrat, Sans-serif', fontSize: '16px', fontWeight: '700', letterSpacing: '1px'});
    jQuery('#safety-ratings .Stars').addClass('hide-before');
    }; 


    // Change engine Value if not exist
    var engine_section = document.querySelector('[data-id="7bfad430"]');
    var engine_header = document.querySelector('[data-id="3b1aefcc"] p');
    var engine_value = document.querySelector('[data-id="609c5bd"] p');

    // Check if the element is found
    if (engine_header !== undefined && engine_header !== null && engine_value === null) {
        console.log('engine_value not found');
        // try this
        try {
            var engine_newHeader= document.querySelector('#spec-hide6 > span').textContent.trim(); //max seating heading
            var engine_newValue= document.getElementById('value6').textContent.trim(); //max seating value
            engine_header.innerHTML = engine_newHeader;
            // add span tag
            var paragraphElement = document.createElement('span');
            paragraphElement.textContent = engine_newValue;
            paragraphElement.classList.add('section1_text_style');
            engine_section.appendChild(paragraphElement);
        } catch (error) {
            var na_element = document.createElement('span');
            na_element.style.fontWeight = '900';
            na_element.style.fontFamily = 'Montserrat';
            na_element.textContent = 'N/A';
            engine_section.appendChild(na_element);
        }
    };
    if (engine_header){
        if (engine_header.innerHTML === "Engine") {
            engine_header.innerHTML = "Engine Type";
        };
    };

    // Change msrp Value if not exist
    var msrp_section = document.querySelector('[data-id="3cdb1fc7"]');
    var msrp_header = document.querySelector('[data-id="7e786547"] p');
    var msrp_value = document.querySelector('[data-id="244a6e53"] p');

    // Check if the element is found
    if (msrp_header !== undefined && msrp_header !== null && msrp_value === null) {
    console.log('msrp_value not found');
        // try this
        try {
            var msrp_newHeader= document.querySelector('#spec-hide9 > span').textContent.trim(); //max seating heading
            var msrp_newValue= document.getElementById('value9').textContent.trim(); //max seating value
            msrp_header.innerHTML = msrp_newHeader;
            // add span tag
            var paragraphElement = document.createElement('span');
            paragraphElement.textContent = msrp_newValue;
            paragraphElement.classList.add('section1_text_style');
            msrp_section.appendChild(paragraphElement);
            // document.querySelector('[data-id="77cbbd93"]').style.display = 'none'; //hide other msrp data
            document.getElementById('base-msrp-container').style.display = 'none'; //hide other msrp data
        } catch (error) {
            var na_element = document.createElement('span');
            na_element.style.fontWeight = '900';
            na_element.style.fontFamily = 'Montserrat';
            na_element.textContent = 'N/A';
            msrp_section.appendChild(na_element);
        }
    };

    // add show more button if trim list in year page is to much
    var trimListYear = document.querySelector('[data-id="639213a3"].elementor-widget-icon-list ul');
    
    // Initialize a counter for spans with content
    var trimContentCount = 0;
    
    if (trimListYear){
        var trimContent = trimListYear.querySelectorAll('span.elementor-icon-list-text');
        // Loop through each span element and check if it has content
        trimContent.forEach(function(span) {
            if (span.textContent.trim() !== '') {
                trimContentCount++;
                if (trimContentCount >= 5) {
                    return;
                }
            }
        });
    
        // Check if the ul has more than 5 li elements
        if (trimContentCount > 5) {
            // Add the "contracted" class to the ul
            trimListYear.classList.add('contracted');
    
            // Create a new li element with the "showMore" class and onclick event
            var loadMoreLi = document.createElement('p');
            loadMoreLi.innerHTML = '<a href="javascript:void(0);" class="showMore" onclick="showMoreTrim()">Load More</a>';
    
            // Append the new li element to the ul
            trimListYear.appendChild(loadMoreLi);
        };
    };
    // Transmission checkbox handler
    var checkbox = document.getElementById('transmissionToggle');
    if (checkbox) {
        console.log("Transmission Checkbox Found")
        var optional_transmission_type = jQuery(".transmissionValue").text();
        var automaticData = document.querySelectorAll('.automatic_data');
        var manualData = document.querySelectorAll('.manual_data');
    
        function updateDataDisplay() {
            console.log("updateDisplay");
            if (checkbox.checked) {
                automaticData.forEach(function(automaticData) {
                    automaticData.style.display = 'none';
                });
                manualData.forEach(function(manualData) {
                    manualData.style.display = 'inherit';
                });
            } else {
                automaticData.forEach(function(automaticData) {
                    automaticData.style.display = 'inherit';
                });
                manualData.forEach(function(manualData) {
                    manualData.style.display = 'none';
                });
            }
            transmissionheading();
        };
    
        // Initial call to set display properties based on default checkbox state
    
    
        // Add event listener to checkbox for changes
        checkbox.addEventListener('change', updateDataDisplay);
        if (optional_transmission_type && optional_transmission_type != "{optional_transmission_type}") {
            if (optional_transmission_type == "Automatic") {
                console.log("Automatic");
                updateDataDisplay();
            }
            else if (optional_transmission_type == "Manual"){
                console.log("Manual");
                checkbox.checked = true;
                updateDataDisplay();
            }
        }
        else {
            console.log("No optional_transmission_type");
            checkbox.checked = true;
            updateDataDisplay();
            jQuery(".transmission_html").hide()
        };
    }
    else{
        console.log("No Transmissioim Checkbox")
    };
    // The end of transmission checkbox handler
    });
    var measurements = ["(l)", "(cc)", "(hp)", "(rpm)", "(ft)", "(mm)", "(in)", "(mi)", "(lb)"];
    function moveMeasurment (valueId) {
        var specHeading = jQuery("#spec-hide" + valueId + " span:first");
        var specValue = jQuery("#spec-hide" + valueId + " #value" + valueId);
        var foundMeasurement = measurements.find(measurement => specHeading.text().includes(measurement));
        if (foundMeasurement) {
            specHeading.text(specHeading.text().replace(foundMeasurement, ""));
            specValue.text(specValue.text() + " " + foundMeasurement);
            // console.log("Measurement found:", foundMeasurement);
        };
    }
    function traileringheading(){
        count = 0;
        for(let k=189; k<=195; k++ ){
           if(document.getElementById("spec-hide"+k) != null){
            if(jQuery("#spec-hide"+k+" span").text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().length == 0){
                // jQuery("#spec-hide"+k).hide();
                jQuery("#spec-hide" + k).remove();
            } else if (oldSpesification) {
                moveMeasurment(k);
                count++;
            } else{
                count++;
            };
        }	
    }
    
        if(count==0 && document.getElementById("traileringheading") != null){
            jQuery("#traileringheading").hide();
            jQuery("#trailerheadingdivider").hide();
            
        }
    };
    function greenscoreheading(){
        count = 0;
        for(let k=217; k<=218; k++ ){
           if(document.getElementById("spec-hide"+k) != null){
            if(jQuery("#spec-hide"+k+" span").text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().length == 0){
                // jQuery("#spec-hide"+k).hide();
                jQuery("#spec-hide" + k).remove();
            }else{
                count++;
            }
        }	}
    
        if(count==0 && document.getElementById("greenscoreheading") != null){
            jQuery("#greenscoreheading").hide();
            jQuery("#greenscoreheadingdivider").hide();
            
        }
    };
    function suspensionheading(){
        count = 0;
        for(let k=211; k<=216; k++ ){
           if(document.getElementById("spec-hide"+k) != null){
            if(jQuery("#spec-hide"+k+" span").text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().length == 0){
                // jQuery("#spec-hide"+k).hide();
                jQuery("#spec-hide" + k).remove();
            }else{
                count++;
            };
            };
        };
    
        if(count==0 && document.getElementById("suspensionheading") != null){
            jQuery("#suspensionheading").hide();
            jQuery("#suspensionheadingdivider").hide();
            
        };
    };
    
    function tiresheading(){
        count = 0;
        for(let k=206; k<=210; k++ ){
           if(document.getElementById("spec-hide"+k) != null){
            if(jQuery("#spec-hide"+k+" span").text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().length == 0){
                // jQuery("#spec-hide"+k).hide();
                jQuery("#spec-hide" + k).remove();
            }else{
                count++;
            };
            };
        };
    
        if(count==0 && document.getElementById("tiresheading") != null){
            jQuery("#tiresheading").hide();
            jQuery("#tiresheadingdivider").hide();
            
        };
    };
    function brakingheading(){
        count = 0;
        for(let k=196; k<=205; k++ ){
           if(document.getElementById("spec-hide"+k) != null){
            if(jQuery("#spec-hide"+k+" span").text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().length == 0){
                // jQuery("#spec-hide"+k).hide();
                jQuery("#spec-hide" + k).remove();
            }else{
                count++;
            };
        };
    };
    
        if(count==0 && document.getElementById("brakingheading") != null){
            jQuery("#brakingheading").hide();
            jQuery("#brakingheadingdivider").hide();
            
        };
    };
    function steeringheading(){
        count = 0;
        for(let k=182; k<=188; k++ ){
           if(document.getElementById("spec-hide"+k) != null){
            if(jQuery("#spec-hide"+k+" span").text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().length == 0){
                // jQuery("#spec-hide"+k).hide();
                jQuery("#spec-hide" + k).remove();
            } else if (oldSpesification) {
                moveMeasurment(k);
                count++;
            } else{
                count++;
            };
        };
    };
    
        if(count==0 && document.getElementById("steeringheading") != null){
            jQuery("#steeringheading").hide();
            jQuery("#steeringheadingdivider").hide();
            
        };
    };
    
    function weightsheading(){
        count = 0;
        for(let k=169; k<=181; k++ ){
           if(document.getElementById("spec-hide"+k) != null){
            if(jQuery("#spec-hide"+k+" span").text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().length == 0){
                // jQuery("#spec-hide"+k).hide();
                jQuery("#spec-hide" + k).remove();
            } else if (oldSpesification) {
                moveMeasurment(k);
                count++;
            } else{
                count++;
            };
        };
    };
    
        if(count==0 && document.getElementById("weightsheading") != null){
            jQuery("#weightsheading").hide();
            jQuery("#weightsheadingdivider").hide();
            
        };
    };
    function interiordimensionsheading(){
        count = 0;
        for(let k=128; k<=168; k++ ){
           if(document.getElementById("spec-hide"+k) != null){
            if(jQuery("#spec-hide"+k+" span").text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().length == 0){
                // jQuery("#spec-hide"+k).hide();
                jQuery("#spec-hide" + k).remove();
            } else if (oldSpesification) {
                moveMeasurment(k);
                count++;
            } else{
                count++;
            }
        };
    };
    
        if(count==0 && document.getElementById("interiordimensionsheading") != null){
            jQuery("#interiordimensionsheading").hide();
            jQuery("#interiordimensionsheadingdivider").hide();
        };
    };
    function exteriordimensionheading(){
        count = 0;
        for(let k=110; k<=127; k++ ){
           if(document.getElementById("spec-hide"+k) != null){
            if(jQuery("#spec-hide"+k+" span").text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().length == 0){
                // jQuery("#spec-hide"+k).hide();
                jQuery("#spec-hide" + k).remove();
            } else if (oldSpesification) {
                moveMeasurment(k);
                count++;
            } else{
                count++;
            };
        };
    };
    
        if(count==0 && document.getElementById("exteriordimensionheading") != null){
            jQuery("#exteriordimensionheading").hide();
            jQuery("#exteriordimensionheadingdivider").hide();
            
        };
    };
    
    function wheelsheading(){
        count = 0;
        for(let k=104; k<=109; k++ ){
           if(document.getElementById("spec-hide"+k) != null){
            if(jQuery("#spec-hide"+k+" span").text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().length == 0){
                // jQuery("#spec-hide"+k).hide();
                jQuery("#spec-hide" + k).remove();
            } else if (oldSpesification) {
                moveMeasurment(k);
                count++;
            } else{
                count++;
            };
        };
    };
    
        if(count==0 && document.getElementById("wheelsheading") != null){
            jQuery("#wheelsheading").hide();
            jQuery("#wheelsheadingdivider").hide();
            
        };
    };
    function seatingheading(){
        count = 0;
        for(let k=102; k<=103; k++ ){
           if(document.getElementById("spec-hide"+k) != null){
            if(jQuery("#spec-hide"+k+" span").text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().length == 0){
                // jQuery("#spec-hide"+k).hide();
                jQuery("#spec-hide" + k).remove();
            }else{
                count++;
            };
        };
    };
    
        if(count==0 && document.getElementById("seatingheading") != null){
            jQuery("#seatingheading").hide();
            jQuery("#seatingheadingdivider").hide();
            
        };
    };
    function doorsheading(){
        count = 0;
        for(let k=101; k<=101; k++ ){
           if(document.getElementById("spec-hide"+k) != null){
            if(jQuery("#spec-hide"+k+" span").text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().length == 0){
                // jQuery("#spec-hide"+k).hide();
                jQuery("#spec-hide" + k).remove();
            }else{
                count++;
            };
        };
    };
    
        if(count==0 && document.getElementById("doorsheading") != null){
            jQuery("#doorsheading").hide();
            jQuery("#doorsheadingdivider").hide();
            
        };
    };
    function transmissionheading(){
        var specificationsTab = document.getElementById("Specifications");

        // Check if the element exists or not in the initial, so we can make it back like this.
        if (specificationsTab) {
            // Get the style attribute of the element
            var styleAttribute = specificationsTab.getAttribute("style");

            // Check if styleAttribute is empty or contains "display: none !important;"
            if (!styleAttribute || styleAttribute === "display: none !important;") {
                var initial = "none";
                console.log("Initial variable set to 'none'");
            }
            specificationsTab.style.setProperty('display', 'block', 'important');
        };

        count = 0;
        removed = 0;
        for(let k=33; k<=52; k++ ){
            if(document.getElementById("spec-hide"+k) != null){
                jQuery("#spec-hide" + k).show();
                jQuery("#transmissionheading").show();
                jQuery("#transmissionheadingdivider").show();
                console.log(k, jQuery("#spec-hide"+k+" span").text().length, jQuery("#spec-hide"+k+" #value"+k).text().length, jQuery("#spec-hide"+k+" #value"+k).height())
                if(jQuery("#spec-hide"+ k +" span").text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).height() == 0){
                    jQuery("#spec-hide" + k).hide();
                    removed++;
                }else{
                    jQuery("#spec-hide" + k).show();
                    jQuery("#spec-hide" + k).removeClass("even odd");
                    count++;
                    if (count % 2 === 0) {
                        jQuery("#spec-hide" + k).addClass("optional-spec-box even");
                    } else {
                        jQuery("#spec-hide" + k).addClass("optional-spec-box odd");
                    }
                };
            };
        };
    
        if(count==0 && document.getElementById("transmissionheading") != null){
            jQuery("#transmissionheading").hide();
            jQuery("#transmissionheadingdivider").hide();
            
        };
        console.log("removed:", removed, "  available:", count);

        // display none again if the initial is none
        if (initial == "none"){
            specificationsTab.style.setProperty('display', 'none', 'important');
        };
    };
    function mileageheading(){
        count = 0;
        for(let k=24; k<=32; k++ ){
           if(document.getElementById("spec-hide"+k) != null){
            if(jQuery("#spec-hide"+k+" span").text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().trim().split(" ")[0] === "0") {
                // jQuery("#spec-hide"+k).hide();
                jQuery("#spec-hide" + k).remove();
            } else if (oldSpesification) {
                moveMeasurment(k);
                count++;
            } else{
                count++;
            };
        };
    };
    
        if(count==0 && document.getElementById("mileageheading") != null){
            jQuery("#mileageheading").hide();
            jQuery("#mileageheadingdivider").hide();
            
        };
    };
    function fuelheading(){
        count = 0;
        for(let k=18; k<=23; k++ ){
           if(document.getElementById("spec-hide"+k) != null){
            if(jQuery("#spec-hide"+k+" span").text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().length == 0){
                // jQuery("#spec-hide"+k).hide();
                jQuery("#spec-hide" + k).remove();
            } else if (oldSpesification) {
                moveMeasurment(k);
                count++;
            } else{
                count++;
            };
        };
    };
    
        if(count==0 && document.getElementById("fuelheading") != null){
            jQuery("#fuelheading").hide();
            jQuery("#fuelheadingdivider").hide();
            
        };
    };
    function engineheading(){
        count = 0;
        for(let k=1; k<=17; k++ ){
           if(document.getElementById("spec-hide"+k) != null){
            if(jQuery("#spec-hide"+k+" span").text().length == 0 || jQuery("#spec-hide"+k+" #value"+k).text().length == 0){
                // jQuery("#spec-hide"+k).hide();
                jQuery("#spec-hide" + k).remove();
            } else if (oldSpesification) {
                moveMeasurment(k);
                count++;
            }
            else{
                count++;
            };
        };
    };
     
        if(count==0 && document.getElementById("engineheading") != null){
            jQuery("#engineheading").hide();
            jQuery("#engineheadingdivider").hide();
            
        };
    };
    // show #more the ratting
    function myFunction() {
      var dots = document.getElementById("dots");
      var moreText = document.getElementById("more");
      var btnText = document.getElementById("myBtn");
    
      if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "View full ratings"; 
        // moreText.style.display = "none";
      } else {
        dots.style.display = "none";
        btnText.innerHTML = "Close"; 
        moreText.style.display = "inline";
      };
    };
    
    function myFunction2() {
      var dotts = document.getElementById("dotts");
      var moreTextt = document.getElementById("read-more");
      var btnTextt= document.getElementById("myBtn2");
    
      if (dotts.style.display === "none") {
        dotts.style.display = "inline";
        btnTextt.innerHTML = "View more"; 
        moreTextt.style.display = "none";
      } else {
        dotts.style.display = "none";
        btnTextt.innerHTML = "View less"; 
        moreTextt.style.display = "inline";
      };
    };
    
    function myFunction3() {
      var dottts = document.getElementById("dottts");
      var moreTexttt = document.getElementById("r-more");
      var btnTexttt= document.getElementById("myBtn3");
    
      if (dottts.style.display === "none") {
        dottts.style.display = "inline";
        btnTexttt.innerHTML = "View more"; 
        moreTexttt.style.display = "none";
      } else {
        dottts.style.display = "none";
        btnTexttt.innerHTML = "View less"; 
        moreTexttt.style.display = "inline";
      };
    };
    function findSiblingDivBySpanClass(spanId, divClass) {
      var siblingElement = document.getElementById(spanId).nextElementSibling;
    
      while (siblingElement !== null) {
        if (siblingElement.classList.contains(divClass) && siblingElement.tagName.toLowerCase() === 'div') {
          return siblingElement; // Found the div element
        }
        siblingElement = siblingElement.nextElementSibling;
      }
    
      return null; // If no matching div is found
    };
    
    function openCity(evt, cityName) {
      let i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.setProperty('display', 'none', 'important');
        // tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    //   document.getElementById(cityName).style.display = "block";
      document.getElementById(cityName).style.setProperty('display', 'block', 'important');

      evt.currentTarget.className += " active";
    };

    // toogle info for warranty section
    function toggleInfoWarranties(elementId) {
        var element = document.getElementById(elementId);
        var parentId = elementId.replace('_info_txt', '');

        // Toggle the visibility of the element
        if (element.style.display === 'none') {
            element.style.display = 'block';
            document.getElementById(parentId).style.zIndex = 2;
        } else {
            element.style.display = 'none';
            document.getElementById(parentId).style.zIndex = 1;
        }
    };
    // show more button for year page when trim is to much
    function showMoreTrim() {
        var trimListYear = document.querySelector('[data-id="639213a3"].elementor-widget-icon-list ul');
        if (trimListYear.classList.contains('expanded')) {
            trimListYear.classList.remove('expanded');
            trimListYear.classList.add('contracted');
            document.querySelector('.showMore').innerHTML="Load More";
        } else if (trimListYear.classList.contains('contracted')) {
            trimListYear.classList.remove('contracted');
            trimListYear.classList.add('expanded');
            document.querySelector('.showMore').innerHTML="Show Less";
        };
        console.log("Load More clicked!");
      };

    //   Remove loading animation
    function removeLoading() {
        // Remove class "loading_data" from all elements
        var elementsWithLoadingDataClass = document.querySelectorAll('.loading_data');
            elementsWithLoadingDataClass.forEach(function(element) {
                element.classList.remove('loading_data');
            });

        // Add display: none to all elements that contain class "loadingAnimation_container" or "loadingAnimation"
        var elementsWithLoadingAnimationClass = document.querySelectorAll('.loadingAnimation_container, .loadingAnimation');
            elementsWithLoadingAnimationClass.forEach(function(element) {
                element.style.display = 'none';
            });
    }
    console.log("YMMT JS is Working!!");
// };