<?php
/**
 * Init Public Styles & Scripts
 * 
 * @return void
 */
function notify_public_styles_scripts(){

    //Load OCR Public Styles
    // wp_enqueue_style('notify-public-bootstrap-style', NOTIFYPLUGIN_URL . 'public/css/public-bootstrap-4.3.1.css', '', rand());
    wp_enqueue_style('notify-public-style', NOTIFYPLUGIN_URL . 'public/css/public.css', '', rand());

    //Load OCR Public Scripts
    wp_enqueue_script('notify-public-script', NOTIFYPLUGIN_URL . 'public/js/public.js', array('jquery'), rand(), false);

}
add_action('wp_enqueue_scripts', 'notify_public_styles_scripts');