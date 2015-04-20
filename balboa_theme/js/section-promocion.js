/*global jQuery2 */
(function ($) {
    
    
    // Set Footer as a Sticky Footer
    $(window).on('resize', function() {
        if ($(window).width()>768) {
            $('#content-area').css('height', $('#content-area').width() );
        }else{
            $('#content-area').css('height', 'initial' );
        }
    });
    $(document).ready(function () {
        $(window).resize();
        setTimeout(function () {
            $(window).resize();
        }, 1000);
    });
    
    //Content images, with link inside image
    $.initModule(".contenido .media-thumbnail-frame a", function ($, images) {

        images.magnificPopup({
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
    //Content images, with image inside link
    $.initModule(".contenido a .media-thumbnail-frame", function ($, images) {

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
                '<div class="mfp-close"></div>'+
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

