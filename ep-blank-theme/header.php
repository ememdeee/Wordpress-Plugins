<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<!-- BEGIN HEADER -->
<header id="header">
    <!-- Customize your header content here -->
    <?php
    // Check if the current domain is 'classicdecoder.com'
    if ( $_SERVER['HTTP_HOST'] === 'classicdecoder.com' ) {
        // Include the 'cd-header.php' file
        get_template_part('cd-header');
    } 
    elseif ( $_SERVER['HTTP_HOST'] === 'vehicledatabases.com' ) {
        // Include the 'vdb-header.php' file
        get_template_part('vdb-header');
    }
    elseif ($_SERVER['HTTP_HOST'] === 'detailedvehiclehistory.com' || $_SERVER['HTTP_HOST'] === 'developtestsite.com') {
        // Include the 'dvh-header.php' file
        get_template_part('dvh-header');
    }
    else {
        // Default header content for other domains
        echo '<h1>' . get_bloginfo('name') . '</h1>';
        echo '<p>' . get_bloginfo('description') . '</p>';
    }
    ?>
</header>
<!-- END HEADER -->
