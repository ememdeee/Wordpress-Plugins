<?php
/*
 * Plugin Name: Plugin Wordpress
 * Plugin URI: https://github.com/ememdeee
 * Description: JavaScript and CSS support for Plugin Wordpress functionality.
 * Version: 1.1.1
 * Author: Muhammad Basurah
 * Author URI: https://www.basrh.com/
 * Text Domain: plugin-wordpress
 * Domain Path: /languages
 */

// Define constants for plugin paths and version.
define('PLUGIN_VERSION', '1.1.1');
define('PLUGIN_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('PLUGIN_PLUGIN_URL', plugin_dir_url(__FILE__));

// Load text domain for translations.
function plugin_load_textdomain() {
    load_plugin_textdomain('plugin-wordpress', false, dirname(plugin_basename(__FILE__)) . '/languages');
}
add_action('plugins_loaded', 'plugin_load_textdomain');

// Enqueue JavaScript.
function plugin_enqueue_scripts() {
    wp_enqueue_script(
        'plugin-wordpress-script',
        PLUGIN_PLUGIN_URL . 'assets/js/plugin-wordpress.js',
        array('jquery'),
        PLUGIN_VERSION,
        true
    );
}
add_action('wp_enqueue_scripts', 'plugin_enqueue_scripts');

// Enqueue CSS.
function plugin_enqueue_styles() {
    wp_enqueue_style(
        'plugin-wordpress-style',
        PLUGIN_PLUGIN_URL . 'assets/css/plugin-wordpress.css',
        array(),
        PLUGIN_VERSION
    );
}
add_action('wp_enqueue_scripts', 'plugin_enqueue_styles');

// Include shortcodes.
function plugin_include_shortcodes() {
    $shortcodes_file = PLUGIN_PLUGIN_PATH . 'shortcodes/shortcode-functions.php';

    if (file_exists($shortcodes_file)) {
        require_once $shortcodes_file;
    } else {
        error_log('Plugin Wordpress: Shortcode file not found at ' . $shortcodes_file);
    }
}
add_action('plugins_loaded', 'plugin_include_shortcodes');
