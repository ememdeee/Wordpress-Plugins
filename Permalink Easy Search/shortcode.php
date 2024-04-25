<?php
function list_all_urls_shortcode($atts) {
    // Check if 'paged' parameter exists in the URL query string
    if (isset($_GET['paged'])) {
        $paged = max(1, intval($_GET['paged'])); // Set page number from query string
    } else {
        $paged = 1; // Default to page 1 if 'paged' parameter is not present
    }

    // Get the posts for the current page
    $offset = ($paged - 1) * 500; //search per 500 (max, more will be crashed in my try)
    $args = array(
        'post_type' => array('post', 'page'),
        'posts_per_page' => 500, //search per 500 (max, more will be crashed in my try)
        'offset' => $offset,
    );
    $query = new WP_Query($args);

    // Calculate total number of pages
    $total_pages = $query->max_num_pages;

    // Get the number of posts per page from the arguments
    $posts_per_page = $args['posts_per_page'];

    // Initialize an array to store URLs and IDs
    $posts_data = array();

    // Loop through each post and page to get their URLs and IDs
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();
            $post_url = get_permalink();
            // Check if the URL ends with "-2 or -3 or -4 or -5" using regular expression
            if (preg_match('/-(2|3|4|5)$/', $post_url)) {
                $posts_data[] = array(
                    'id' => $post_id,
                    'url' => $post_url
                );
            }
        }
    }

    // Reset post data
    wp_reset_postdata();

    // Output the list of URLs with IDs
    $output = '<div>';
    $output .= '<label for="page_number">Page Number:</label>';
    $output .= '<input type="number" id="page_number" name="page_number" value="' . esc_attr($paged) . '" min="1" max="' . esc_attr($total_pages) . '" onchange="updatePage(this.value)">';
    $output .= '<p>Total Pages: ' . esc_html($total_pages) . '</p>';
    $output .= '<p>Posts Per Page: ' . esc_html($posts_per_page) . '</p>';
    $output .= '</div>';
    $output .= '<ul>';
    foreach ($posts_data as $post_data) {
        $output .= '<li>ID: ' . esc_html($post_data['id']) . ' - <a href="' . esc_url($post_data['url']) . '">' . esc_html($post_data['url']) . '</a></li>';
    }
    $output .= '</ul>';

    // JavaScript function to handle input field change
    $output .= '<script>
        function updatePage(page) {
            // Reload the content with the new page number
            var url = window.location.href.split("?")[0]; // Remove existing query parameters
            window.location.href = url + "?paged=" + page;
        }
        </script>';

    return $output;
}
add_shortcode('list_all_urls', 'list_all_urls_shortcode');