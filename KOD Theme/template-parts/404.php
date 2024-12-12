<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package HelloElementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>
<main id="content" class="site-main 404" style="text-align: center;display: flex;justify-content: center;align-items: center;flex-direction: column;min-height: 90vh;">
    <div class="error-404" style="font-size: 100px; font-weight: bold;color: #898989;margin-top: -50px;">404</div>
    <p class="description" style="font-size: 20px; margin: 20px 0;"><?php esc_html_e( 'Oops! The page you are looking for doesn’t exist. You can enter your VIN number below to generate window sticker.', 'hello-elementor' ); ?></p>
    <div class="form_container">
        <?php echo do_shortcode('[vin_form]'); // Render the shortcode ?>
    </div>
</main>