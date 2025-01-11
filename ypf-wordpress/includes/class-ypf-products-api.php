<?php

class YPF_Products_API {
    private $settings;

    public function __construct($settings) {
        $this->settings = $settings;
    }

    public function fetch_products() {
        $api_url = $this->settings->get('api_url') . '/products';
        $consumer_key = $this->settings->get('consumer_key');
        $consumer_secret = $this->settings->get('consumer_secret');

        $response = wp_remote_get($api_url, [
            'headers' => [
                'Authorization' => 'Basic ' . base64_encode("$consumer_key:$consumer_secret"),
            ],
        ]);

        return is_wp_error($response) ? $response : json_decode(wp_remote_retrieve_body($response), true);
    }

    public function create_product($product_data) {
        $api_url = $this->settings->get('api_url') . '/products';
        $consumer_key = $this->settings->get('consumer_key');
        $consumer_secret = $this->settings->get('consumer_secret');

        $response = wp_remote_post($api_url, [
            'headers' => [
                'Authorization' => 'Basic ' . base64_encode("$consumer_key:$consumer_secret"),
                'Content-Type' => 'application/json',
            ],
            'body' => json_encode($product_data),
        ]);

        return is_wp_error($response) ? $response : json_decode(wp_remote_retrieve_body($response), true);
    }
}
