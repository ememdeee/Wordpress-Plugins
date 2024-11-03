<!-- BEGIN FOOTER -->
<footer id="footer">
    <?php
    // Check if the current domain is 'classicdecoder.com'
    if ( $_SERVER['HTTP_HOST'] === 'classicdecoder.com' ) {
        // Include the 'cd-footer.php' content for classicdecoder.com
        get_template_part('cd-footer');
    } 
    elseif ( $_SERVER['HTTP_HOST'] === 'vehicledatabases.com' ) {
        // Include the 'vdb-footer.php' content for vehicledatabases.com
        get_template_part('vdb-footer');
    }
    elseif ($_SERVER['HTTP_HOST'] === 'detailedvehiclehistory.com' || $_SERVER['HTTP_HOST'] === 'developtestsite.com') {
        // Include the 'dvh-footer.php' file
        get_template_part('dvh-footer');
    }
    else {
        // Default footer content for other domains
        ?>
        <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
        <?php
    }
    ?>
</footer>
<!-- END FOOTER -->

<?php wp_footer(); ?>
</body>
</html>