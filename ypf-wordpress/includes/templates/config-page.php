<?php
// Fetch saved settings from WordPress options
$api_endpoint = get_option('ypf_api_endpoint');
$consumer_key = get_option('ypf_consumer_key');
$consumer_secret = get_option('ypf_consumer_secret');

// Handle form submission and save options
if ($_POST && isset($_POST['ypf_config_nonce']) && wp_verify_nonce($_POST['ypf_config_nonce'], 'ypf_config_save')) {
    update_option('ypf_api_endpoint', sanitize_text_field($_POST['api_endpoint']));
    update_option('ypf_consumer_key', sanitize_text_field($_POST['consumer_key']));
    update_option('ypf_consumer_secret', sanitize_text_field($_POST['consumer_secret']));
    echo '<div class="updated"><p>Settings saved successfully! Please refresh to get the newest data</p></div>';

    // Add CSS to display none the form
    echo '<style>form { display: none; }</style>';
} elseif ($_POST) {
    echo '<div class="error"><p>Security check failed. Please try again.</p></div>';
}
?>

<div class="mx-auto p-6">
    <h1 class="text-3xl font-semibold text-gray-800 mb-6">API Configuration</h1>

    <!-- API Configuration Form -->
    <form method="POST" class="space-y-6">
        <?php wp_nonce_field('ypf_config_save', 'ypf_config_nonce'); ?>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- API Endpoint URL -->
            <div class="form-group">
                <label for="api_endpoint" class="block text-sm font-medium text-gray-700">API Endpoint URL</label>
                <input type="text" id="api_endpoint" name="api_endpoint" value="<?php echo esc_attr($api_endpoint); ?>" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <p class="mt-2 text-xs text-gray-500">Example: https://stagingdeveloper.site/wp-json/wc/v3/products/</p>
            </div>

            <!-- Consumer Key -->
            <div class="form-group">
                <label for="consumer_key" class="block text-sm font-medium text-gray-700">Consumer Key</label>
                <input type="password" id="consumer_key" name="consumer_key" value="<?php echo esc_attr($consumer_key); ?>" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <p class="mt-2 text-xs text-gray-500">Keep this key confidential.</p>
            </div>

            <!-- Consumer Secret -->
            <div class="form-group">
                <label for="consumer_secret" class="block text-sm font-medium text-gray-700">Consumer Secret</label>
                <input type="password" id="consumer_secret" name="consumer_secret" value="<?php echo esc_attr($consumer_secret); ?>" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <p class="mt-2 text-xs text-gray-500">Keep this key confidential.</p>
            </div>
        </div>

        <div class="flex justify-start">
            <?php submit_button('', 'primary', 'submit', false, ['class' => 'inline-flex items-center px-6 py-2 border border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md text-sm']); ?>
        </div>
    </form>
</div>