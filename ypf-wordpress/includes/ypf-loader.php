<?php

class YPF_Loader {
    public function init() {
        $this->load_dependencies();
        $this->initialize_admin_menu();
    }

    private function load_dependencies() {
        require_once YPF_PLUGIN_PATH . 'includes/class-ypf-settings.php';
        require_once YPF_PLUGIN_PATH . 'includes/class-ypf-products-api.php';
        require_once YPF_PLUGIN_PATH . 'includes/class-ypf-admin-menu.php';
    }

    private function initialize_admin_menu() {
        $settings = new YPF_Settings();
        $api = new YPF_Products_API($settings);
        $admin_menu = new YPF_Admin_Menu($api, $settings);
        $admin_menu->init();
    }
}