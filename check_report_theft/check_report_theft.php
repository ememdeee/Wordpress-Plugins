<?php
/*
 * Plugin Name: Check & Report Theft
 * Description: Html, Javascript, and CSS code to Check & Report Theft.
 * Version: 1.0.31
 * Author: Muhammad Basurah
 */

// Call the Javascript code
function enqueue_checkReportTheft_js() {
    wp_enqueue_script('check_report_theft', plugins_url('check_report_theft.js', __FILE__), array('jquery'), '1.0.31', true);
}

function enqueue_checkReportTheft_styles() {
    wp_enqueue_style('check_report_theft', plugins_url('check_report_theft.css', __FILE__), array(), '1.0.31');
}

add_action('wp_enqueue_scripts', 'enqueue_checkReportTheft_js');
add_action('wp_enqueue_scripts', 'enqueue_checkReportTheft_styles');

// shortcodes
define( 'THEFTFORM_PATH', trailingslashit( plugin_dir_path(__FILE__) ) );
require_once THEFTFORM_PATH . '/shortcodes/shortcode_functions.php';
?>