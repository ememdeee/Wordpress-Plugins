<?php
// Fetch API credentials from the settings
$api_endpoint = get_option('ypf_api_endpoint');
$consumer_key = get_option('ypf_consumer_key');
$consumer_secret = get_option('ypf_consumer_secret');

// console log the api endpoint, consumer key, and consumer secret in javascript
// echo '<script>console.log(' . json_encode($api_endpoint) . ')</script>';
// echo '<script>console.log(' . json_encode($consumer_key) . ')</script>';
// echo '<script>console.log(' . json_encode($consumer_secret) . ')</script>';

// Check if any of the required credentials are empty and display an error message
if (empty($api_endpoint) || empty($consumer_key) || empty($consumer_secret)) {
    $error_message = '<div class="error"><p>';
    if (empty($api_endpoint)) {
        $error_message .= 'Error: API Endpoint is empty.<br>';
    }
    if (empty($consumer_key)) {
        $error_message .= 'Error: Consumer Key is empty.<br>';
    }
    if (empty($consumer_secret)) {
        $error_message .= 'Error: Consumer Secret is empty.<br>';
    }
    $error_message .= '</p></div>';

    echo $error_message;
    return; // Exit early as the required data is missing
}

// Set up pagination
$per_page = 10; // Number of products per page
$page = isset($_GET['paged']) ? intval($_GET['paged']) : 1; // Current page (default: 1)

// Prepare API request URL
$request_url = $api_endpoint . "?per_page={$per_page}&page={$page}";
echo '<script>console.log(' . json_encode($request_url) . ')</script>';

// Prepare the authentication header
$auth = base64_encode($consumer_key . ':' . $consumer_secret);

// Initialize variable to store the table HTML
$tableHtml = '';

// Fetch products from the API
$response = wp_remote_get($request_url, [
    'headers' => [
        'Authorization' => 'Basic ' . $auth
    ]
]);

// Check if the request was successful
if (is_wp_error($response)) {
    $error_message = $response->get_error_message();
    $tableHtml = '<div class="error"><p>Error: ' . esc_html($error_message) . '</p></div>';
} else {
    // console log the response in javascript stringify
    echo '<script>console.log(' . json_encode(wp_remote_retrieve_body($response)) . ')</script>';
    // Decode the JSON response into an array
    $products = json_decode(wp_remote_retrieve_body($response), true);
    $total_products = (int) wp_remote_retrieve_header($response, 'X-WP-Total'); // Total number of products for pagination
    $total_pages = ceil($total_products / $per_page); // Total pages for pagination

    if (empty($products)) {
        $tableHtml = '<div class="bg-yellow-100 text-yellow-800 p-4 rounded-md shadow-md"><p>No products found.</p></div>';
    } else {
        // Build the table HTML
        $tableHtml = '<table class="min-w-full table-auto border-collapse bg-white shadow-md rounded-md overflow-hidden">
                        <thead class="bg-gray-200 text-left text-sm text-gray-600">
                            <tr>
                                <th class="px-4 py-2">ID</th>
                                <th class="px-4 py-2">Name</th>
                                <th class="px-4 py-2">Price</th>
                                <th class="px-4 py-2">Stock Status</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm text-gray-700">';

        foreach ($products as $product) {
            $product_id = isset($product['id']) ? $product['id'] : 'N/A';
            $product_name = isset($product['name']) ? $product['name'] : 'N/A';
            $product_price = isset($product['price']) ? $product['price'] : 'N/A';
            $product_stock_status = isset($product['stock_status']) ? $product['stock_status'] : 'N/A';

            // Extract the currency symbol from the price_html (HTML entity for the currency symbol)
            $price_html = isset($product['price_html']) ? $product['price_html'] : '';
            preg_match('/<span class="woocommerce-Price-currencySymbol">(.*?)<\/span>/', $price_html, $matches);
            $currency_symbol = isset($matches[1]) ? $matches[1] : ''; // Default to empty if no symbol is found
            
            // Output the product data in the table row
            $tableHtml .= '<tr class="border-t hover:bg-gray-50">';
            $tableHtml .= '<td class="px-4 py-2">' . esc_html($product_id) . '</td>';
            $tableHtml .= '<td class="px-4 py-2">' . esc_html($product_name) . '</td>';
            $tableHtml .= '<td class="px-4 py-2">' . $currency_symbol . esc_html($product_price) . '</td>';
            $tableHtml .= '<td class="px-4 py-2">' . esc_html($product_stock_status) . '</td>';
            $tableHtml .= '</tr>';
        }

        $tableHtml .= '</tbody>
                    </table>';

        // Pagination Links
        $tableHtml .= '<div class="mt-4 flex justify-end items-center">
            <div class="text-sm text-gray-600 mr-auto">' . esc_html($total_products) . ' products</div>';

        if ($total_pages > 1) {
            $current_url = remove_query_arg('paged'); // Get the current URL without the 'paged' query param
            $current_page = isset($_GET['paged']) ? intval($_GET['paged']) : 1; // Get current page number

            // "Previous" button
            if ($current_page > 1) {
                $prev_page = $current_page - 1;
                $prev_link = add_query_arg('paged', $prev_page, $current_url);
                $tableHtml .= '<a class="text-sm text-gray-600 hover:text-blue-500 flex items-center" style="margin-right: 4px;" href="' . esc_url($prev_link) . '">&laquo; Previous</a>';
            }

            // Pagination Links (Page numbers)
            $tableHtml .= '<span class="pagination-links" style="display: inline-flex; gap: 4px;">';

            // Display first page
            if ($current_page > 3) {
                $first_link = add_query_arg('paged', 1, $current_url);
                $tableHtml .= '<a class="text-sm px-3 py-1 text-gray-600 hover:text-blue-500 flex items-center" href="' . esc_url($first_link) . '">1</a>';
                $tableHtml .= '<span class="text-sm text-gray-500 flex items-center">...</span>';
            }

            // Display the range of pages around the current page
            for ($i = max(1, $current_page - 2); $i <= min($total_pages, $current_page + 2); $i++) {
                $link = add_query_arg('paged', $i, $current_url);
                $active_class = ($i == $current_page) ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500';
                $tableHtml .= '<a class="text-sm px-3 py-1 rounded ' . $active_class . '" href="' . esc_url($link) . '">' . $i . '</a>';
            }

            // Display last page
            if ($current_page < $total_pages - 2) {
                $last_link = add_query_arg('paged', $total_pages, $current_url);
                $tableHtml .= '<span class="text-sm text-gray-500 flex items-center">...</span>';
                $tableHtml .= '<a class="text-sm px-3 py-1 text-gray-600 hover:text-blue-500 flex items-center" href="' . esc_url($last_link) . '">' . $total_pages . '</a>';
            }

            // "Next" button
            if ($current_page < $total_pages) {
                $next_page = $current_page + 1;
                $next_link = add_query_arg('paged', $next_page, $current_url);
                $tableHtml .= '<a class="text-sm text-gray-600 hover:text-blue-500 flex items-center" style="margin-left: 4px;" href="' . esc_url($next_link) . '">Next &raquo;</a>';
            }
        }

        $tableHtml .= '</div>';
    }
}
?>

<div class="mx-auto p-6">
    <h1 class="text-3xl font-semibold text-gray-800 mb-4">Products List</h1>
    <p class="text-sm text-gray-600 mb-6">Below is the list of products fetched from the remote API.</p>
    <?php echo $tableHtml; ?> <!-- Output the generated table HTML -->
</div>
