<?php

class notify_pluginShortcodes {

    public function __construct(){
        add_shortcode( 'notify_plugin', array( $this, 'notify_plugin' ) );
    }

    public function notify_plugin( $atts ) {
        // Get data from cookies
        $return_html = '';
        ob_start();
        $atts = shortcode_atts(array(
            'primary_color' => '#4dabf7',
            'secondary_color' => 'rgb(187, 153, 255)',
        ),$atts);
        ?>
        <div class="notification" id="notification_display" style="display:none;">
            <span id="notify_closeIcon" class="close">×</span>
            <div class="banner-buy-report flex-row-for-banner">
                <div class="banner-buy-report-info">
                    <div class="sharbg-container">
                        <span class="stretched-bg" id="notify_vin" style="background-color: <?=$atts['primary_color']?>;">vin</span>
                        <div class="sharp-end" style="border-left: 28px solid <?=$atts['primary_color']?>;"></div>
                    </div>
                    <span id="notify_discount" style="background-color: <?=$atts['primary_color']?>;">discount</span>
                    <span id="notify_ymm">ymm</span>
                    <span id="notify_msg">text</span>
                </div>
                <div class="banner-buy-report-button" id="notify_button">
                    <input type="hidden" id="notify_btn_color" value="<?=$atts['primary_color']?>"/>
                    <a class="banner-buy-report-link" id="notify_btn" href="javascript:void(0);"></a>
                    <span class="ban-cost" id="notify_cost"></span>
                </div>
            </div>
        </div>
        <style>
            #notify_btn{
                background: linear-gradient(rgba(255, 255, 255, 0.23) 0%, rgba(255, 255, 255, 0) 100%), <?=$atts['primary_color']?>;
            }
            #notify_btn:hover {
                background-color: <?=$atts['secondary_color']?>;
            }
        </style>
        <?php
        $return_html = ob_get_contents();
        ob_end_clean();
        return $return_html;
    }

}

new notify_pluginShortcodes;