<?php

class ypfShortcodes {

    public function __construct() {
        // $this->ocrBaseUrl = DECODETHISENGINE;
    }

    public function lorem($text) {
        $return_html = '';

        ob_start();
        ?>
            <h1><?= htmlspecialchars($text) ?></h1>
        <?php
        $return_html = ob_get_contents();
        ob_end_clean();

        return $return_html;
    }
}

/**
 * Get Lorem
 */
function getLorem($atts) {
    $initOCRObj = new ypfShortcodes();

    $atts = shortcode_atts(array(
        'text' => 'Hello World!', // Default text
    ), $atts);

    return $initOCRObj->lorem($atts['text']);
}
add_shortcode('lorem', 'getLorem');