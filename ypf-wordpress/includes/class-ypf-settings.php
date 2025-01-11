<?php

class YPF_Settings {
    private $option_name = 'ypf_products_api_settings';

    public function get($key) {
        $settings = get_option($this->option_name, []);
        return isset($settings[$key]) ? $settings[$key] : null;
    }

    public function save($data) {
        update_option($this->option_name, $data);
    }
}
