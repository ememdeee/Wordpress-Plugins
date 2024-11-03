<?php
function vc_forms_admin_page() {
    ?>
    <div class="wrap">
        <h1>VC Forms Admin Page</h1>
        <form method="post" action="options.php">
            <?php settings_fields('vc_forms_settings_group'); ?>
            <?php do_settings_sections('vc-forms'); ?>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

function vc_forms_settings_section_callback() {
    echo '<p>Settings for VC Forms plugin</p>';
}

function vc_forms_domain_name_callback() {
    $domain_name = get_option('vc_forms_domain_name', $_SERVER['SERVER_NAME']);
    echo '<input type="text" name="vc_forms_domain_name" value="' . esc_attr($domain_name) . '" />';
}

function vc_forms_member_area_preview_callback() {
    $member_area_preview = get_option('vc_forms_member_area_preview', 'cwampv_proxy');
    echo '<input type="text" name="vc_forms_member_area_preview" value="' . esc_attr($member_area_preview) . '" />';
}

// Register settings
function vc_forms_register_settings() {
    register_setting('vc_forms_settings_group', 'vc_forms_domain_name');
    register_setting('vc_forms_settings_group', 'vc_forms_member_area_preview');
}

// Add sections and fields
function vc_forms_initialize_admin_settings() {
    add_settings_section(
        'vc_forms_settings_section',
        'VC Forms Settings',
        'vc_forms_settings_section_callback',
        'vc-forms'
    );

    add_settings_field(
        'vc_forms_domain_name',
        'Domain Name',
        'vc_forms_domain_name_callback',
        'vc-forms',
        'vc_forms_settings_section'
    );

    add_settings_field(
        'vc_forms_member_area_preview',
        'MemberAreaPreview',
        'vc_forms_member_area_preview_callback',
        'vc-forms',
        'vc_forms_settings_section'
    );
}

add_action('admin_init', 'vc_forms_register_settings');
add_action('admin_init', 'vc_forms_initialize_admin_settings');
?>