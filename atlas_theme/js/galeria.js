/*global jQuery2, jQuery */
(function ($) {
    $.transform('.node-media-gallery', {
        process: function ($, node) {
            node.find('.media-gallery-item').each(function () {
                var anchor = $(this).find('.media-gallery-thumb'),
                    image = anchor.find('img');
                anchor.attr('data-mfp-src', image.attr('src').replace('/media_gallery_thumbnail/', '/media_gallery_large/'));
                //anchor.attr('href', image.attr('src').replace('/media_gallery_thumbnail/', '/media_gallery_large/'));
            });
        },
        after: function ($, node) {
            // start the lightbox
            node.find('.media-gallery-item').each(function () {
                var anchor = $(this).find('.media-gallery-thumb');

                anchor.magnificPopup({
                    type: 'image'
                });
            });
        }
    });
}(jQuery2));