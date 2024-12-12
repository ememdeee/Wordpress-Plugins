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
?>

<header id="site-header" class="site-header">
	<div class="site-main">
		<div class="site-branding">
			<?php
			if ( has_custom_logo() ) {
				the_custom_logo();
			} elseif ( $site_name ) {
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