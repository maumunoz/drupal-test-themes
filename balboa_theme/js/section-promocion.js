/*global jQuery2 */
(function ($) {
    'use strict';

    // Split content
    function onResizeSplit() {
        if ($(window).width() > $(window).height()) {
            $('.node-type-promocion #content-area').css('height', $('#content-area').width());
        } else {
            $('.node-type-promocion #content-area').css('height', $("#content-area .region").height() );
        }
    }
    $(window).on('resize', onResizeSplit);
    $(document).ready(function () {
        onResizeSplit();
        setTimeout(function () {
            $(window).resize();
        }, 1000);
    });
    
    //Find parent section
    
    $.initModule(".view-promocion-padre", function ($, parentinfo) {
        var returnFixed = false;
        $(".view-promocion-padre .field-name-field-link .field-item").each(function(i,el) {
            if(document.location.toString().indexOf( $(el).text() )>-1) {
                $(".node-type-promocion .return").attr("href", $(el).closest(".views-field-field-promociones").prev().find("a").attr("href") );
                returnFixed = true;
            }
        } );
        if (!returnFixed) {
            $(".node-type-promocion .return").bind("touch click", function(e) {
                e.preventDefault();
                window.history.back();
            });
        }
    });
    
    
    //Content images, with link inside image
    $.initModule(".node-type-promocion .contenido .media-thumbnail-frame a", function ($, images) {

        images.magnificPopup({
            type: 'image',
            tClose: 'Cerrar (Esc)',
            tLoading: 'Cargando...',
            callbacks: {
                open: function () {
                    if (Drupal.initMediaGalleryLightboxPhoto) Drupal.MediaGalleryLightboxOpen(this);
                }
            },
            image: {
                titleSrc: function(item) {
                    if (Drupal.initMediaGalleryLightboxImageTitle) return Drupal.initMediaGalleryLightboxImageTitle(item);
                },
                tError: 'No se pudo cargar <a href="%url%">la imagen</a>.'
            },
        });

    });
    //Content images, with image inside link
    $.initModule(".node-type-promocion .contenido a .media-thumbnail-frame", function ($, images) {

        images.parent().magnificPopup({
            type: 'image',
            tClose: 'Cerrar (Esc)',
            tLoading: 'Cargando...',
            callbacks: {
                open: function() {
                    if (Drupal.initMediaGalleryLightboxPhoto) Drupal.MediaGalleryLightboxOpen(this);
                }
            },
            image: {
                titleSrc: function(item) {
                    if (Drupal.initMediaGalleryLightboxImageTitle) return Drupal.initMediaGalleryLightboxImageTitle(item);
                },
                tError: 'No se pudo cargar <a href="%url%">la imagen</a>.'
            },
        });

    });
    //Pop Up videos
    $.initModule(".popup-video" , function ($, popups) {
        popups.magnificPopup({
            type: 'iframe',
            tClose: 'Cerrar (Esc)',
            tLoading: 'Cargando...',
            callbacks: {
                open: function() {
                    if (Drupal.initMediaGalleryLightboxPhoto) Drupal.MediaGalleryLightboxOpen(this);
                }
            },
            iframe: {
                markup: '<div class="mfp-iframe-scaler">'+
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

                patterns: {
                    youtube: {
                        index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                        id: 'v=', // String that splits URL in a two parts, second part should be %id%
                        // Or null - full URL will be returned
                        // Or a function that should return %id%, for example:
                        // id: function(url) { return 'parsed id'; } 

                        src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe. 
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }

                    // you may add here more sources

                },

                srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
            },
            gallery: {
                enabled: true,
                tPrev: 'Anterior (Tecla de flecha izquierda)',
                tNext: 'Siguiente (Tecla de flecha derecha)',
                tCounter: '%curr% de %total%'
            }
        });

    });

}(jQuery2));

