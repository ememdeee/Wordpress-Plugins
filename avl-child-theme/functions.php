<?php
// Function to display a message when child theme is activated
function display_child_theme_message() {
    ?>
    <div style="background-color: #f8d7da; color: #721c24; padding: 10px;">
        <p>This is your custom child theme! You can start making your modifications here!!</p>
    </div>
    <?php
}
// to make sure code working, turn this and check footer
// add_action('wp_footer', 'display_child_theme_message');

// add php here