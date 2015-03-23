/*global jQuery2, Drupal */
(function ($) {
    'use strict';
    /*
    Slick CSS configuration examples

    slick-accessibility
    slick-accessibility--false
    slick-adaptive-height
    slick-adaptive-height--false
    slick-autoplay
    slick-autoplay--false
    slick-autoplay-speed--7000
    slick-arrows
    slick-arrows--false
    slick-as-nav-for--class--testclass
    slick-as-nav-for--id--testid
    slick-append-arrows--class--testclass
    slick-append-arrows--id--testid
    slick-prev-arrow--id--testid
    slick-prev-arrow--class--testclas
    slick-next-arrow--id--testid
    slick-next-arrow--class--testclass
    slick-center-mode--class--testclass
    slick-center-padding--50px
    slick-center-padding--50ptg
    slick-css-ease--linear
    slick-custom-pagging--class--testclass
    slick-custom-pagging--id--testid
    slick-dots
    slick-dots--false
    slick-append-dots--class--testclass
    slick-draggable
    slick-draggable--false
    slick-fade
    slick-fade--false
    slick-focus-on-select
    slick-focus-on-select--false
    slick-easing--linear
    slick-edge-friction--35
    slick-infinite
    slick-infinite--false
    slick-initial-slide--0
    slick-lazy-load--ondemand
    slick-lazy-load--progressive
    slick-mobile-first
    slick-mobile-first--false
    slick-pause-on-hover
    slick-pause-on-hover--false
    slick-pause-on-dots-hover
    slick-pause-on-dots-hover--false
    slick-respond-to--window
    slick-respond-to--slider
    slick-respond-to--min
    slick-slider--li
    slick-slide-to-show--1
    slick-slide-to-scroll--1
    slick-speed--500
    slick-touch-move
    slick-touch-move--false
    slick-use-css
    slick-use-css--false
    slick-variable-width
    slick-variable-width--false
    slick-vertical
    slick-vertical--false
    slick-rtl
    slick-rtl--false

    Out of scope:
    ** customPagging(type: function)
    ** responsive(type: object)

    Limitations:
    ** Drupal not allowing _ (underscore) notation to add css classes
    ** View CSS Class field character limit: 128

    Slick Docs: http://kenwheeler.github.io/slick/#settings
    */

    $.initModule('.view-slick', function ($, el) {
        var cssConfig = el.attr('class').split(' '),
            slick = el.find('ul') || el.find('.slick'),
            configProp = '',
            configVal = '',
            valuePos = 0,
            prefix = {
                config: 'slick-',
                class: 'class--',
                id: 'id--',
                value: '--'
            },
            configEx = {
                htmlContent: ['prevArrow', 'nextArrow'],      // Template from DOM elements
                units: ['centerPadding', 'touchThreshold']    // px, % or 0.*
            },
            config = {};

        if (slick.length) {

            // Go through every css Class to extract configuration
            $.each(cssConfig, function(i, cssClass) {
                valuePos = 0;
                configVal = '';
                configProp = '';

                // Validate configuration have the carousel prefix
                if(cssClass.indexOf(prefix.config) === 0) {
                    configProp = cssClass.substring(prefix.config.length, cssClass.length);
                    valuePos = configProp.indexOf(prefix.value);

                    // Extract configuration value
                    if(valuePos > 0) {
                        configVal = configProp.substring(valuePos+prefix.value.length, configProp.length);
                        configProp = configProp.substring(0, valuePos);
                    }

                    // Convert property format from hypens to camelCase
                    configProp = configProp.replace(/-([a-z])/g, function (g) {
                        return g[1].toUpperCase();
                    });

                    // Add properties/values to configuration object
                    if(configVal === '') {
                        config[configProp] = true;

                    } else if (configVal == 'false') {
                        config[configProp] = false;

                    } else if (configVal.match(/^[0-9]+$/) !== null &&
                        $.inArray(configProp, configEx.units) === -1) {
                        configVal = parseInt(configVal, 10);
                        config[configProp] = configVal;

                    } else {
                        // Add class/id selector symbol
                        if(configVal.indexOf(prefix.id) === 0) {
                            configVal = configVal.substring(prefix.id.length, configVal.length);
                            configVal = '#'+configVal;

                        } else if(configVal.indexOf(prefix.class) === 0) {
                            configVal = configVal.substring(prefix.class.length, configVal.length);
                            configVal = '.'+configVal;
                        }

                        // Manage configuration values exceptions
                        if($.inArray(configProp, configEx.htmlContent) >= 0) {
                            configVal = $(configVal).html();
                        }

                        if($.inArray(configProp, configEx.units) >= 0) {

                            if(configVal.indexOf('px') > 0) {
                                configVal = configVal;

                            } else if (configVal.indexOf('ptg') > 0) {
                                configVal = configVal.replace('ptg', '%');

                            } else {
                                configVal = (parseInt(configVal, 10)*0.1);
                            }
                        }

                        config[configProp] = configVal;
                    }
                }
            });

            // Extend Drupal global Slick configuration
            config = $.extend({}, Drupal.slick.config, config);

            // Create slick instance and show module
            slick.slick(config);
            el.removeClass('hidden');
        }
    });

}(jQuery2));