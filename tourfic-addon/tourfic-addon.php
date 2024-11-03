<?php
/*
Plugin Name: Tourfic Addon
Description: Custom modifications for the Tourfic plugin.
Version: 1.72
Author: Muhammad Basurah
*/

// Enqueue the CSS and Javascript files
function enqueue_tourfic_addon_assets() {
    // Enqueue the CSS file
    wp_enqueue_style('tourfic-addon', plugin_dir_url(__FILE__) . 'tourfic-addon.css', array(), '1.72');
    
    // Enqueue the Javascript file
    wp_enqueue_script('tourfic-addon', plugin_dir_url(__FILE__) . 'tourfic-addon.js', array('jquery'), '1.72', true);
}

add_action('wp_enqueue_scripts', 'enqueue_tourfic_addon_assets');

// Hook into WordPress to replace the file at the appropriate time
add_action('plugins_loaded', 'tourfic_addon_init');

function tourfic_addon_init() {
    // Example: Replace the design-default.php file
    // villa page design
    tourfic_addon_replace_file(
        plugin_dir_path(__FILE__) . 'apartment/design-default.php',
        WP_PLUGIN_DIR . '/tourfic/templates/template-parts/apartment/design-default.php'
    );
    // villa form design
    tourfic_addon_replace_file(
        plugin_dir_path(__FILE__) . 'apartment/functions-apartment.php',
        WP_PLUGIN_DIR . '/tourfic/inc/functions/functions-apartment.php'
    );
    // tour page design
    tourfic_addon_replace_file(
        plugin_dir_path(__FILE__) . 'tour/design-1.php',
        WP_PLUGIN_DIR . '/tourfic/templates/template-parts/tour/design-1.php' 
    );
    // tour form design
    tourfic_addon_replace_file(
        plugin_dir_path(__FILE__) . 'tour/functions-tour.php',
        WP_PLUGIN_DIR . '/tourfic/inc/functions/functions-tour.php'
    );
    // core for Enquiry
    tourfic_addon_replace_file(
        plugin_dir_path(__FILE__) . 'core/Enquiry.php',
        WP_PLUGIN_DIR . '/tourfic/inc/Core/Enquiry.php'
    );

    // Add more file replacements here if needed
    // tourfic_addon_replace_file($source_path, $destination_path);
}

/**
 * Replaces a file from source to destination.
 *
 * @param string $source_path The path to the source file.
 * @param string $destination_path The path to the destination file.
 */
function tourfic_addon_replace_file($source_path, $destination_path) {
    if (file_exists($source_path)) {
        $destination_dir = dirname($destination_path);
        if (!is_dir($destination_dir)) {
            mkdir($destination_dir, 0755, true);
        }

        if (copy($source_path, $destination_path)) {
        }
    } else {
        error_log('Tourfic Addon: Source file ' . basename($source_path) . ' not found.');
    }
}