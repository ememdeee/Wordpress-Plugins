<?php

// Add admin menu page
function site_forms_admin_menu() {
    add_menu_page(
        'Site Forms',              // Page title
        'Site Forms',              // Menu title
        'manage_options',        // Capability required
        'site-forms',              // Menu slug
        'site_forms_admin_page',   // Function to render the page
        'dashicons-store',       // Icon URL or class
        20                       // Position in the menu
    );
}

add_action('admin_menu', 'site_forms_admin_menu');
function site_forms_admin_page() {
    ?>
    <div class="wrap">
        <h1>Site Forms Admin Page</h1>
        <form method="post" action="options.php">
            <?php settings_fields('site_forms_settings_group'); ?>
            <?php do_settings_sections('site-forms'); ?>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

function site_forms_settings_section_callback() {
    echo '<p>Settings for Site Forms plugin</p>';
}

function site_forms_domain_name_callback() {
    $domain_name = get_option('site_forms_domain_name', $_SERVER['SERVER_NAME']);
    echo '<input type="text" name="site_forms_domain_name" value="' . esc_attr($domain_name) . '" />';
}

function site_forms_member_area_preview_callback() {
    $member_area_preview = get_option('site_forms_member_area_preview', 'cwampv_proxy');
    echo '<input type="text" name="site_forms_member_area_preview" value="' . esc_attr($member_area_preview) . '" />';
}

function site_forms_reference_domain_callback() {
    $reference_domain = get_option('site_forms_reference_domain', '');
    echo '<input type="text" name="site_forms_reference_domain" value="' . esc_attr($reference_domain) . '" />';
}

function site_forms_pricing_callback() {
    $pricing = get_option('site_forms_pricing', '{"status":"success","plans":{"CODE1":{"price":15,"nos":"1","name":"Dummy","currency_code":"USD"},"CODE2":{"price":25,"nos":"25","name":"Dummy","currency_code":"USD"},"CODE5":{"price":55,"nos":"5","name":"Dummy","currency_code":"USD"}}}');
    echo '<input type="text" name="site_forms_pricing" value="' . esc_attr($pricing) . '" />';
    echo '<button type="button" id="refresh_pricing_button" onclick="updateSiteFormsPricing()">Refresh Pricing</button>';
}

// Callback for the new custom CSS field
function site_forms_custom_css_callback() {
    $custom_css = get_option('site_forms_custom_css', ''); // Retrieve saved CSS
    echo '<textarea name="site_forms_custom_css" rows="10" cols="50" style="width:100%;">' . esc_attr($custom_css) . '</textarea>';
    echo '<p>Enter your custom CSS here. It will be applied to all pages.</p>';
}

// Register settings
function site_forms_register_settings() {
    register_setting('site_forms_settings_group', 'site_forms_domain_name');
    register_setting('site_forms_settings_group', 'site_forms_member_area_preview');
    register_setting('site_forms_settings_group', 'site_forms_reference_domain'); // New field registration
    register_setting('site_forms_settings_group', 'site_forms_pricing'); // New field registration
    register_setting('site_forms_settings_group', 'site_forms_custom_css'); // New field for custom CSS
}

// Add sections and fields
function site_forms_initialize_admin_settings() {
    add_settings_section(
        'site_forms_settings_section',
        'Site Forms Settings',
        'site_forms_settings_section_callback',
        'site-forms'
    );

    add_settings_field(
        'site_forms_domain_name',
        'Domain Name',
        'site_forms_domain_name_callback',
        'site-forms',
        'site_forms_settings_section'
    );

    add_settings_field(
        'site_forms_member_area_preview',
        'MemberAreaPreview',
        'site_forms_member_area_preview_callback',
        'site-forms',
        'site_forms_settings_section'
    );

    add_settings_field(
        'site_forms_reference_domain', 
        'Reference Domain', 
        'site_forms_reference_domain_callback',
        'site-forms',
        'site_forms_settings_section'
    );

    add_settings_field(
        'site_forms_pricing', 
        'Pricing', 
        'site_forms_pricing_callback',
        'site-forms',
        'site_forms_settings_section'
    );

    add_settings_field(
        'site_forms_custom_css', // New field
        'Custom CSS', 
        'site_forms_custom_css_callback', 
        'site-forms', 
        'site_forms_settings_section'
    );
}

// Inject custom CSS into the site header
function site_forms_apply_custom_css() {
    $custom_css = get_option('site_forms_custom_css', '');
    if (!empty($custom_css)) {
        echo '<!-- Custom CSS from Site Forms Plugin --><style>' . $custom_css . '</style>';
    }
}

add_action('wp_head', 'site_forms_apply_custom_css'); // Hook to inject CSS into the header

add_action('admin_init', 'site_forms_register_settings');
add_action('admin_init', 'site_forms_initialize_admin_settings');
?>