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
            'primary_color' => 'rgb(34, 0, 102)',
            'secondary_color' => 'rgb(187, 153, 255)',
        ),$atts);
        ?>
        <div class="notification" id="notification_display" style="display:none;">
            <div class="">
                <div class="container p-0">
                    <span id="notify_closeIcon" class="close">×</span>
                    <div class="ban-last-decode text-center" style="background: <?=$atts['secondary_color']?>;" >
                        <div class="banner-buy-report">
                            <div class="flex-row-for-banner">
                                <div class="banner-buy-report-info p-0">
                                    <b id="notify_msg"></b>
                                </div>
                                <div class="banner-buy-report-button p-0" align="center" id="notify_button">
                                    <input type="hidden" id="notify_btn_color" value="<?=$atts['primary_color']?>"/>
                                    <a class="banner-buy-report-link" id="notify_btn" style="background: <?=$atts['primary_color']?> left top repeat-x;" href="javascript:void(0);"><strong class="ban-text" id="banner-buy-report-text"></strong><br /><span class="ban-cost" id="notify_cost"></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        $return_html = ob_get_contents();
        ob_end_clean();
        return $return_html;
    }

}

new notify_pluginShortcodes;