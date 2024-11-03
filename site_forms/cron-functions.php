<?php
// Fetch and update site forms pricing
function fetch_and_update_site_forms_pricing() {
    $apiUrl = 'https://app.' . get_option('site_forms_domain_name', $_SERVER['SERVER_NAME']) . '/wp/report_plans';
    
    // Fetch data from the API
    $response = wp_remote_get($apiUrl);
    
    if (is_wp_error($response)) {
        error_log('Error fetching API data: ' . $response->get_error_message());
        return;
    }
    
    $data = wp_remote_retrieve_body($response);
    $data = json_decode($data, true);
    
    if (isset($data['status']) && $data['status'] === 'success') {
        update_option('site_forms_pricing', json_encode($data));
    } else {
        error_log('API response status is not success');
    }
}

// Schedule a daily event if not already scheduled
if (!wp_next_scheduled('daily_site_forms_update')) {
    wp_schedule_event(time(), 'daily', 'daily_site_forms_update');
}

// Hook the function to the cron event
add_action('daily_site_forms_update', 'fetch_and_update_site_forms_pricing');


// trigger manually using this 
// // Correct path to wp-load.php for Windows
// require_once('C:/xampp/htdocs/mywordpress/wp-load.php');

// // Manually trigger the cron event
// do_action('daily_site_forms_update');
// echo 'Cron job triggered!';

// or this if live (maybe)
// $wordpress_path = plugin_dir_path(__FILE__) . '../../../wp-load.php';

// // Make sure the file exists
// if (file_exists($wordpress_path)) {
//     require_once($wordpress_path);
    
//     // Manually trigger the cron event
//     do_action('daily_site_forms_update');
//     echo 'Cron job triggered!';
// } else {
//     echo 'wp-load.php not found at the specified path';
// }

?>