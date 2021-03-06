/*! Ultimate Branding - v1.9.8.1
 * https://premium.wpmudev.org/project/ultimate-branding/
 * Copyright (c) 2018; * Licensed GPLv2+ */
/* global window, jQuery, ace */

jQuery( window.document ).ready(function($){
    "use strict";
    $('.ub_color_picker').wpColorPicker();
    $(".ub_css_editor").each(function(){
        var editor = ace.edit(this.id);
        $(this).data("editor", editor);
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/css");
        editor.getSession().setUseWrapMode(true);
        editor.getSession().setUseWrapMode(false);
    });
    $(".ub_css_editor").each(function(){
        var self = this,
            $input = $( $(this).data("input") );
        $(this).data("editor").getSession().on('change', function () {
            $input.val( $(self).data("editor").getSession().getValue()  );
        });
    });
});

/* global window, jQuery */

/**
 * close block
 */
/**
 * Simple Options: select2
 */
jQuery( window.document ).ready(function($){
    $('#UltimateBrandingAdmin-search-input').on( 'change keydown keyup blur reset copy paste cut input', function() {
        var search = $(this).val();
        var target = $('#the-list');
        var re;
        if ( '' === search ) {
            $('tr', target ).show();
            return;
        }
        re = new RegExp( search, 'i' );
        $('td.title', target).each( function() {
            var value = $(this).html();
            if ( value.match( re ) ) {
                $(this).parent().show();
            } else {
                $(this).parent().hide();
            }
        });
    });
});

/* global window, jQuery, ace */

jQuery( window.document ).ready(function($){
    "use strict";
    if ( $.fn.datepicker ) {
        $('.simple-option input.datepicker').each( function() {
            $(this).datepicker({
                altFormat: 'yy-mm-dd',
                altField: '#'+$(this).data('alt')
            });
        });
    }
});

/* global window, jQuery */

jQuery( window.document ).ready(function(){
    jQuery( 'form.tab-export-import #simple_options_import_file').on( 'change', function(e) {
        var target = jQuery( 'form.tab-export-import #simple_options_import_button');
        if ( '' === jQuery(this).val() ) {
            target.attr( 'disabled' );
        } else {
            var re = /json$/i;
            if ( re.test(jQuery(this).val()) ) {
                target.removeAttr( 'disabled' );
            }
        }
    });
});

/* global window, jQuery, wp, ajaxurl, wp_media_post_id */

jQuery( window.document ).ready(function($) {
    "use strict";
    var $main_fav_image = $("#ub_main_site_favicon"),
        $main_favicon = $('#wp_favicon'),
        $main_fav_id = $('#wp_favicon_id'),
        $main_fav_size = $('#wp_favicon_size'),
        $login_image = $('#wp_login_image'),
        $login_image_el = $('#wp_login_image_el'),
        $login_image_id = $('#wp_login_image_id'),
        $login_image_size = $('#wp_login_image_size'),
        $login_image_width = $('#wp_login_image_width'),
        $login_image_height = $('#wp_login_image_height'),
        $login_image_width_wrap = $('#wp_login_image_width_wrap'),
        $login_image_height_wrap = $('#wp_login_image_height_wrap')
        ;

    /**
     * If login image url is pasted
     */
    $login_image.on("paste", function(e){
        $login_image.unbind( "change" );
        $login_image.on("change", function(){
            var $this = $(this),
                temp = new window.Image(),
                $temp = $( temp ),
                $spinner = $(".spinner").first().clone()
                ;
            if( $.trim( $this.val() ) !== "" ){
                $login_image_el.prop("src", this.value );
                $login_image_id.val("");
                $login_image_size.val("");
                $login_image_width.val("");
                $login_image_height.val("");
            }

            temp.src = this.value;
            $temp.appendTo( "body" ).hide();
            $login_image_el.after( $spinner );
            $spinner.show();

            $login_image_height_wrap.after( $spinner );

            temp.onload = function(){
                $spinner.remove();
                $login_image_width_wrap.show();
                $login_image_height_wrap.show();
                $login_image_height.prop("type", "number").val( this.height );
                $login_image_width.prop("type", "number").val( this.width );
                $login_image_el.css({
                    height: this.height,
                    width: this.width
                });
            };

        });


    });

    $login_image_height.on("change", function(){
        $login_image_el.css("height", this.value);
    });

    $login_image_width.on("change", function(){
        $login_image_el.css("width", this.value);
    });

    $('#wp_login_image_button').click(function()
    {
        wp.media.editor.send.attachment = function(props, attachment)
        {
            var url = props.size && attachment.sizes[props.size] ? attachment.sizes[props.size].url : attachment.url;

            $login_image.val(url);
            $login_image_el.prop("src", url);
            $login_image_id.val(attachment.id);
            $login_image_size.val(props.size);
            $login_image_height_wrap.hide();
            $login_image_width_wrap.hide();
            $login_image_height.prop("type", "hidden");
            $login_image_width.prop("type", "hidden");

            $login_image_el.css({
               height: "auto",
               width: "auto"
            });
            var dimensions = props.size ?  attachment.sizes[ props.size ] : false;
            if( typeof dimensions !== 'undefined' && dimensions !== false ){
                $login_image_width.val( dimensions.width );
                $login_image_height.val( dimensions.height );
            }else{
                $login_image_width.val( "" );
                $login_image_height.val( "" );
            }
        };


        /**
         * Sets login image from Url
         *
         * @param props
         * @param attachment
         * @returns {*}
         */
        wp.media.string.props = function(props, attachment){
            var $spinner = $(".spinner").first().clone(),
                temp_image = new window.Image(),
                $temp_image = $(temp_image),
                $image = $('#wp_login_image_el'),
                $url = $('#wp_login_image')
                ;

            /**
             * Show loader until the image is fully loaded then place show the actual image
             */
            $temp_image.appendTo("body").hide();
            temp_image.src = props.url;

            if( !$image.find(".spinner").length ) {
                $image.before( $spinner.show() );
            }

            $image.hide();

            $temp_image.on("load", function(){
                $spinner.remove();
                $temp_image.remove();
                $image.prop("src", props.url).show();
            });

            $url.val(props.url);
            return props;
        };

        wp.media.editor.open();
        return false;
    });

    $('#wp_favicon_button').click(function(e)
    {
        e.preventDefault();

        /**
         * Sets favicon
         *
         * @param props
         * @param attachment
         */
        wp.media.editor.send.attachment = function(props, attachment)
        {
            $main_fav_image.prop("src", attachment.url);
            $main_favicon.val(attachment.url);
            $main_fav_id.val(attachment.id);
            $main_fav_size.val(props.size);
        };



        /**
         * Opens media browser
         */
        wp.media.editor.open();
    });

    /**
     * Update main favicon if url is changed via paste
     */
    $("#wp_favicon").on("change", function(e){
        $main_fav_image.prop("src", $(this).val());
        $main_favicon.val( $(this).val() );
        $main_fav_id.val("");
        $main_fav_size.val("full");
    });


    /**
     * Browses and sets the proper favicon for each sub-site
     *
     */
    $( window.document ).on("click", '.ub_favicons_browse', function(e)
    {
        e.preventDefault();

        var $this = $(this),
            $tr = $this.closest("tr"),
            $url = $tr.find(".ub_favicons_fav_url"),
            $id = $tr.find(".ub_favicons_fav_id"),
            $size = $tr.find(".ub_favicons_fav_size"),
            $image = $tr.find(".ub_favicons_fav");


        /**
         * Sets favicon from image gallery
         *
         * @param props
         * @param attachment
         */
        wp.media.editor.send.attachment = function(props, attachment)
        {
            $image.prop("src", attachment.url);
            $url.val(attachment.url);
            $id.val(attachment.id);
            $size.val(props.size);
        };

        /**
         * Sets favicon from Url
         *
         * @param props
         * @param attachment
         * @returns {*}
         */
        wp.media.string.props = function(props, attachment){
            var $spinner = $(".spinner").first().clone(),
                temp_image = new window.Image(),
                $temp_image = $(temp_image);

            /**
             * Show loader until the image is fully loaded then place show the actual image
             */
            $temp_image.appendTo("body").hide();
            temp_image.src = props.url;

            if( !$image.find(".spinner").length ) {
                $image.before( $spinner.show() );
            }

            $image.hide();

            $temp_image.on("load", function(){
                $spinner.remove();
                $temp_image.remove();
                $image.prop("src", props.url).show();
            });

            $url.val(props.url);
            return props;
        };

        // Opens media browser
        wp.media.editor.open();
    });

    $(".ub_favicons_fav_url").on("change", function(e){
        var $this = $(this),
            $tr = $this.closest("tr"),
            $id = $tr.find(".ub_favicons_fav_id"),
            $size = $tr.find(".ub_favicons_fav_size"),
            $image = $tr.find(".ub_favicons_fav"),
            val = $(this).val();

        if( val.length < 3 ) {
            val = $image.data("default");
        }

        $image.prop("src", val);
        $id.val("");
        $size.val("full");
    });

    /**
     * Save blogs favicon
     */
    $( window.document ).on("click",".ub_favicons_save", function(e) {
        var $this = $(this),
            $tr = $this.closest("tr"),
            $inputs = $tr.find("input"),
            $spinner = $tr.find(".spinner"),
            data = {action: "ub_save_favicon"};

        $inputs.each(function(){
           var $this = $(this);
           data[this.name] = $this.val();
        });

        e.preventDefault();
        $spinner.show();
        $.ajax({
            url : ajaxurl,
            type: "post",
            data: data,
            complete: function(){
                $spinner.hide();
            },
            success: function(){

            },
            error: function(){

            }
        });
    });

    /**
     * Reset blog's favicon
     */
    $( window.document ).on("click", ".ub_favicons_reset", function(e){
        var $this = $(this),
            $tr = $this.closest("tr"),
            $image = $tr.find(".ub_favicons_fav"),
            $url = $tr.find(".ub_favicons_fav_url"),
            $spinner = $tr.find(".spinner"),
            id = $this.data("id"),
            nonce = $("#ub_favicons_" + id +  "_reset").val(),
            data = {action: "ub_reset_favicon", id: id, nonce: nonce };

        e.preventDefault();
        $spinner.show();
        $.ajax({
            url : ajaxurl,
            type: "post",
            data: data,
            complete: function(){
                $spinner.hide();
            },
            success: function(res){
                if( res.success ){
                    $image.prop("src", res.data.fav);
                    $url.val("");
                }
            }
        });
    });
});

/**
 * universal media
 */

jQuery( window.document ).ready( function( $ ) {

    jQuery(".simple-option-media .image-reset").on("click", function( event ){
        var container = $(this).closest(".simple-option-media");
        $(".image-preview", container ).removeAttr( "src" );
        $(".attachment-id", container ).removeAttr("value");
        $(this).addClass("disabled");
    });

    jQuery('.simple-option-media .button-select-image').on('click', function( event ){
        var file_frame;
        var wp_media_post_id;
        var container = $(this).closest('.simple-option-media');
        var set_to_post_id = $('.attachment-id', container ).val();

        event.preventDefault();
        // If the media frame already exists, reopen it.
        if ( file_frame ) {
            // Set the post ID to what we want
            file_frame.uploader.uploader.param( 'post_id', set_to_post_id );
            // Open frame
            file_frame.open();
            return;
        } else {
            // Set the wp.media post id so the uploader grabs the ID we want when initialised
            wp.media.model.settings.post.id = set_to_post_id;
        }

        // Create the media frame.
        file_frame = wp.media.frames.file_frame = wp.media({
            title: 'Select a image to upload',
            button: {
                text: 'Use this image',
            },
            multiple: false	// Set to true to allow multiple files to be selected
        });

        // When an image is selected, run a callback.
        file_frame.on( 'select', function() {
            // We set multiple to false so only get one image from the uploader
            var attachment = file_frame.state().get('selection').first().toJSON();

            // Do something with attachment.id and/or attachment.url here
            $('.image-preview', container ).attr( 'src', attachment.url ).css( 'width', 'auto' );
            $('.attachment-id', container ).val( attachment.id );
            $(".image-reset", container).removeClass("disabled");

            // Restore the main post ID
            wp.media.model.settings.post.id = wp_media_post_id;
        });

        // Finally, open the modal
        file_frame.open();
    });

    // Restore the main ID when the add media button is pressed
    jQuery( 'a.add_media' ).on( 'click', function() {
        wp.media.model.settings.post.id = wp_media_post_id;
    });
});

/* global window, jQuery */

jQuery( window.document ).ready(function() {
    "use strict";
    if ( window.ub_admin.current_menu_sub_item !== null) {
        jQuery('#adminmenu .wp-submenu li.current').removeClass("current");
        jQuery('a[href="admin.php?page=branding&tab=' + window.ub_admin.current_menu_sub_item + '"]').parent().addClass("current");
    }
});

/* global wp, window, wp_media_post_id, jQuery, ajaxurl, ace, switch_button */

/**
 * close block
 */
/**
 * Simple Options: select2
 */
jQuery( window.document ).ready(function($){
    function UltimateBrandingPublicFormatSite(site) {
        if (site.loading) {
            return site.text;
        }
        var markup = "<div class='select2-result-site clearfix'>";
        markup += "<div class='select2-result-site__blogname'>" + site.blogname + "</div>";
        markup += "<div class='select2-result-site__siteurl'>" + site.siteurl + "</div>";
        markup += "</div>";
        return markup;
    }
    function UltimateBrandingPublicFormatSiteSelection (site) {
        return site.blog_id;
    }
    if (jQuery.fn.select2) {
        $('.ub-select2').select2();
        $('.ub-select2-ajax').select2({
            ajax: {
                url: ajaxurl,
                dataType: 'json',
                delay: 250,
                data: function( params ) {
                    var query = {
                        user_id: $(this).data('user-id'),
                        _wpnonce: $(this).data('nonce'),
                        action: $(this).data('action'),
                        page: params.page,
                        q: params.term
                    };
                    return query;
                },
                processResults: function (data, params) {
                    params.page = params.page || 1;
                    return {
                        results: data.data,
                        pagination: {
                            more: (params.page * 30) < data.total_count
                        }
                    };
                },
                cache: true
            },
            minimumInputLength: 1,
            escapeMarkup: function (markup) { return markup; },
            templateResult: UltimateBrandingPublicFormatSite,
            templateSelection: UltimateBrandingPublicFormatSiteSelection
        });
    }
});

/* global window, jQuery, ajaxurl */

jQuery( window.document ).ready(function($){
    "use strict";
    /**
     * Slider widget
     */
    if ( $.fn.slider ) {
        $('.simple-option div.ui-slider').each( function() {
            var id = $(this).data('target-id');
            if ( id ) {
                var target = $('#'+id);
                var value = target.val();
                var max = $(this).data('max') || 100;
                var min = $(this).data('min') || 0;
                $(this).slider({
                    value: value,
                    min: min,
                    max: max,
                    slide: function( event, ui ) {
                        target.val( ui.value );
                    }
                });
            }
        });
    }
    /**
     * sortable
     */
    $('table.sortable').sortable({
        items: 'tr'
    });
    /**
     * reset section
     */
    $('.simple-option-reset-section a').on('click', function() {
        var data = {
            'action': 'simple_option',
            'tab': $('#ub-tab').val(),
            'nonce': $(this).data('nonce'),
            'network': $(this).data('network'),
            'section': $(this).data('section')
        };
        if ( window.confirm( $(this).data('question') ) ) {
            jQuery.post(ajaxurl, data, function(response) {
                if ( response.success ) {
                    window.location.href = response.data.redirect;
                }
            });
        }
        return false;
    });
});

/* global window, jQuery, switch_button */

jQuery( window.document ).ready(function(){
    "use strict";
    if ( jQuery.fn.switchButton ) {
        var ultimate_branding_admin_check_slaves  = function() {
            jQuery('.simple-option .master-field' ).each( function() {
                var slave = jQuery(this).data('slave');
                if ( slave ) {
                    var slaves = jQuery( '.simple-option.'+slave );
                    if ( jQuery( '.switch-button-background', jQuery(this).closest('td') ).hasClass( 'checked' ) ) {
                        slaves.show();
                    } else {
                        slaves.hide();
                    }
                }
            });
        };
        jQuery('.simple-option .switch-button').each(function() {
            var options = {
                checked: jQuery(this).checked,
                on_label: jQuery(this).data('on') || switch_button.labels.label_on,
                off_label: jQuery(this).data('off') || switch_button.labels.label_off,
                on_callback: ultimate_branding_admin_check_slaves,
                off_callback: ultimate_branding_admin_check_slaves
            };
            jQuery(this).switchButton(options);
        });
    }
});


/* global wp, window, wp_media_post_id, jQuery, ajaxurl, ace, switch_button */

/**
 * close block
 */
jQuery( window.document ).ready(function(){
    jQuery( 'button.handlediv.button-link, .hndle', jQuery('.simple-options, .ultimate-colors' ) ).on( 'click', function(e) {
        e.preventDefault();
        var target = jQuery(this).parent();
        var form = jQuery(this).closest('form');
        target.toggleClass( 'closed' );
        jQuery.post(ajaxurl, {
            action: 'simple_option',
            close: target.hasClass( 'closed' ),
            target: target.attr('id'),
            nonce: jQuery('[name=postboxes_nonce]', form).val(),
            tab: jQuery('[name=tab]', form).val()
        });
    });
});
/**
 * slave sections
 */
jQuery( window.document ).ready(function($){
    $('.simple-options .postbox.section-is-slave').each( function() {
        var $this = $(this);
        var section = $this.data('master-section');
        var field = $this.data('master-field');
        var value = $this.data('master-value');
        $('[name="simple_options['+section+']['+field+']"]').on( 'change', function() {
            if ( 'checkbox' === $(this).attr('type') ) {
                if ( 'on' === value && $(this).is(":checked") ) {
                    $this.show();
                } else if ( 'off' === value && !$(this).is(":checked") ) {
                    $this.show();
                } else {
                    $this.hide();
                }
            } else {
                if ( $(this).val() === value ) {
                    $this.show();
                } else {
                    $this.hide();
                }
            }
        });
    });
});
/**
 * Modules control
 */
jQuery( window.document ).ready(function(){
    "use strict";
    if ( jQuery.fn.switchButton ) {
        jQuery( '#ultimate-branding-modules .switch-button').switchButton({
            on_label: jQuery(this).data('enable') || switch_button.labels.label_enable,
            off_label: jQuery(this).data('disable') || switch_button.labels.label_disable
        });
        jQuery( '#ultimate-branding-modules input.switch-button').on( 'change', function() {
            var checkbox = jQuery( this );
            var data = {
                action: 'ultimate_branding_toggle_module',
                module: checkbox.val(),
                nonce: checkbox.data('nonce'),
                state: checkbox.prop('checked')? 'on':'off'

            };
            jQuery.post(ajaxurl, data, function( response ) {
                if ( response.success ) {
                    window.location.reload();
                }
            });
        });
    }
} );
/**
 * reset login image
 */
jQuery( window.document ).ready(function($){
    var img = $('#login-screen-reset-image');
    img.on( 'click', function() {
        $('#wp_login_image_el')
            .attr( 'width', img.data('width') )
            .attr( 'src', img.data('src') )
            .attr( 'height', img.data('height') );
        $('#wp_login_image').val( img.data('src' ) );
        $('#wp_login_image_width').val( img.data('width' ) );
        $('#wp_login_image_height').val( img.data('height' ) );
        $('#wp_login_image_id').val( 'reset' );
        return false;
    });
});
/**
 * reset favicon main image
 */
jQuery( window.document ).ready(function($){
    var img = $('#favicon-reset-main-image');
    img.on( 'click', function() {
        $('#ub_main_site_favicon').attr( 'src', $('#wp_favicon').data('default' ) );
        $('#wp_favicon').val( $('#wp_favicon').data('default' ) );
        return false;
    });
});
