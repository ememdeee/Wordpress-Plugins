<?php
// Load the header
get_header();
?>

<div id="content">
    <?php
    if ( is_front_page() && $_SERVER['HTTP_HOST'] === 'developtestsite.com' ) {
        // Load the custom template part
        get_template_part( 'dvh-homepage' );
    } else {
        // Default content if not the homepage
        if ( have_posts() ) :
            while ( have_posts() ) : the_post();
                the_content();
            endwhile;
        endif;
    }
    ?>
</div>

<?php
// Load the footer
get_footer();
?>