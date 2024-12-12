<?php
/*
 * Plugin Name: AVL Forms
 * Description: Javascript, and CSS code to support AVL Forms.
 * Version: 1.1.14
 * Author: Muhammad Basurah
 */

// Call the Javascript code
function enqueue_avl_forms_js() {
    wp_enqueue_script('avl-forms', plugins_url('avl-forms.js', __FILE__), array('jquery'), '1.1.14', true);
}

// Call the CSS code
function enqueue_avl_forms_styles() {
    wp_enqueue_style('avl-forms', plugins_url('avl-forms.css', __FILE__), array(), '1.1.14');
}

add_action('wp_enqueue_scripts', 'enqueue_avl_forms_js');
add_action('wp_enqueue_scripts', 'enqueue_avl_forms_styles');

// shortcodes
define( 'AVLFORM_PATH', trailingslashit( plugin_dir_path(__FILE__) ) );
require_once AVLFORM_PATH . '/shortcodes/shortcode-functions.php';
?>