<?php
/**
 * The template for displaying header.
 *
 * @package HelloElementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$site_name = get_bloginfo( 'name' );
$tagline   = get_bloginfo( 'description', 'display' );
$header_nav_menu = wp_nav_menu( [
	'theme_location' => 'menu-1',
	'fallback_cb' => false,
	'echo' => false,
] );

// Retrieve the custom logo URL
$custom_logo_id = get_theme_mod( 'custom_logo' );
$custom_logo_url = wp_get_attachment_image_url( $custom_logo_id , 'full' );
$custom_logo_alt = get_post_meta( $custom_logo_id, '_wp_attachment_image_alt', true );

?>

<header id="site-header" class="site-header">
	<div class="site-main">
		<div class="site-branding">
			<?php
			if ( $custom_logo_url ) { // Check if there is a custom logo
				?>
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="custom-logo-link" rel="home" aria-current="page">
					<img width="150" height="55" src="<?php echo esc_url( $custom_logo_url ); ?>" class="custom-logo" alt="<?php echo esc_attr( $custom_logo_alt ? $custom_logo_alt : $site_name ); ?>" decoding="async">
				</a>
				<?php
			} elseif ( $site_name ) { // Fallback to site title and description
				?>
				<h1 class="site-title">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr__( 'Home', 'hello-elementor' ); ?>" rel="home">
						<?php echo esc_html( $site_name ); ?>
					</a>
				</h1>
				<p class="site-description">
					<?php
					if ( $tagline ) {
						echo esc_html( $tagline );
					}
					?>
				</p>
			<?php } ?>
		</div>

		<?php if ( $header_nav_menu ) : ?>
		    <!-- Toggle button for mobile menu -->
			<button id="nav-toggle" class="nav-toggle" aria-label="Toggle navigation">
				<span class="hamburger"></span>
				<span class="hamburger"></span>
				<span class="hamburger"></span>
			</button>
			<nav class="site-navigation">
				<?php
				// PHPCS - escaped by WordPress with "wp_nav_menu"
				echo $header_nav_menu; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				?>
			</nav>
			<script>
				const navToggle = document.getElementById('nav-toggle');
				const siteNavigation = document.querySelector('.site-navigation');

				// Toggle the active class on the navigation menu when the toggle button is clicked
				navToggle.addEventListener('click', function () {
					siteNavigation.classList.toggle('active');
				});
			</script>
		<?php endif; ?>
	</div>
</header>