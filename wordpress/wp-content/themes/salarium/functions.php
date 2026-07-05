<?php

// This function allows to load the style and js script
function salarium_enqueue_assets() {

    // Style from tailwind
    wp_enqueue_style(
        'salarium-style',                                    
        get_template_directory_uri() . '/dist/output.css',    
        array(),                                             
        '1.0'                                                 
    );

    // Js
    wp_enqueue_script(
        'salarium-script',
        get_template_directory_uri() . '/js/main.js',
        array(),
        '1.0',
        true 
    );
}

// The function is called when the hook wp_enqueue_scripts is activated 
add_action('wp_enqueue_scripts', 'salarium_enqueue_assets');
