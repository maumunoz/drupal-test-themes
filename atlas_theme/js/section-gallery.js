/*global jQuery2 */
(function ($) {
    'use strict';
    $.transform('.node-media-gallery', {
        process: function ($, node) {
            node.find('.media-gallery-item').each(function () {
                var anchor = $(this).find('.media-gallery-thumb'),
                    image = anchor.find('img');
                anchor.attr('data-mfp-src', image.attr('src').replace('/media_gallery_thumbnail/', '/media_gallery_large/'));
            });
        },
        after: function ($, node) {
            // start the lightbox
            node.find('.media-gallery-item .media-gallery-thumb').magnificPopup({
                type: 'image',
                tClose: 'Cerrar (Esc)',
                tLoading: 'Cargando...',
                image: {
                    tError: 'No se pudo cargar <a href="%url%">la imagen</a>.'
                },
                gallery: {
                    enabled: true,
                    tPrev: 'Anterior (Tecla de flecha izquierda)',
                    tNext: 'Siguiente (Tecla de flecha derecha)',
                    tCounter: '%curr% de %total%'
                }
            });
        }
    });
}(jQuery2));