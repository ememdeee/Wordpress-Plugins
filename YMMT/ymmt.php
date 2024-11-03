<?php
/*
 * Plugin Name: YMMT
 * Description: Javascript, and CSS code to support YMMT Pages.
 * Version: 1.0.20
 * Author: Muhammad Basurah
 */

// Call the Javascript code
function enqueue_ymmt_js() {
    wp_enqueue_script('ymmt', plugins_url('ymmt.js', __FILE__), array('jquery'), '1.0.20', true);
}

// Call the CSS code
function enqueue_ymmt_styles() {
    wp_enqueue_style('ymmt', plugins_url('ymmt.css', __FILE__), array(), '1.0.20');
}

$current_url = $_SERVER['REQUEST_URI'];

if (strpos($current_url, 'vin-decoder/') !== false || strpos($current_url, '&preview=true') !== false) {
    add_action('wp_enqueue_scripts', 'enqueue_ymmt_js');
    add_action('wp_enqueue_scripts', 'enqueue_ymmt_styles');
}
?>