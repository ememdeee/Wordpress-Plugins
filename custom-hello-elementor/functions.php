<?php
/**
 * Theme functions and definitions
 *
 * @package HelloElementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'HELLO_ELEMENTOR_VERSION', '3.0.1' );

if ( ! isset( $content_width ) ) {
	$content_width = 800; // Pixels.
}

if ( ! function_exists( 'hello_elementor_setup' ) ) {
	/**
	 * Set up theme support.
	 *
	 * @return void
	 */
	function hello_elementor_setup() {
		if ( is_admin() ) {
			hello_maybe_update_theme_version_in_db();
		}

		if ( apply_filters( 'hello_elementor_register_menus', true ) ) {
			register_nav_menus( [ 'menu-1' => esc_html__( 'Header', 'hello-elementor' ) ] );
			register_nav_menus( [ 'menu-2' => esc_html__( 'Footer', 'hello-elementor' ) ] );
		}

		if ( apply_filters( 'hello_elementor_post_type_support', true ) ) {
			add_post_type_support( 'page', 'excerpt' );
		}

		if ( apply_filters( 'hello_elementor_add_theme_support', true ) ) {
			add_theme_support( 'post-thumbnails' );
			add_theme_support( 'automatic-feed-links' );
			add_theme_support( 'title-tag' );
			add_theme_support(
				'html5',
				[
					'search-form',
					'comment-form',
					'comment-list',
					'gallery',
					'caption',
					'script',
					'style',
				]
			);
			add_theme_support(
				'custom-logo',
				[
					'height'      => 100,
					'width'       => 350,
					'flex-height' => true,
					'flex-width'  => true,
				]
			);

			/*
			 * Editor Style.
			 */
			add_editor_style( 'classic-editor.css' );

			/*
			 * Gutenberg wide images.
			 */
			add_theme_support( 'align-wide' );

			/*
			 * WooCommerce.
			 */
			if ( apply_filters( 'hello_elementor_add_woocommerce_support', true ) ) {
				// WooCommerce in general.
				add_theme_support( 'woocommerce' );
				// Enabling WooCommerce product gallery features (are off by default since WC 3.0.0).
				// zoom.
				add_theme_support( 'wc-product-gallery-zoom' );
				// lightbox.
				add_theme_support( 'wc-product-gallery-lightbox' );
				// swipe.
				add_theme_support( 'wc-product-gallery-slider' );
			}
		}
	}
}
add_action( 'after_setup_theme', 'hello_elementor_setup' );

function hello_maybe_update_theme_version_in_db() {
	$theme_version_option_name = 'hello_theme_version';
	// The theme version saved in the database.
	$hello_theme_db_version = get_option( $theme_version_option_name );

	// If the 'hello_theme_version' option does not exist in the DB, or the version needs to be updated, do the update.
	if ( ! $hello_theme_db_version || version_compare( $hello_theme_db_version, HELLO_ELEMENTOR_VERSION, '<' ) ) {
		update_option( $theme_version_option_name, HELLO_ELEMENTOR_VERSION );
	}
}

if ( ! function_exists( 'hello_elementor_display_header_footer' ) ) {
	/**
	 * Check whether to display header footer.
	 *
	 * @return bool
	 */
	function hello_elementor_display_header_footer() {
		$hello_elementor_header_footer = true;

		return apply_filters( 'hello_elementor_header_footer', $hello_elementor_header_footer );
	}
}

if ( ! function_exists( 'hello_elementor_scripts_styles' ) ) {
	/**
	 * Theme Scripts & Styles.
	 *
	 * @return void
	 */
	function hello_elementor_scripts_styles() {
		$min_suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		if ( apply_filters( 'hello_elementor_enqueue_style', true ) ) {
			wp_enqueue_style(
				'hello-elementor',
				get_template_directory_uri() . '/style' . $min_suffix . '.css',
				[],
				HELLO_ELEMENTOR_VERSION
			);
		}

		if ( apply_filters( 'hello_elementor_enqueue_theme_style', true ) ) {
			wp_enqueue_style(
				'hello-elementor-theme-style',
				get_template_directory_uri() . '/theme' . $min_suffix . '.css',
				[],
				HELLO_ELEMENTOR_VERSION
			);
		}

		if ( hello_elementor_display_header_footer() ) {
			wp_enqueue_style(
				'hello-elementor-header-footer',
				get_template_directory_uri() . '/header-footer' . $min_suffix . '.css',
				[],
				HELLO_ELEMENTOR_VERSION
			);
		}
	}
}
add_action( 'wp_enqueue_scripts', 'hello_elementor_scripts_styles' );

if ( ! function_exists( 'hello_elementor_register_elementor_locations' ) ) {
	/**
	 * Register Elementor Locations.
	 *
	 * @param ElementorPro\Modules\ThemeBuilder\Classes\Locations_Manager $elementor_theme_manager theme manager.
	 *
	 * @return void
	 */
	function hello_elementor_register_elementor_locations( $elementor_theme_manager ) {
		if ( apply_filters( 'hello_elementor_register_elementor_locations', true ) ) {
			$elementor_theme_manager->register_all_core_location();
		}
	}
}
add_action( 'elementor/theme/register_locations', 'hello_elementor_register_elementor_locations' );

if ( ! function_exists( 'hello_elementor_content_width' ) ) {
	/**
	 * Set default content width.
	 *
	 * @return void
	 */
	function hello_elementor_content_width() {
		$GLOBALS['content_width'] = apply_filters( 'hello_elementor_content_width', 800 );
	}
}
add_action( 'after_setup_theme', 'hello_elementor_content_width', 0 );

if ( ! function_exists( 'hello_elementor_add_description_meta_tag' ) ) {
	/**
	 * Add description meta tag with excerpt text.
	 *
	 * @return void
	 */
	function hello_elementor_add_description_meta_tag() {
		if ( ! apply_filters( 'hello_elementor_description_meta_tag', true ) ) {
			return;
		}

		if ( ! is_singular() ) {
			return;
		}

		$post = get_queried_object();
		if ( empty( $post->post_excerpt ) ) {
			return;
		}

		echo '<meta name="description" content="' . esc_attr( wp_strip_all_tags( $post->post_excerpt ) ) . '">' . "\n";
	}
}
add_action( 'wp_head', 'hello_elementor_add_description_meta_tag' );

// Admin notice
if ( is_admin() ) {
	require get_template_directory() . '/includes/admin-functions.php';
}

// Settings page
require get_template_directory() . '/includes/settings-functions.php';

// Header & footer styling option, inside Elementor
require get_template_directory() . '/includes/elementor-functions.php';

if ( ! function_exists( 'hello_elementor_customizer' ) ) {
	// Customizer controls
	function hello_elementor_customizer() {
		if ( ! is_customize_preview() ) {
			return;
		}

		if ( ! hello_elementor_display_header_footer() ) {
			return;
		}

		require get_template_directory() . '/includes/customizer-functions.php';
	}
}
add_action( 'init', 'hello_elementor_customizer' );

if ( ! function_exists( 'hello_elementor_check_hide_title' ) ) {
	/**
	 * Check whether to display the page title.
	 *
	 * @param bool $val default value.
	 *
	 * @return bool
	 */
	function hello_elementor_check_hide_title( $val ) {
		if ( defined( 'ELEMENTOR_VERSION' ) ) {
			$current_doc = Elementor\Plugin::instance()->documents->get( get_the_ID() );
			if ( $current_doc && 'yes' === $current_doc->get_settings( 'hide_title' ) ) {
				$val = false;
			}
		}
		return $val;
	}
}
add_filter( 'hello_elementor_page_title', 'hello_elementor_check_hide_title' );

/**
 * BC:
 * In v2.7.0 the theme removed the `hello_elementor_body_open()` from `header.php` replacing it with `wp_body_open()`.
 * The following code prevents fatal errors in child themes that still use this function.
 */
if ( ! function_exists( 'hello_elementor_body_open' ) ) {
	function hello_elementor_body_open() {
		wp_body_open();
	}
}

// disable this theme to updated
add_filter('site_transient_update_themes', 'remove_theme_updates');

function remove_theme_updates($value) {
    if (isset($value) && is_object($value)) {
        unset($value->response['hello-elementor']);
    }
    return $value;
}

// All main function is to disable plugin change
// This second function disables plugin activation or deactivation via direct access to URL
function disable_plugin_activation_deactivation() {
    // Hide Activate/Deactivate buttons in the plugins page
    if (is_admin()) {
        global $submenu;
        unset($submenu['plugins.php'][10]); // Removes the 'Installed Plugins' option
    }
}
add_action('admin_menu', 'disable_plugin_activation_deactivation', 999);

function prevent_plugin_activation_deactivation($actions, $plugin_file, $plugin_data, $context) {
    // Remove activate/deactivate links
    if (array_key_exists('activate', $actions)) {
        unset($actions['activate']);
    }
    if (array_key_exists('deactivate', $actions)) {
        unset($actions['deactivate']);
    }
    return $actions;
}
add_filter('plugin_action_links', 'prevent_plugin_activation_deactivation', 10, 4);

function block_plugin_activation_deactivation() {
    if (isset($_GET['action']) && in_array($_GET['action'], ['activate', 'deactivate'])) {
        wp_die('Plugin activation and deactivation is disabled.');
    }
}
add_action('admin_init', 'block_plugin_activation_deactivation');

// Hardening user id 1
function prevent_user_deletion($user_id) {
    if ($user_id == 1) {
        wp_die('You cannot delete this user.');
    }
}
add_action('delete_user', 'prevent_user_deletion');

function prevent_profile_update($user_id, $old_user_data) {
    if ($user_id == 1) {
        wp_die('You cannot edit this user.');
    }
}
add_action('profile_update', 'prevent_profile_update', 10, 2);

function prevent_admin_profile_update($errors, $update, $user) {
    if ($user->ID == 1) {
        $errors->add('user_error', __('You cannot edit this user.', 'textdomain'));
    }
}
add_action('user_profile_update_errors', 'prevent_admin_profile_update', 10, 3);

function prevent_role_change($all_roles) {
    if (get_current_user_id() != 1) {
        unset($all_roles['administrator']); // Prevent others from assigning/removing the admin role
    }
    return $all_roles;
}
add_filter('editable_roles', 'prevent_role_change');


function custom_breadcrumbs() {
    global $post;

    // Do not display breadcrumbs on the homepage
    if (!is_front_page()) {
        echo '<div class="breadcrumb-container">';
        echo '<nav class="breadcrumb">';
        echo '<a href="' . home_url() . '">Home</a>';

        // Handle Blog
        if (is_home()) {
            echo ' &raquo; Blog';
        } 
        // Handle Blog Single Post
        elseif (is_single()) {
            echo ' &raquo; <a href="' . home_url('/blog/') . '">Blog</a>';
            echo ' &raquo; ' . ucwords(strtolower(get_the_title()));
        } 
        // Handle Archives (Category, Tag, Author, Date)
        elseif (is_archive()) {
            echo ' &raquo; Archive';
            if (is_category()) {
                echo ' &raquo; ' . ucwords(strtolower(single_cat_title('', false)));
            } elseif (is_tag()) {
                echo ' &raquo; ' . ucwords(strtolower(single_tag_title('', false)));
            } elseif (is_author()) {
                echo ' &raquo; ' . ucwords(strtolower(get_the_author()));
            } elseif (is_date()) {
                echo ' &raquo; ' . ucwords(strtolower(get_the_date('F Y')));
            }
        }
        // Handle VIN Decoder and Other Pages
        elseif (is_page()) {
            if ($post->post_parent) {
                // Display parent pages hierarchy
                $parent_id  = $post->post_parent;
                $breadcrumbs = array();
                while ($parent_id) {
                    $page = get_page($parent_id);
                    $breadcrumbs[] = '<a href="' . get_permalink($page->ID) . '">' . ucwords(strtolower(get_the_title($page->ID))) . '</a>';
                    $parent_id  = $page->post_parent;
                }
                $breadcrumbs = array_reverse($breadcrumbs);
                foreach ($breadcrumbs as $crumb) {
                    echo ' &raquo; ' . $crumb;
                }
            }
            // Display current page
            echo ' &raquo; ' . ucwords(strtolower(get_the_title()));
        }

        echo '</nav>';
        echo '</div>';
    }
}
