<?php
/*
 * Plugin Name: VC Forms
 * Description: Javascript, and CSS code to support VC Forms.
 * Version: 1.0.22
 * Author: Muhammad Basurah
 */

// Call the Javascript code
function enqueue_vc_forms_js() {
    wp_enqueue_script('vc_forms', plugins_url('vc_forms.js', __FILE__), array('jquery'), '1.0.22', true);
    $domain_name = get_option('vc_forms_domain_name', $_SERVER['SERVER_NAME']);
    $member_area_preview = get_option('vc_forms_member_area_preview', 'cwampv_proxy');
    wp_localize_script('vc_forms', 'vc_forms_vars', array(
        'domainName' => $domain_name,
        'memberAreaPreview' => $member_area_preview
    ));
}

add_action('wp_enqueue_scripts', 'enqueue_vc_forms_js');

// Add admin menu page
function vc_forms_admin_menu() {
    add_menu_page(
        'VC Forms',              // Page title
        'VC Forms',              // Menu title
        'manage_options',        // Capability required
        'vc-forms',              // Menu slug
        'vc_forms_admin_page',   // Function to render the page
        'dashicons-store',       // Icon URL or class
        20                       // Position in the menu
    );
}

add_action('admin_menu', 'vc_forms_admin_menu');
require_once plugin_dir_path(__FILE__) . 'admin_page.php';

// shortcodes
define( 'VCFORM_PATH', trailingslashit( plugin_dir_path(__FILE__) ) );
require_once VCFORM_PATH . '/shortcodes/shortcode_functions.php';
?>