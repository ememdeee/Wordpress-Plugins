<?php
/*
 * Plugin Name: Validate Coupon
 * Description: Verify the coupon code's is inside V1 API to determine its validity for activation.
 * Version: 1.1.20
 * Author: Akinade & Muhammad Basurah
 */

// Call the javascript code
function enqueue_public_js() {
    wp_enqueue_script('public', plugins_url('public.js', __FILE__), array('jquery'), '1.1.20', true);
    wp_enqueue_script('redirect', plugins_url('redirect.js', __FILE__), array('jquery'), '1.1.20', true);
}

add_action('wp_enqueue_scripts', 'enqueue_public_js');