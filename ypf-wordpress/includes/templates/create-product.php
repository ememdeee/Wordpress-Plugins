<?php
// Fetch API credentials from the settings
$api_endpoint = get_option('ypf_api_endpoint');
$consumer_key = get_option('ypf_consumer_key');
$consumer_secret = get_option('ypf_consumer_secret');

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

// Initialize success and error messages
$success_message = '';
$error_message = '';

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['create_product_nonce']) && wp_verify_nonce($_POST['create_product_nonce'], 'create_product')) {
    // Get form data
    $product_name = isset($_POST['product_name']) ? sanitize_text_field($_POST['product_name']) : '';
    $product_description = isset($_POST['product_description']) ? sanitize_textarea_field($_POST['product_description']) : '';
    $product_price = isset($_POST['product_price']) ? sanitize_text_field($_POST['product_price']) : '';
    $product_stock = isset($_POST['product_stock']) ? intval($_POST['product_stock']) : 0;

    // Prepare the API request data
    $product_data = [
        'name' => $product_name,
        'description' => $product_description,
        'regular_price' => $product_price, // Explicitly set the regular price
        'stock_quantity' => $product_stock,
        'status' => 'publish' // By default, publish the product
    ];

    // Generate console logs for each property in $product_data DEBUGGING
    foreach ($product_data as $key => $value) {
        echo "<script>console.log('" . addslashes($key) . ": " . addslashes($value) . "');</script>";
    }

    // die(); // DEBUGGING

    // Prepare API request URL and authentication header
    $request_url = $api_endpoint;
    $auth = base64_encode($consumer_key . ':' . $consumer_secret);

    // Send the POST request to create the product
    $response = wp_remote_post($request_url, [
        'headers' => [
            'Authorization' => 'Basic ' . $auth,
            'Content-Type' => 'application/json'
        ],
        'body' => json_encode($product_data)
    ]);

    // Check if the request was successful
    if (is_wp_error($response)) {
        $error_message = 'Error: ' . $response->get_error_message();
    } else {
        $status_code = wp_remote_retrieve_response_code($response);
        if ($status_code === 201) {
            $success_message = 'Product created successfully!';
        } else {
            $error_message = 'Failed to create product. Please check the details and try again.';
        }
    }
}
?>

<div class="mx-auto p-6">
    <h1 class="text-3xl font-semibold text-gray-800 mb-4">Create Product</h1>
    <p class="text-sm text-gray-600 mb-6">Fill in the details below to create a new product.</p>

    <!-- Display success or error message -->
    <?php if ($success_message) : ?>
        <div class="bg-green-100 text-green-800 p-4 rounded-md shadow-md mb-4">
            <p><?php echo esc_html($success_message); ?></p>
        </div>
    <?php endif; ?>
    <?php if ($error_message) : ?>
        <div class="bg-red-100 text-red-800 p-4 rounded-md shadow-md mb-4">
            <p><?php echo esc_html($error_message); ?></p>
        </div>
    <?php endif; ?>

    <!-- Create Product Form -->
    <form method="POST" class="space-y-6">
        <?php wp_nonce_field('create_product', 'create_product_nonce'); ?>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Product Name -->
            <div class="form-group">
                <label for="product_name" class="block text-sm font-medium text-gray-700">Product Name</label>
                <input type="text" id="product_name" name="product_name" value="" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>

            <!-- Product Description -->
            <div class="form-group sm:col-span-2">
                <label for="product_description" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="product_description" name="product_description" rows="5" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
            </div>

            <!-- Product Price -->
            <div class="form-group">
                <label for="product_price" class="block text-sm font-medium text-gray-700">Price ($)</label>
                <input type="number" id="product_price" name="product_price" value="" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>

            <!-- Stock Quantity -->
            <div class="form-group">
                <label for="product_stock" class="block text-sm font-medium text-gray-700">Stock Quantity</label>
                <input type="number" id="product_stock" name="product_stock" value="0" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
        </div>

        <div class="flex justify-start">
            <input type="submit" name="submit" id="submit" class="inline-flex items-center px-6 py-2 border border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md text-sm" value="Create Product" />
        </div>
    </form>
</div>
