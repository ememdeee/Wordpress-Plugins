<?php
/*
 * Plugin Name: Site Forms
 * Description: Javascript, and CSS code to support Site Forms.
 * Version: 1.0.95
 * Author: Muhammad Basurah
 */

require_once plugin_dir_path(__FILE__) . 'enqueue-scripts.php';
require_once plugin_dir_path(__FILE__) . 'admin_page.php';
require_once plugin_dir_path(__FILE__) . 'cron-functions.php';

// Function to handle AJAX request for updating site_forms_pricing
function update_site_forms_pricing() {
    // Check if the current user has the right capability
    if (!current_user_can('manage_options')) {
        wp_send_json_error('Unauthorized', 403);
    }

    // Check for nonce for security
    check_ajax_referer('update_pricing_nonce', 'security');

    // Get the data from the AJAX request
    if (isset($_POST['data'])) {
        $data = wp_unslash($_POST['data']); // Sanitize input
        // Update the option in the database
        update_option('site_forms_pricing', $data);

        // Send a success response
        wp_send_json_success('Pricing data updated successfully');
    } else {
        wp_send_json_error('No data provided', 400);
    }
}
add_action('wp_ajax_update_site_forms_pricing', 'update_site_forms_pricing');

// shortcodes
define( 'SITEFORM_PATH', trailingslashit( plugin_dir_path(__FILE__) ) );
require_once SITEFORM_PATH . '/shortcodes/shortcode_functions.php';
?>