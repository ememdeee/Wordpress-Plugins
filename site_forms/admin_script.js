document.addEventListener('DOMContentLoaded', function() {
    domainName = site_forms_admin_vars.domainName;
    console.log("Domain Name:", domainName);

    // Function to fetch data from the API and send it to the server
    function updateSiteFormsPricing() {
        console.log("updating site forms pricing")
        var refreshBtn = document.getElementById('refresh_pricing_button');
        const apiUrl = 'https://app.' + domainName +'/wp/report_plans';

        // Fetch data from the API
        fetch(apiUrl)
            .then(response => {
                // Check if the response is ok (status 200)
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                // Parse the JSON data
                return response.json();
            })
            .then(data => {
                // Check if status is success
                if (data.status === 'success') {
                    console.log('Data:', data);

                    // Send the data to the custom endpoint via AJAX
                    fetch(site_forms_admin_vars.ajaxurl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        },
                        body: new URLSearchParams({
                            action: 'update_site_forms_pricing',
                            security: site_forms_admin_vars.nonce,
                            data: JSON.stringify(data)
                        })
                    })
                    .then(response => response.json())
                    .then(responseData => {
                        if (responseData.success) {
                            refreshBtn.innerHTML = 'Updated!';
                            console.log('Success:', responseData.data);
                        } else {
                            console.error('Error:', responseData.data);
                        }
                    })
                    .catch(error => {
                        console.error('There was a problem with the AJAX operation:', error);
                    });

                } else {
                    console.error('Failed to fetch plans data');
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    // Expose the function globally so it can be called from the console or other scripts
    window.updateSiteFormsPricing = updateSiteFormsPricing;
});