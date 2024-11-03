<?php
// Enable dynamic title tags
add_theme_support('title-tag');

// Function to enqueue styles
function ep_blank_theme_enqueue_styles() {
    // Enqueue the default style.css
    wp_enqueue_style('style', get_stylesheet_uri());

    // Conditionally enqueue cd-style.css if the domain is classicdecoder.com
    if ( $_SERVER['HTTP_HOST'] === 'classicdecoder.com' ) {
        wp_enqueue_style('cd-style', get_template_directory_uri() . '/cd-style.css');
    }
}
add_action('wp_enqueue_scripts', 'ep_blank_theme_enqueue_styles');



// disable elementor in home page for page that using HTML for the Home Page
function disable_elementor_on_homepage() {
    // Check if it's the homepage and the domain is developtestsite.com
    if ( is_front_page() && $_SERVER['HTTP_HOST'] === 'developtestsite.com' ) {
        // enqueue dvh-homepage.css if the domain DVH and home-page
        wp_enqueue_style('dvh-homepage', get_template_directory_uri() . '/dvh-homepage.css');

        // Dequeue Elementor's styles
        wp_dequeue_style( 'wp-block-library' );

        // Disable Elementor for the homepage
        add_filter( 'elementor/documents/get/post_id', function( $post_id ) {
            return 0; // Return 0 to disable Elementor for the homepage
        }, 999 );
    }
}
add_action( 'wp', 'disable_elementor_on_homepage' );
