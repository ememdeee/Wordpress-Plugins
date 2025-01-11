<?php

class YPF_Admin_Menu {
    private $api;
    private $settings;

    public function __construct($api, $settings) {
        $this->api = $api;
        $this->settings = $settings;
    }

    public function init() {
        add_action('admin_menu', [$this, 'add_menu']);
    }

    public function add_menu() {
        add_menu_page('Custom Products API', 'Products API', 'manage_options', 'ypf-products-api', [$this, 'list_products_page'], 'dashicons-products', 6);
        add_submenu_page('ypf-products-api', 'Create Product', 'Create Product', 'manage_options', 'ypf-products-api-create', [$this, 'create_product_page']);
        add_submenu_page('ypf-products-api', 'Configuration', 'Configuration', 'manage_options', 'ypf-products-api-config', [$this, 'config_page']);
    }

    public function list_products_page() {
        $products = $this->api->fetch_products();
        include YPF_PLUGIN_PATH . 'includes/templates/list-products.php';
    }

    public function create_product_page() {
        if ($_POST) {
            $this->api->create_product($_POST);
        }
        include YPF_PLUGIN_PATH . 'includes/templates/create-product.php';
    }

    public function config_page() {
        if ($_POST) {
            $this->settings->save($_POST);
        }
        include YPF_PLUGIN_PATH . 'includes/templates/config-page.php';
    }
}
