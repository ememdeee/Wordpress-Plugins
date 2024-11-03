<?php

/**
 * Plugin Name: Notification Plugin
 * Plugin URL: http://notification-plugin.com
 * Author: Akinade Ayodeji
 * Author URL: http://akinadeaypdeji.com
 * Version: 1.1.22
 * Text Domain: notification-plugin
 * Description: Notification plugin that show a replay of any recently decode vin on preview page.
 */

if(!defined('ABSPATH')) : exit(); endif; //No direct access allowed

/**
 * Define plugin constants
 */
define( 'NOTIFYPLUGIN_PATH', trailingslashit( plugin_dir_path(__FILE__) ) );
define( 'NOTIFYPLUGIN_URL', trailingslashit( plugins_url('/', __FILE__) ) );

/**
 * Include admin.php
 */
// if( is_admin() ) {
//     require_once OCRPLUGIN_PATH . '/admin/admin.php';
// }

/**
 * Include public.php
 */
if( !is_admin() ){
    require_once NOTIFYPLUGIN_PATH . '/public/public.php';
}

/**
 * Include Shortcodes   shortcodes.php
 */
require_once NOTIFYPLUGIN_PATH . '/inc/shortcodes/shortcodes.php';
