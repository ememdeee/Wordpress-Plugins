<?php
// Enqueue JavaScript and CSS
function enqueue_site_forms_js() {
    // Call the Javascript code
    wp_enqueue_script('site_forms', plugins_url('site_forms.js', __FILE__), array('jquery'), '1.0.95', true);
    wp_enqueue_script('validate_coupon', plugins_url('validate_coupon.js', __FILE__), array('jquery'), '1.0.95', true);

    $domain_name = get_option('site_forms_domain_name', $_SERVER['SERVER_NAME']);
    $member_area_preview = get_option('site_forms_member_area_preview', 'cwampv_proxy');
    $reference_domain = get_option('site_forms_reference_domain', '');
    $pricing = get_option('site_forms_pricing', '{"status":"success","plans":{"CODE1":{"price":15,"nos":"1","name":"Dummy","currency_code":"USD"},"CODE2":{"price":25,"nos":"25","name":"Dummy","currency_code":"USD"},"CODE5":{"price":55,"nos":"5","name":"Dummy","currency_code":"USD"}}}');
    
    global $site_forms_pricing_data;
    $site_forms_pricing_data = $pricing;

    wp_localize_script('site_forms', 'site_forms_vars', array(
        'domainName' => $domain_name,
        'memberAreaPreview' => $member_area_preview,
        'referenceDomain' => $reference_domain,
        'pricing' => $pricing
    ));
}

function enqueue_admin_custom_js() { // Enqueue admin custom script only
    if (is_admin()) {
        wp_enqueue_script('site_forms_admin_custom', plugins_url('admin_script.js', __FILE__), array('jquery'), '1.0.95', true);
        
        $domain_name = get_option('site_forms_domain_name', $_SERVER['SERVER_NAME']);

        wp_localize_script('site_forms_admin_custom', 'site_forms_admin_vars', array(
            'domainName' => $domain_name,
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('update_pricing_nonce')
        ));
    }
}

add_action('wp_enqueue_scripts', 'enqueue_site_forms_js');
add_action('admin_enqueue_scripts', 'enqueue_admin_custom_js');

?>