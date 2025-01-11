<?php
/*
 * Plugin Name: YPF Wordpress
 * Plugin URI: https://github.com/ememdeee/Wordpress-Plugins/tree/main/ypf-wordpress
 * Description: JavaScript and CSS support for YPF Wordpress functionality, including WooCommerce API integration.
 * Version: 1.2.0
 * Author: Muhammad Basurah
 * Author URI: https://www.basrh.com/
 * Text Domain: ypf-wordpress
 * Domain Path: /languages
 */

define('YPF_VERSION', '1.2.0');
define('YPF_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('YPF_PLUGIN_URL', plugin_dir_url(__FILE__));

// Load text domain for translations.
function ypf_load_textdomain() {
    load_plugin_textdomain('ypf-wordpress', false, dirname(plugin_basename(__FILE__)) . '/languages');
}
add_action('plugins_loaded', 'ypf_load_textdomain');

// Autoload classes.
spl_autoload_register(function ($class_name) {
    if (strpos($class_name, 'YPF_') === 0) {
        $class_file = YPF_PLUGIN_PATH . 'includes/' . strtolower(str_replace('_', '-', $class_name)) . '.php';
        if (file_exists($class_file)) {
            require_once $class_file;
        } else {
            error_log("Class file for {$class_name} not found at {$class_file}");
        }
    }
});

// Enqueue assets.
function ypf_enqueue_assets() {
    wp_enqueue_script(
        'ypf-wordpress-script',
        YPF_PLUGIN_URL . 'assets/js/ypf-wordpress.js',
        array('jquery'),
        YPF_VERSION,
        true
    );

    wp_enqueue_style(
        'ypf-wordpress-style',
        YPF_PLUGIN_URL . 'assets/css/ypf-wordpress.css',
        array(),
        YPF_VERSION
    );

    // Enqueue Tailwind CSS in the admin page using CDN
    if (is_admin()) {
        wp_enqueue_style(
            'tailwind-css',
            'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css', // You can use the latest version here
            array(),
            null, // Version is set to null because it's loaded from a CDN
            'all'
        );
    }
}
add_action('wp_enqueue_scripts', 'ypf_enqueue_assets');
add_action('admin_enqueue_scripts', 'ypf_enqueue_assets');

// Include shortcodes.
function ypf_include_shortcodes() {
    $shortcodes_file = YPF_PLUGIN_PATH . 'shortcodes/shortcode-functions.php';

    if (file_exists($shortcodes_file)) {
        require_once $shortcodes_file;
    } else {
        error_log('YPF Wordpress: Shortcode file not found at ' . $shortcodes_file);
    }
}
add_action('plugins_loaded', 'ypf_include_shortcodes');

// Initialize the plugin.
function ypf_initialize_plugin() {
    error_log('Initializing YPF Plugin...');
    $loader = new YPF_Loader();
    $loader->init();
}
add_action('plugins_loaded', 'ypf_initialize_plugin');
