<?php /* Template Name: Custom*/ ?>

<?php
/**
 * The template for displaying singular post-types: posts, pages and user-defined custom post types.
 *
 * @package HelloElementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

while ( have_posts() ) :
	the_post();
	?>

<!-- <main id="content" <?php post_class( 'site-main' ); ?>> -->
<main id="content" class="custom-post">
    
	<?php if (!is_front_page()) { custom_breadcrumbs(); } ?>
        
    <header class="page-header">
        <?php the_title( '<h1 class="entry-title_ignore">', '</h1>' ); ?>
    </header>

    <div class="content-container">
        <div class="page-content">
            <?php the_content(); ?>
            <div class="post-tags">
                <?php the_tags( '<span class="tag-links">' . esc_html__( 'Tagged ', 'hello-elementor' ), null, '</span>' ); ?>
            </div>
            <?php wp_link_pages(); ?>
        </div>
        <div class="side-bar"><?php echo do_shortcode('[vin_form]'); ?></div>
    </div>

</main>

	<?php
endwhile;